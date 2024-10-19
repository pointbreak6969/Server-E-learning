import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt  from "bcrypt"
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

UserSchema.pre("save", async function (next){
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})
UserSchema.methods.isPasswordCorrect = async function(password){
return await bcrypt.compare(password, this.password)
}
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

export const User = mongoose.model("users", UserSchema);
