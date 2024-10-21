import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Lesson from "../models/lesson.model.js";

const createLesson = asyncHandler(async (req, res)=>{
    const lessonName = req.body
})