import mongoose, { Schema } from "mongoose";

const userProfileSchema = new Schema({
  userId : {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  avatar: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  description: {
    type: String,
  },
  socialMedia: {
    facebook: {
      type: String,
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
},
{
    timestamps :true
}
);

const UserProfile = mongoose.model("userProfile", userProfileSchema)

export {UserProfile};