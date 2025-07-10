const mongoose = require("mongoose");

const lemonProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  initial_investment: {
    type: String
  },
  roi: {
    type: String
  },
  legal_requirements: {
    type: [String]
  },
  govt_schemes: {
    type: [String]
  },
  difficulty_level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"]
  },
  location_suitability: {
    type: [String]
  },
  target_market: {
    type: [String]
  },

  // New Fields for Detailed Info

  budget_breakdown: {
    raw_material: String,
    machinery: String,
    packaging: String,
    labor: String,
    marketing: String,
    others: String
  },

  law_details: {
    type: String // Full explanation of laws and licenses needed
  },

  license_process: {
    type: String // Step-by-step guide if applicable
  },

  govt_scheme_details: {
    type: String // In-depth explanation or how to apply
  }
});

const Lemon = mongoose.model("Lemon", lemonProductSchema);
module.exports = Lemon;
