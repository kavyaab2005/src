const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addEvent, getEvents, deleteEvent } = require("../controllers/eventController");

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), addEvent);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);

module.exports = router;
