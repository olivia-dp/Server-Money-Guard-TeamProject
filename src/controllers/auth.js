import { registerUser, loginUser, logoutUser } from "../services/auth.js";


export const registerUserController = async (req, res) => {
    const { user, session } = await registerUser(req.body);
 
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};

export const loginUserController = async (req, res) => {
    const { user, session } = await loginUser (req.body);

    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
      });
      res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
      });

    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
          user,
          accessToken: session.accessToken,
        },
});
};

export const logoutUserController = async (req, res) => {
    const { sessionId, refreshToken } = req.cookies;
  
    if (typeof sessionId === 'string' && typeof refreshToken === 'string') {
      await logoutUser(sessionId, refreshToken);
    }
  
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
  
    res.status(204).send();
  };