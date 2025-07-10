const express = require("express");
const router = express.Router();
const lemonController = require("../controllers/lemonController");

// Route to get all lemon by-products
router.get("/", lemonController.getAllLemonProducts);

// Route to add a new lemon product (optional, protect with auth if needed)
router.post("/", lemonController.addLemonProduct);

module.exports = router;
