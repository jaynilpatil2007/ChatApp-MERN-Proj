import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Message } from "../models/message.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllContacts = asyncHandler(async (req, res) => {
    const loggedInUser = req.user._id;
    const filtteredUserId = await User.find({ _id: { $ne: loggedInUser } }).select("-password -refreshTokens");

    return res
        .status(200)
        .json(
            new ApiResponse(200, filtteredUserId, "Contacts are seen successfully")
        )
})

const getAllChats = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;

    const message = await Message.find({
        $or: [{ senderId: loggedInUserId }, { recieverId: loggedInUserId }]
    });

    const chatPartnersId = [
        ...new Set(
            message.map((msg) =>
                msg.senderId.toString() === loggedInUserId.toString() ? msg.recieverId.toString() : msg.senderId.toString()
            )
        )
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnersId } }).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(200, chatPartners, "All Chatpartner are fetched successfully")
        )

})

const getMessageByUserId = asyncHandler(async (req, res) => {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
        $or: [
            { senderId: myId, recieverId: userToChatId },
            { senderId: userToChatId, recieverId: myId }
        ]
    }).sort({ createdAt: 1 })

    return res
        .status(200)
        .json(
            new ApiResponse(200, messages)
        )
})

const sendMessage = asyncHandler(async (req, res) => {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    if (!recieverId) {
        throw new ApiError(400, "Receiver ID is required");
    }

    if (!text && !image) {
        throw new ApiError(400, "Message cannot be empty");
    }

    let imageUrl;
    if (image) {
        try {
            const uploadResponse = await uploadOnCloudinary(image);
            imageUrl = uploadResponse.url;
        } catch (error) {
            throw new ApiError(500, "Image upload failed");
        }
    }

    const message = await Message.create({
        senderId,
        recieverId,
        text,
        image: imageUrl
    })

    return res
        .status(201)
        .json(
            new ApiResponse(201, message, "message sent successfully")
        )
})

export { getMessageByUserId, sendMessage, getAllChats, getAllContacts }