import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Unit from "../models/unit.model.js";
import { isValidObjectId } from "mongoose";

const createUnit = asyncHandler(async (req, res, next) => {
  try {
    const { unitName, unitNumber } = req.body;
    const { courseId } = req.params;
    if (!(unitName && unitNumber)) {
      throw new ApiError(400, "All fields are required");
    }
    if (!isValidObjectId(courseId)) {
      throw new ApiError(400, "Course not found");
    }
    const createdUnit = await Unit.create({
      unitName,
      unitNumber,
      courseId,
    });
    if (!createdUnit) {
      throw new ApiError(500, "Error while creating unit");
    }
    return res
      .status(200)
      .json(new ApiResponse(201, createdUnit, "Unit created successfully"));
  } catch (error) {
    next(error)
  }
});
export { createUnit };
