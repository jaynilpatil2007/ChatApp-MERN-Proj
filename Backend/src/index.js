import dotenv from "dotenv";
import express from "express";
import { server } from "./utils/sockets.js";
import path from "path";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";

dotenv.config()

const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

// Make ready for deployment:
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
})

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongo DB connection failed: ", err);
    })
