import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { UserProfile } from "../models/userProfile.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
const registerUser = asyncHandler(async (req, res) => {
  //take data from user like fullname, email, password
  // check if all input is provided
  // check if email already exists
  // create a new user
  // generate access token
  // generate refresh token
  // save refresh token in db
  // send access token and refresh token to user

  const { fullName, email, password } = req.body;
  if (!(fullName && email && password)) {
    throw new ApiError(400, "All input is required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }
  return res
    .status(201)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //first check whether the user exists or not
  //check their password
  //genereate tokens and send them
  //send response

  const { email, password } = req.body;
  if (!(email && password))
    throw new ApiError(204, "Email and Password are required");
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new ApiError(404, "User not found");
  const isPasswordValid = await existingUser.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Unauthorized access");
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existingUser._id
  );
  const loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie(accessToken, options)
    .cookie(refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "Logged In Successfully"
      )
    );
});

const setUpUserProfile = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  console.log(req.file);
  if (!avatarLocalPath) throw new ApiError(200, "Avatar local file not found");
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "avatar file can't be uploaded on cloudinary");
  }
  console.log(avatar);
  const { description, facebookLink, githubLink, twitterLink, instagramLink } =
    req.body;
  const userProfile = await UserProfile.create({
    avatar: {
      publicId: avatar.public_id,
      url: avatar.url,
    },
    description,
    socialMedia: {
      facebook: facebookLink,
      github: githubLink,
      twitter: twitterLink,
      instagram: instagramLink,
    },
  });
  if (!userProfile)
    throw new ApiError(
      500,
      "Something went wrong while setting up the user profile"
    );
  return res
    .status(200)
    .json(new ApiResponse(200, userProfile, "User profile setup completed"));
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingDecodedToken = req.cookie.refreshToken || req.body.refreshToken;
  if (!incomingDecodedToken) throw new ApiError(401, "Unauthorized request");
  try {
    const decodedToken = jwt.verify(
      incomingDecodedToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new ApiError(401, "Invalid Refresh Token");
    if (incomingToken !== user.refreshToken)
      throw new ApiError(401, "Refresh token is expired");
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } =
      await User.generateAccessAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res)=>{
  return res.status(200).json(new ApiResponse(200, req.user, "User found successfully"));
})
const changeCurrentPassword = asyncHandler(async (req, res)=>{
  const {oldPassword, newPassword} = req.body;
  const user = await User.findById(req.user?._id);
  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isOldPasswordCorrect) throw new ApiError(401, "Old password is incorrect");
  user.password = newPassword;
  await user.save({validateBeforeSave: false});
  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
})




export { registerUser, loginUser, setUpUserProfile, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser};

