import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema ({
        userId: {
          type: String,
          required: true,
        },
        accessToken: {
          type: String,
          required: true,
        },
        refreshToken: {
          type: String,
          required: true,
        },
        accessTokenValidUntil: {
          type: Date,
          required: true,
        },
        refreshTokenValidUntil: {
          type: Date,
          required: true,
        },
      },
      { timestamps: true, versionKey: false },
    );

const SessionCollection = mongoose.model('session', sessionSchema);
export default SessionCollection;