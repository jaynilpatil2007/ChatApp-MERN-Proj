import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.use((err, req, res, next) => {
    res.status(err.statuscode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export { app };