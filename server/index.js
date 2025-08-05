const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

// Import routes
const authRoutes = require("./routes/authRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const lemonRoutes = require("./routes/lemonRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Set server timeout for long-running requests
app.use((req, res, next) => {
  // Set timeout for all requests to 60 seconds
  req.setTimeout(60000);
  res.setTimeout(60000);
  next();
});

// CORS setup for frontend
app.use(cors({
  origin: [
    "https://what-can-i-start-m.vercel.app",
    "https://whatcanistartm.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true,
}));

// JSON body parser
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Route integrations
app.use("/api", authRoutes);                 // /api/auth/login etc.
app.use("/api/lemon-products", lemonRoutes); // /api/lemon-products/*
app.use("/api/gemini", geminiRoutes);        // /api/gemini/*

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

// Test endpoint for debugging
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "Test endpoint working",
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      hasMongoUri: !!process.env.MONGO_URI,
      hasGeminiKey: !!process.env.GEMINI_API_KEY
    }
  });
});

// Catch-all route for unmatched API endpoints
app.use("/api/*", (req, res) => {
  console.log(`404 - API endpoint not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: "API endpoint not found",
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      "/api/login",
      "/api/register", 
      "/api/gemini/generateidea",
      "/api/lemon-products",
      "/api/contact",
      "/api/health"
    ]
  });
});

// Catch-all route for all other requests
app.use("*", (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: "Route not found",
    path: req.originalUrl,
    method: req.method
  });
});

// MongoDB connection and server start
if (!MONGO_URI) {
  console.error("MONGO_URI environment variable is not set!");
  console.error("Please set your MongoDB Atlas connection string in the .env file");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
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
