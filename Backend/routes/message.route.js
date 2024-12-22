import express from "express";
import { sendMessage } from "../controller/message.js";
import secureroute from "../middleware/secureroute.js";
import { getMessage } from "../controller/message.js";
const router = express.Router();
router.post("/send/:id",secureroute,sendMessage);
router.get("/get/:id",secureroute,getMessage);
export default router;