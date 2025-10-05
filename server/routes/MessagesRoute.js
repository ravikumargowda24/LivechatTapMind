// import { Router } from "express";
// import { getMessages, uploadFile, forwardMessage, deleteMessage, editMessage, markAsRead } from "../controllers/MessagesController.js";
// import { verifyToken } from "../middlewares/AuthMiddleware.js";
// import multer from "multer";
// const messagesRoutes = Router();
// const upload = multer({ dest: "uploads/files/" });
// messagesRoutes.post("/get-messages", verifyToken, getMessages);
// messagesRoutes.post(
//   "/upload-file",
//   verifyToken,
//   upload.single("file"),
//   uploadFile
// );

// messagesRoutes.post("/forward-message", verifyToken, forwardMessage);

// messagesRoutes.delete("/delete-message", verifyToken, deleteMessage);

// messagesRoutes.put("/edit-message", verifyToken, editMessage);

// messagesRoutes.post("/mark-as-read", verifyToken, markAsRead);
// export default messagesRoutes;

import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

import {
  getMessages,
  uploadFile,
  forwardMessage,
  deleteMessage,
  editMessage,
  markAsRead,
} from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

// ===== Cloudinary Configuration =====
cloudinary.config({
  cloud_name: "dwoawlpso",
  api_key: "q8RESYrrzldK5MRnvZzkqtrUUTY",
  api_secret: "<your_api_secret>", // Replace with your real secret
});

// ===== Multer Storage for Cloudinary =====
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat_files", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "docx", "mp4", "mp3"],
  },
});

const upload = multer({ storage });

// ===== Routes =====
const messagesRoutes = Router();

messagesRoutes.post("/get-messages", verifyToken, getMessages);

messagesRoutes.post(
  "/upload-file",
  verifyToken,
  upload.single("file"),
  uploadFile
);

messagesRoutes.post("/forward-message", verifyToken, forwardMessage);

messagesRoutes.delete("/delete-message", verifyToken, deleteMessage);

messagesRoutes.put("/edit-message", verifyToken, editMessage);

messagesRoutes.post("/mark-as-read", verifyToken, markAsRead);

export default messagesRoutes;

