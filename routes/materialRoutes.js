import express from "express";
import multer from "multer";
import path from "path";
import { addMaterial, getMaterials } from "../controllers/materialController.js";

const router = express.Router();

// ----------------------------
// Multer Storage Engine
// ----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/materials");   // folder where files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// File uploader
const upload = multer({ storage });

// ----------------------------
// API Routes
// ----------------------------
router.post("/add", upload.single("file"), addMaterial);
router.get("/", getMaterials);

export default router;
