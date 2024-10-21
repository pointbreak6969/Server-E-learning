import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Video from "../models/video.model.js";

const uploadVideo = asyncHandler(async (req, res) => {
  const { videoTitle } = req.body;
  if (!videoTitle) {
    throw new ApiError(400, "Title is required");
  }

  const videoLocalPath = req.file?.path;
  if (!videoLocalPath) {
    throw new ApiError(400, "Video not found");
  }

  const videoFile = await uploadOnCloudinary(videoLocalPath);
  if (!videoFile) {
    throw new ApiError(400, "Video can't be uploaded on Cloudinary");
  }

  const video = await Video.create({
    videoFile: {
      publicId: videoFile.public_id,
      url: videoFile.url,
    },
    owner: req.user._id,
    title: videoTitle,
  });

  if (!video) {
    throw new ApiError(500, "Something went wrong while uploading video");
  }

  return res
    .status(201) // Corrected to status 201
    .json(new ApiResponse(201, video, "Video uploaded successfully"));
});

export { uploadVideo };
