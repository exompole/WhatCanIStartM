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

// Debugging logs
console.log("🔍 Debug - MONGO_URI loaded:", !!MONGO_URI);
console.log("🔍 Debug - MONGO_URI length:", MONGO_URI ? MONGO_URI.length : 'undefined');
console.log("🔍 Debug - MONGO_URI preview:", MONGO_URI ? MONGO_URI.substring(0, 50) + '...' : 'undefined');

// CORS setup for Vercel frontend
app.use(cors({
  origin: "https://what-can-i-start-m.vercel.app",
  credentials: true,
}));

//  JSON parsing middleware
app.use(express.json());

// Route integrations
app.use("/api", authRoutes);                      // /api/auth/login etc.
app.use("/api/lemon-products", lemonRoutes);      // /api/lemon-products/*
app.use("/api/gemini", geminiRoutes);             // /api/gemini/*

// Health check routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend Working", 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({ 
    message: "API is running", 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

//  MongoDB connection and server start
if (!MONGO_URI) {
  console.error("MONGO_URI environment variable is not set!");
  console.error("Please set your MongoDB Atlas connection string in the .env file");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Visit: http://localhost:${PORT} or your Render URL`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.error("Please check your MONGO_URI in the .env file");
    process.exit(1);
  });
