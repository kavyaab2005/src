import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

// ⭐ Logger middlewares
import { logger, errorLogger } from "./utils/logger.js";

// ⭐ Import Routes
import studentRoutes from "./routes/studentRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";   // 🔥 NEW

dotenv.config();
connectDB();

const app = express();

// Fix "__dirname" for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ⭐ Log all incoming requests
app.use(logger);

// Rate limiter
app.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200
}));

// ⭐ Serve uploaded files (Event images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ⭐ API Routes
app.use("/api/students", studentRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);  // 🔥 NEW ROUTE MOUNTED

// Home route
app.get("/", (req, res) => {
    res.send("Professional Backend Running Successfully 🚀");
});

// ⭐ Log all errors
app.use(errorLogger);

// Global error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}`)
);
