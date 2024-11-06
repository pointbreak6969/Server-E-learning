import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Course from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const createCourse = asyncHandler(async (req, res) => {
  const { name, description, level, currentPrice, previousPrice, category } =
    req.body;
  if (!(name && description && level && currentPrice && category)) {
    throw new ApiError(400, "All fields are required");
  }
  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    throw new ApiError(404, "please provide thumbnail");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) {
    throw new ApiError(400, "thumbnail can't be uploaded on cloudinary");
  }
  const createdCourse = await Course.create({
    name,
    description,
    level,
    thumbnail: {url: thumbnail.url, publicId: thumbnail.public_id},
    author: req.user?._id,
    currentPrice,
    previousPrice,
    category,
  });
  if (!createdCourse) {
    throw new ApiError(500, "Error while creating a course");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        createdCourse,
        "Course has been created successfully"
      )
    );
});

const getUserCourse = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  if (!user) {
    throw new ApiError(401, "Unauthorized request");
  }
  const userCourse =await Course.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(user)
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        category: 1,
        currentPrice: 1,
        previousPrice: 1,
        thumbnail: 1,
        level: 1,
        status: 1
      }
    }
  ],);
  if (!userCourse.length) {
    throw new ApiError(500, "User haven't created any course");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, userCourse, "User's course found successfully"));
});

const getAllCourse = asyncHandler(async (req, res)=>{
   const response = await Course.find({});
   return res.status(200).json(new ApiResponse(200, response, "All courses"))
})

export { createCourse, getUserCourse, getAllCourse };
