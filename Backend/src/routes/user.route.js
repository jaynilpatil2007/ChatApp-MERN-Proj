import { Router } from "express";

const router = Router();

router.route("/signup").get((req, res) => {
    res.send("SignUp endpoint");
});

router.route("/login").get((req, res) => {
    res.send("LogIn endpoint");
});

router.route("/logout").get((req, res) => {
    res.send("LogOut endpoint");
});

export default router;