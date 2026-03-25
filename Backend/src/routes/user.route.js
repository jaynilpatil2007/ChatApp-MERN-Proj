import { Router } from "express";
import { signup, login, logout, updatedProfile } from "../controllers/user.conterlles.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middlerware.js";

const router = Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").post(verifyJWT, logout);

router.route("/update").put(verifyJWT, updatedProfile);

router.route("/check").get(verifyJWT, (req, res) => {
    res.status(200).json(req.user)
})

export default router;