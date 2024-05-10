import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    userProfile: {
      type: Schema.Types.ObjectId,
      ref: "userProfiles",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60 * 60,
    }
  );
};
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const User = mongoose.model("user", UserSchema);
