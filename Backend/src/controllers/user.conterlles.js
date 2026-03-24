import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.models.js";

const generateAccessRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });

        return { refreshToken, accessToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating refresh and access tokens");
    }
}

const signup = asyncHandler(async (req, res) => {
    //data extract
    const { fullname, email, password } = req.body;

    //check fullname, email and password
    if (!fullname || !email || !password) throw new ApiError(400, "All fields are required");

    //password must be greater than 6:
    if (password.length < 6) throw new ApiError(400, "Password contains only 6 characters");

    //email format checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new ApiError(400, "Invalid User email");

    //check user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) throw new ApiError(400, "Email is already exists, please try other one");

    //create User
    const user = await User.create({
        fullname,
        email,
        password
    });

    //check for user creation:
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) throw new ApiError(500, "Something went wrong while registering user");

    //return res
    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User register successfully")
        )
})

const login = asyncHandler(async (req, res) => {

})

const logout = asyncHandler(async (req, res) => {

})

export { signup, login, logout }