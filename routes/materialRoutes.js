import express from "express";
import multer from "multer";
import { addMaterial, getMaterials } from "../controllers/materialController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("file"), addMaterial);
router.get("/", getMaterials);

export default router;
