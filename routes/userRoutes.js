import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// ✅ Test route
router.get("/", (req, res) => {
  res.json({ message: "Users API is working 🚀" });
});

// Auth routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;
