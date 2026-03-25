import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const arjetProtected = asyncHandler(async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                throw new ApiError(429, "Rate limit exceeded. Please try again later");
            }
            else if (decision.reason.isBot()) {
                throw new ApiError(403, "Bot access denied");
            } else {
                throw new ApiError(403, "Access denied by security policy");
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            throw new ApiError(403, "Malicious bot activity detected", ["spoofed bot detected"]);
        }
        next();
    } catch (error) {
        throw new ApiError(400, "Arcjet protection error");
        next();
    }
})