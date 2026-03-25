import { Router } from "express";
import { getAllContacts, getAllChats, getMessageByUserId, sendMessage } from "../controllers/message.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
import { arjetProtected } from "../middleware/arcjet.middlerware.js";

const router = Router();

router.use(arjetProtected, verifyJWT);

router.route("/contacts").get(getAllContacts);

router.route("/chats").get(getAllChats);

router.route("/:id").get(getMessageByUserId);

router.route("/send/:id").post(sendMessage);

export default router;