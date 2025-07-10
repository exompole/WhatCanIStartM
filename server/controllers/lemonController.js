const Lemon = require("../models/lemonModel");

// Get all lemon by-products
exports.getAllLemonProducts = async (req, res) => {
  try {
    const products = await Lemon.find();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
};

// Add new lemon product (optional, for admin)
exports.addLemonProduct = async (req, res) => {
  try {
    const newProduct = await Lemon.create(req.body);
    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(400).json({ error: err.message || "Invalid data" });
  }
};
