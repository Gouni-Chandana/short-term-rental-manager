import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Helpers to get correct file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Default route → serve signup.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/signup.html"));
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);

// Handle 404 for unknown routes (optional)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../frontend/404.html")); // if you create one
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
