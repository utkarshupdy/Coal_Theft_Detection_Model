import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar
} from "../controller/user.controller.js"
import {upload} from "../middleware/multer.middleware.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router()
router.route("/register").post(
     registerUser
)

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT , logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT , changeCurrentPassword);
router.route("/update-account").post(verifyJWT , updateAccountDetails);
router.route("/avatar").post(verifyJWT , upload.single("avatar") , updateUserAvatar);
router.route("/current-user").get(verifyJWT , getCurrentUser);


export default router