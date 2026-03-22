import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

export { app };