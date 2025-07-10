const mongoose = require("mongoose");
const Lemon = require("./models/lemonModel");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "your_mongo_uri_here";

const lemonProducts = [
  {
    product_name: "Lemon Oil Extraction",
    description: "Extracting essential oil from lemon peels used in cosmetics, aromatherapy, and cleaners.",
    initial_investment: "₹2-5 lakhs",
    roi: "25-40%",
    difficulty_level: "Medium",
    legal_requirements: ["FSSAI License", "Factory License", "Pollution Certificate"],
    govt_schemes: ["MSME Loan", "PMEGP"],
    location_suitability: ["Maharashtra", "Tamil Nadu", "Andhra Pradesh"],
    target_market: ["Cosmetic Industry", "Pharmaceutical Companies"],
    budget_breakdown: {
      raw_material: "₹50,000",
      machinery: "₹1,50,000",
      packaging: "₹20,000",
      labor: "₹30,000",
      marketing: "₹25,000",
      others: "₹25,000"
    },
    law_details: "Needs FSSAI for edible oils, or Drugs & Cosmetics Act registration for cosmetic usage.",
    license_process: "Apply for FSSAI online, Pollution Control Board approval, and Udyam registration.",
    govt_scheme_details: "Eligible for PMEGP up to ₹10 lakh with subsidy and SIDBI loan under MSME."
  },
  {
    product_name: "Lemon Pickles",
    description: "Traditional lemon pickle production and bottling for regional and export markets.",
    initial_investment: "₹1-3 lakhs",
    roi: "30-50%",
    difficulty_level: "Easy",
    legal_requirements: ["FSSAI License", "Local Food Production Certificate"],
    govt_schemes: ["PM FME Scheme", "Stand-Up India"],
    location_suitability: ["Kerala", "Gujarat", "Punjab"],
    target_market: ["Grocery Stores", "Export Distributors"],
    budget_breakdown: {
      raw_material: "₹20,000",
      machinery: "₹70,000",
      packaging: "₹15,000",
      labor: "₹20,000",
      marketing: "₹10,000",
      others: "₹15,000"
    },
    law_details: "FSSAI registration needed for any packaged food product.",
    license_process: "Online FSSAI application with local food inspector verification.",
    govt_scheme_details: "PM FME offers 35% subsidy for micro food enterprises up to ₹10 lakhs."
  },
  {
    product_name: "Lemon Juice Bottling",
    description: "Production of bottled lemon juice with added preservatives for extended shelf life.",
    initial_investment: "₹3-6 lakhs",
    roi: "35%",
    difficulty_level: "Medium",
    legal_requirements: ["FSSAI License", "BIS Certification", "Pollution Control Certificate"],
    govt_schemes: ["PMEGP", "MUDRA Loan"],
    location_suitability: ["Madhya Pradesh", "Karnataka", "Telangana"],
    target_market: ["Retail Chains", "Hotels", "Online Grocery Stores"],
    budget_breakdown: {
      raw_material: "₹80,000",
      machinery: "₹2,00,000",
      packaging: "₹50,000",
      labor: "₹40,000",
      marketing: "₹30,000",
      others: "₹40,000"
    },
    law_details: "FSSAI + ISI certification needed for bottling plants. Must follow BIS standards.",
    license_process: "Apply for BIS and FSSAI; pollution certificate through state SPCB.",
    govt_scheme_details: "MUDRA loans up to ₹10 lakhs for bottling and packaging businesses."
  },
  {
    product_name: "Lemon Powder Production",
    description: "Drying and grinding lemon into powder used in foods, pharma, and cosmetics.",
    initial_investment: "₹4-7 lakhs",
    roi: "40%",
    difficulty_level: "Medium",
    legal_requirements: ["FSSAI", "MSME Registration"],
    govt_schemes: ["PM FME", "MUDRA"],
    location_suitability: ["Uttar Pradesh", "Maharashtra"],
    target_market: ["Bakeries", "Pharma", "Restaurants"],
    budget_breakdown: {
      raw_material: "₹60,000",
      machinery: "₹2,50,000",
      packaging: "₹30,000",
      labor: "₹40,000",
      marketing: "₹35,000",
      others: "₹20,000"
    },
    law_details: "Comply with FSSAI guidelines for dried fruit products.",
    license_process: "Apply via FSSAI portal and get MSME Udyam registered.",
    govt_scheme_details: "Apply under PMFME with support from state food processing units."
  },
  {
    product_name: "Citric Acid Manufacturing",
    description: "Manufacturing citric acid from lemon waste for use in food, pharma, and industry.",
    initial_investment: "₹10-15 lakhs",
    roi: "50%",
    difficulty_level: "Hard",
    legal_requirements: ["Factory License", "FSSAI", "Drug License"],
    govt_schemes: ["Stand-Up India", "SIDBI Scheme"],
    location_suitability: ["Gujarat", "Maharashtra", "Andhra Pradesh"],
    target_market: ["Pharma", "Beverage Companies", "Food Preservatives"],
    budget_breakdown: {
      raw_material: "₹1,00,000",
      machinery: "₹5,00,000",
      packaging: "₹1,00,000",
      labor: "₹1,00,000",
      marketing: "₹50,000",
      others: "₹1,00,000"
    },
    law_details: "License under the Drugs & Cosmetics Act and FSSAI mandatory.",
    license_process: "Requires high-level inspection and pollution clearance.",
    govt_scheme_details: "Apply through Stand-Up India or SIDBI for up to ₹25 lakh loan with subsidy."
  },
  {
    product_name: "Lemon Compost from Peels",
    description: "Converting lemon peels into organic compost and selling to farmers and nurseries.",
    initial_investment: "₹50,000 - ₹1 lakh",
    roi: "20-30%",
    difficulty_level: "Easy",
    legal_requirements: ["No major license", "Local municipal permission"],
    govt_schemes: ["NABARD", "Startup India"],
    location_suitability: ["Rural and semi-urban areas"],
    target_market: ["Farmers", "Nurseries", "Organic Stores"],
    budget_breakdown: {
      raw_material: "₹10,000",
      machinery: "₹30,000",
      packaging: "₹5,000",
      labor: "₹10,000",
      marketing: "₹5,000",
      others: "₹5,000"
    },
    law_details: "Basic local body registration or NGO tie-up if scaling.",
    license_process: "Minimal—contact local panchayat or urban office for NOC.",
    govt_scheme_details: "NABARD can assist in micro-composting units with partial grant."
  }
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Lemon.deleteMany({});
    console.log("Cleared old lemon product data");
    await Lemon.insertMany(lemonProducts);
    console.log("Lemon product data inserted successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
