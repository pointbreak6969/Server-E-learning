import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Lesson from "../models/lesson.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";
const createLesson = asyncHandler(async (req, res, next) => {
  //First we need to ask lessonName, and LessonNumber from user.
  // Since each and every lesson is associated with a unit so we have to get a unitId which can be obtained from params
  // We also need to upload a video since each lesson will have a video
  //if any field is missing throw an error
  //save the data in database
  try {
    const { lessonName, lessonNumber } = req.body;
    if (!(lessonName && lessonNumber)) {
      throw new ApiError(400, "Lesson name and number are required");
    }
    const {unitId }= req.params;
    if (!isValidObjectId(unitId)) {
      throw new ApiError(400, "No unit found");
    }
    const lessonVideoLocalPath = req.file?.path;
    if (!lessonVideoLocalPath) {
      throw new ApiError(400, "No video found;");
    }
    const lessonVideo = await uploadOnCloudinary(lessonVideoLocalPath);
    if (!lessonVideo) {
      throw new ApiError(500, "can't be uploaded on cloudinary");
    }
    const createdLesson = await Lesson.create({
      unitId,
      lessonName,
      lessonNumber,
      videoFile: {
        publicId: lessonVideo.public_id,
        url: lessonVideo.url,
      },
      owner: req.user?._id,
    });
    if (!createLesson) {
      throw new ApiError(500, "Error while creating the lesson");
    }
    return res
      .status(200)
      .json(new ApiResponse(201, createdLesson, "Lesson Created Successfully"));
  } catch (error) {
    next(error);
  }
});

export { createLesson };
