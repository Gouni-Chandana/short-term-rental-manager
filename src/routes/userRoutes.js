const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser); // for signup
router.post("/login", loginUser);       // for login

module.exports = router;
