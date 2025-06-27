const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());

// Existing routes
app.use("/api", authRoutes);

// Gemini routes
app.use("/api/gemini", geminiRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.json("Backend Working");
});

// MongoDB connection
mongoose.connect(MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
