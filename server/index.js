const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const authRoutes = require("./routes/authRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const lemonRoutes = require("./routes/lemonRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());

// Existing routes
app.use("/api", authRoutes);

// Lemon routes
app.use("/api/lemon-products", lemonRoutes);

// Gemini routes
app.use("/api/gemini", geminiRoutes);

// Health check route for Vercel
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend Working", 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Health check route for API
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "API is running", 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection and server start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
