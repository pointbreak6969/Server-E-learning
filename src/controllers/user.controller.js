import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


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
    password
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
    .json(new ApiResponse(200, "User created successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) =>{
//first check whether the user exists or not
//check their password
//genereate tokens and send them
//send response

const {email, password} = req.body;
if (!(email && password)) throw new ApiError(204, "Email and Password are required")
const existingUser = await User.findOne({email})
if (!existingUser) throw new ApiError(404, "User not found")
const isPasswordValid = await existingUser.isPasswordCorrect(password);
if(!isPasswordValid) throw new ApiError(401, "Unauthorized access")
  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existingUser._id);
const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken")
const options = {
  httpOnly: true,
  secure: true
}
return res.status(200).cookie(accessToken, options).cookie(refreshToken, options).json(new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken}, "Logged In Successfully"));
})

export { registerUser, loginUser };
