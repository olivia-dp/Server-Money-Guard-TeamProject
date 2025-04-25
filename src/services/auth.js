import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import UserCollection from "../models/userSchema.js";
import SessionCollection from "../models/sessionSchema.js";
import createHttpError from 'http-errors';


export const registerUser = async (payload) => {
    const existingUser = await UserCollection.findOne({ email: payload.email });
  if (existingUser) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  try {
    const user = await UserCollection.create({
      ...payload,
      email: normalizedEmail,
      password: encryptedPassword,
    });
  
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    const session = await SessionCollection.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

  } catch (error) {
    if (error.code === 11000) {
      throw createHttpError(409, 'Email already exists');
    }
    throw createHttpError(500, 'Server error');
  }

  return {
    user,
    session,
};
};

export const loginUser = async (payload) => {
    const user = await UserCollection.findOne({ email: payload.email });
    if (!user) throw createHttpError(400, 'User not found');
  
    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
      throw createHttpError(401, 'Unauthorized');
    }
  
    await SessionCollection.deleteOne({ userId: user._id });
  
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    const session = await SessionCollection.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
  
    return {
      user,
      session,
  };
  };
  
  
  export const logoutUser = async (sessionId, refreshToken) => {
    await SessionCollection.deleteOne({_id: sessionId, refreshToken});
    return undefined;
  }
