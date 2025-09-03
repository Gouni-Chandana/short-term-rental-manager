const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); // your MongoDB connection
const userRoutes = require("./routes/userRoutes"); // user routes

const app = express(); // <-- make sure app is defined here

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
