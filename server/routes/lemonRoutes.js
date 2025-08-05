const express = require("express");
const router = express.Router();
const {
  getAllLemonProducts,
  addLemonProduct
} = require("../controllers/lemonController");

// GET all lemon products
router.get("/", getAllLemonProducts);

// POST new lemon product (optional admin)
router.post("/", addLemonProduct);

module.exports = router;
