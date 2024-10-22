import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Course from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


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
    thumbnail: thumbnail.public_id,
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

export { createCourse };
