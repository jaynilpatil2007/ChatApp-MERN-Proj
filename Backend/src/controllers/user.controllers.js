import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import "dotenv/config"

const generateAccessRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { refreshToken, accessToken };
    } catch (error) {
        console.log("Error:", error);
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

    //accessToken and refreshToken
    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    //check for user creation:
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) throw new ApiError(500, "Something went wrong while registering user");

    //sending email:
    try {
        await sendWelcomeEmail(user.email, user.fullname, process.env.CLIENT_URL);
    } catch (error) {
        console.log("Failed to welcome email:", error);
    }

    //send cookies:
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    //return res
    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, createdUser, "User register successfully")
        )
})

const login = asyncHandler(async (req, res) => {
    //data extracted:
    const { email, password } = req.body;

    //check user is already exist:
    if (!email) throw new ApiError(400, "Email is not found");

    //find user
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "User not found");

    //password check
    const isPasswordvalid = await user.isPasswordCorrect(password);
    if (!isPasswordvalid) throw new ApiError(400, "Incorrect password");

    //access and refesh tokens:
    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    //send cookies
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "User loggedIn succesfully!")
        )
})

const logout = asyncHandler(async (req, res) => {
    //find user
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined }
        },
        {
            new: true
        }
    )

    //delete cookies
    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "Logged out successfully")
        )
})

const updatedProfile = asyncHandler(async (req, res) => {
    const { profilePic } = req.body;
    if (!profilePic) throw new ApiError(400, "Profile Pic is required");

    const uploadResponse = await uploadOnCloudinary(profilePic);

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                profilePic: uploadResponse.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Profile pic updated successfully")
        )

})

export { signup, login, logout, updatedProfile }