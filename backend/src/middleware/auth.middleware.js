import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/async-Handler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from either cookies or Authorization header
    console.log(req);
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);

    // If no token is found, throw an error
    if (!token) {
      throw new ApiError(401, "Unauthorized request. No token provided.");
    }

    // Verify token with secret
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user based on the decoded token ID
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    // If no user is found, throw an error
    if (!user) {
      throw new ApiError(401, "Invalid Access Token.");
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle different error types and respond accordingly
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid or expired token.");
    }

    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token has expired.");
    }

    // Default error handler for other errors
    throw new ApiError(401, error?.message || "Unauthorized request.");
  }
});
