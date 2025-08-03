const mongoose = require("mongoose");
const Lemon = require("./models/lemonModel");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const lemonProducts = [
  // 🌿 Original 6
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
  },

  // 🌟 New 6 Businesses
  {
    product_name: "Lemon Candy Manufacturing",
    description: "Making lemon-flavored hard and soft candies for retail and school supply chains.",
    initial_investment: "₹2-4 lakhs",
    roi: "35-50%",
    difficulty_level: "Medium",
    legal_requirements: ["FSSAI", "Food Safety Compliance Certificate"],
    govt_schemes: ["Stand-Up India", "MUDRA"],
    location_suitability: ["Delhi", "Maharashtra", "West Bengal"],
    target_market: ["Retail Shops", "Supermarkets", "Online Candy Stores"],
    budget_breakdown: {
      raw_material: "₹40,000",
      machinery: "₹1,20,000",
      packaging: "₹20,000",
      labor: "₹25,000",
      marketing: "₹30,000",
      others: "₹15,000"
    },
    law_details: "FSSAI license mandatory with periodic quality testing reports.",
    license_process: "Apply via FSSAI online, submit testing samples to local lab.",
    govt_scheme_details: "MUDRA loans offer collateral-free working capital assistance."
  },
  {
    product_name: "Lemon-Infused Skincare Products",
    description: "Formulation of lemon-based facewash, toners, and creams for cosmetic industry.",
    initial_investment: "₹5-8 lakhs",
    roi: "60%",
    difficulty_level: "Hard",
    legal_requirements: ["Drug & Cosmetic License", "ISO Certification"],
    govt_schemes: ["MSME Udyam", "SIDBI", "CGTMSE"],
    location_suitability: ["Bangalore", "Mumbai", "Chennai"],
    target_market: ["Online Beauty Stores", "Wellness Chains", "Dermatologists"],
    budget_breakdown: {
      raw_material: "₹1,00,000",
      machinery: "₹3,00,000",
      packaging: "₹60,000",
      labor: "₹80,000",
      marketing: "₹90,000",
      others: "₹50,000"
    },
    law_details: "Cosmetic Act compliance + ISO GMP manufacturing standards required.",
    license_process: "Apply to CDSCO + register brand trademark.",
    govt_scheme_details: "SIDBI offers loan-to-grant hybrid models for women entrepreneurs."
  },
  {
    product_name: "Lemon-Flavor Tea Blend Production",
    description: "Creating packaged lemon-flavored tea blends with herbs for health-conscious consumers.",
    initial_investment: "₹1.5-3 lakhs",
    roi: "40%",
    difficulty_level: "Easy",
    legal_requirements: ["FSSAI", "Tea Board Registration"],
    govt_schemes: ["PM FME", "Startup India"],
    location_suitability: ["Assam", "Darjeeling", "Nilgiris"],
    target_market: ["Cafes", "Wellness Stores", "Amazon/Flipkart"],
    budget_breakdown: {
      raw_material: "₹30,000",
      machinery: "₹60,000",
      packaging: "₹20,000",
      labor: "₹15,000",
      marketing: "₹20,000",
      others: "₹10,000"
    },
    law_details: "Labeling laws under FSSAI apply + register with Tea Board of India.",
    license_process: "Online via both FSSAI and Tea Board portals.",
    govt_scheme_details: "PMFME and Startup India allow support for herbal innovation packaging."
  },
  {
    product_name: "Lemon Export Business",
    description: "Procurement and export of fresh lemons to Middle Eastern and European countries.",
    initial_investment: "₹10-20 lakhs",
    roi: "55%",
    difficulty_level: "Hard",
    legal_requirements: ["APEDA", "Export License", "GST"],
    govt_schemes: ["Export Promotion Capital Goods (EPCG)", "APEDA Assistance"],
    location_suitability: ["Andhra Pradesh", "Maharashtra", "Gujarat"],
    target_market: ["Wholesalers Abroad", "GCC Countries", "UK/EU Retail"],
    budget_breakdown: {
      raw_material: "₹2,00,000",
      machinery: "₹3,00,000",
      packaging: "₹1,00,000",
      labor: "₹1,00,000",
      marketing: "₹1,00,000",
      others: "₹1,00,000"
    },
    law_details: "Needs APEDA registration + phytosanitary certificate + customs clearance.",
    license_process: "Register with DGFT, APEDA, and local customs authorities.",
    govt_scheme_details: "Get EPCG exemption + freight subsidy for cold chain logistics."
  },
  {
    product_name: "Lemon Herbal Remedies",
    description: "Creating traditional lemon-based ayurvedic syrups, detox shots, and powders.",
    initial_investment: "₹2-5 lakhs",
    roi: "45%",
    difficulty_level: "Medium",
    legal_requirements: ["AYUSH Certification", "FSSAI"],
    govt_schemes: ["AYUSH Mission", "Mudra Loan"],
    location_suitability: ["Himachal Pradesh", "Kerala", "Uttarakhand"],
    target_market: ["Ayurvedic Stores", "Wellness Retreats", "Export to Ayurveda hubs"],
    budget_breakdown: {
      raw_material: "₹40,000",
      machinery: "₹1,20,000",
      packaging: "₹30,000",
      labor: "₹30,000",
      marketing: "₹40,000",
      others: "₹20,000"
    },
    law_details: "Mandatory AYUSH registration with batch-level quality checks.",
    license_process: "Through state AYUSH board + product-wise approval process.",
    govt_scheme_details: "AYUSH Mission offers capital + R&D support for certified formulations."
  },
  {
    product_name: "Lemon-Based Cleaning Solutions",
    description: "Producing eco-friendly lemon-scented surface cleaners and dish liquids.",
    initial_investment: "₹2-4 lakhs",
    roi: "35-45%",
    difficulty_level: "Medium",
    legal_requirements: ["Pollution Control Certificate", "Trade License"],
    govt_schemes: ["Startup India", "Credit Guarantee Scheme"],
    location_suitability: ["Industrial Clusters"],
    target_market: ["Households", "Hotels", "Cleaning Contractors"],
    budget_breakdown: {
      raw_material: "₹50,000",
      machinery: "₹1,00,000",
      packaging: "₹30,000",
      labor: "₹20,000",
      marketing: "₹30,000",
      others: "₹20,000"
    },
    law_details: "Product safety certification and environmental compliance required.",
    license_process: "Register with PCB, apply for pollution clearance, trade license.",
    govt_scheme_details: "Apply under Startup India with MSME Udyam registration."
  },

  // 🆕 Additional 12 New Business Ideas
  {
    product_name: "Lemon Ice Cream & Sorbet Production",
    description: "Artisanal lemon ice cream and sorbet production for premium dessert markets.",
    initial_investment: "₹3-6 lakhs",
    roi: "45-60%",
    difficulty_level: "Medium",
    legal_requirements: ["FSSAI", "Cold Storage License"],
    govt_schemes: ["PM FME", "Cold Chain Infrastructure"],
    location_suitability: ["Metropolitan Cities", "Tourist Destinations"],
    target_market: ["Ice Cream Parlors", "Hotels", "Online Dessert Delivery"],
    budget_breakdown: {
      raw_material: "₹60,000",
      machinery: "₹2,00,000",
      packaging: "₹40,000",
      labor: "₹50,000",
      marketing: "₹40,000",
      others: "₹30,000"
    },
    law_details: "FSSAI compliance with cold storage facility requirements.",
    license_process: "FSSAI registration + local food safety inspection.",
    govt_scheme_details: "PM FME scheme supports cold chain infrastructure development."
  },
  {
    product_name: "Lemon Essential Oil Aromatherapy",
    description: "Premium lemon essential oil extraction for aromatherapy and wellness industry.",
    initial_investment: "₹4-8 lakhs",
    roi: "70%",
    difficulty_level: "Hard",
    legal_requirements: ["ISO Certification", "Aromatherapy Association Registration"],
    govt_schemes: ["MSME", "Export Promotion"],
    location_suitability: ["Himachal Pradesh", "Uttarakhand", "Kerala"],
    target_market: ["Spa Centers", "Wellness Clinics", "Export Markets"],
    budget_breakdown: {
      raw_material: "₹80,000",
      machinery: "₹3,00,000",
      packaging: "₹50,000",
      labor: "₹60,000",
      marketing: "₹70,000",
      others: "₹40,000"
    },
    law_details: "ISO standards for essential oil production and quality control.",
    license_process: "ISO certification + aromatherapy association membership.",
    govt_scheme_details: "Export promotion schemes for essential oil exports."
  },
  {
    product_name: "Lemon-Based Beverage Concentrates",
    description: "Manufacturing concentrated lemon syrups and cordials for beverage industry.",
    initial_investment: "₹5-10 lakhs",
    roi: "50%",
    difficulty_level: "Medium",
    legal_requirements: ["FSSAI", "BIS Standards"],
    govt_schemes: ["PMEGP", "Food Processing"],
    location_suitability: ["Industrial Zones", "Food Processing Hubs"],
    target_market: ["Beverage Companies", "Restaurants", "Retail Chains"],
    budget_breakdown: {
      raw_material: "₹1,20,000",
      machinery: "₹3,50,000",
      packaging: "₹80,000",
      labor: "₹70,000",
      marketing: "₹60,000",
      others: "₹50,000"
    },
    law_details: "FSSAI compliance with BIS standards for beverage concentrates.",
    license_process: "FSSAI registration + BIS certification process.",
    govt_scheme_details: "PMEGP supports food processing unit establishment."
  },
  {
    product_name: "Lemon Peel Pectin Extraction",
    description: "Extracting pectin from lemon peels for use in jams, jellies, and pharmaceutical industry.",
    initial_investment: "₹8-15 lakhs",
    roi: "55%",
    difficulty_level: "Hard",
    legal_requirements: ["FSSAI", "Pharmaceutical License"],
    govt_schemes: ["SIDBI", "Pharma Promotion"],
    location_suitability: ["Pharma Hubs", "Food Processing Zones"],
    target_market: ["Jam Manufacturers", "Pharmaceutical Companies", "Export"],
    budget_breakdown: {
      raw_material: "₹1,50,000",
      machinery: "₹4,00,000",
      packaging: "₹1,00,000",
      labor: "₹1,00,000",
      marketing: "₹80,000",
      others: "₹70,000"
    },
    law_details: "FSSAI for food grade, pharmaceutical license for medical applications.",
    license_process: "Dual licensing process for food and pharmaceutical applications.",
    govt_scheme_details: "SIDBI supports pharmaceutical ingredient manufacturing."
  },
  {
    product_name: "Lemon-Based Natural Preservatives",
    description: "Developing natural preservatives from lemon extracts for food industry.",
    initial_investment: "₹6-12 lakhs",
    roi: "65%",
    difficulty_level: "Hard",
    legal_requirements: ["FSSAI", "Food Additive Approval"],
    govt_schemes: ["Food Processing", "Innovation Support"],
    location_suitability: ["Food Processing Hubs", "Research Centers"],
    target_market: ["Food Manufacturers", "Organic Food Companies", "Export"],
    budget_breakdown: {
      raw_material: "₹1,00,000",
      machinery: "₹4,50,000",
      packaging: "₹80,000",
      labor: "₹90,000",
      marketing: "₹1,00,000",
      others: "₹80,000"
    },
    law_details: "FSSAI approval for food additives and preservatives.",
    license_process: "Food additive approval process through FSSAI.",
    govt_scheme_details: "Food processing schemes support innovation in natural preservatives."
  },
  {
    product_name: "Lemon-Based Pet Care Products",
    description: "Creating lemon-scented pet shampoos, sprays, and grooming products.",
    initial_investment: "₹2-5 lakhs",
    roi: "40-55%",
    difficulty_level: "Medium",
    legal_requirements: ["Pet Care Product Registration", "Safety Certification"],
    govt_schemes: ["MSME", "Pet Industry Support"],
    location_suitability: ["Urban Centers", "Pet Care Hubs"],
    target_market: ["Pet Shops", "Veterinary Clinics", "Online Pet Stores"],
    budget_breakdown: {
      raw_material: "₹40,000",
      machinery: "₹1,50,000",
      packaging: "₹30,000",
      labor: "₹35,000",
      marketing: "₹45,000",
      others: "₹25,000"
    },
    law_details: "Pet care product safety standards and registration requirements.",
    license_process: "Pet care product registration and safety certification.",
    govt_scheme_details: "MSME schemes support pet care product manufacturing."
  },
  {
    product_name: "Lemon-Based Textile Dyes",
    description: "Natural lemon-based dyes for eco-friendly textile and fabric industry.",
    initial_investment: "₹3-7 lakhs",
    roi: "45%",
    difficulty_level: "Medium",
    legal_requirements: ["Textile Dye Certification", "Environmental Clearance"],
    govt_schemes: ["Textile Promotion", "Green Technology"],
    location_suitability: ["Textile Hubs", "Handloom Centers"],
    target_market: ["Textile Manufacturers", "Handloom Weavers", "Eco-Fashion Brands"],
    budget_breakdown: {
      raw_material: "₹60,000",
      machinery: "₹2,20,000",
      packaging: "₹40,000",
      labor: "₹50,000",
      marketing: "₹50,000",
      others: "₹30,000"
    },
    law_details: "Textile dye certification and environmental compliance standards.",
    license_process: "Textile dye certification and environmental clearance.",
    govt_scheme_details: "Textile promotion schemes support natural dye manufacturing."
  },
  {
    product_name: "Lemon-Based Paper Products",
    description: "Manufacturing lemon-scented paper products like tissues, napkins, and stationery.",
    initial_investment: "₹4-8 lakhs",
    roi: "35-50%",
    difficulty_level: "Medium",
    legal_requirements: ["Paper Industry License", "Environmental Compliance"],
    govt_schemes: ["Paper Industry", "MSME"],
    location_suitability: ["Paper Mills", "Industrial Zones"],
    target_market: ["Hotels", "Restaurants", "Office Suppliers", "Retail"],
    budget_breakdown: {
      raw_material: "₹80,000",
      machinery: "₹2,80,000",
      packaging: "₹50,000",
      labor: "₹60,000",
      marketing: "₹40,000",
      others: "₹40,000"
    },
    law_details: "Paper industry regulations and environmental compliance requirements.",
    license_process: "Paper industry license and environmental clearance.",
    govt_scheme_details: "Paper industry schemes support innovative paper products."
  },
  {
    product_name: "Lemon-Based Candle Making",
    description: "Artisanal lemon-scented candles for home decor and aromatherapy markets.",
    initial_investment: "₹1-3 lakhs",
    roi: "50-70%",
    difficulty_level: "Easy",
    legal_requirements: ["Candle Safety Standards", "Local Business License"],
    govt_schemes: ["MSME", "Handicraft Promotion"],
    location_suitability: ["Tourist Destinations", "Urban Centers"],
    target_market: ["Home Decor Stores", "Gift Shops", "Online Marketplaces"],
    budget_breakdown: {
      raw_material: "₹25,000",
      machinery: "₹80,000",
      packaging: "₹20,000",
      labor: "₹25,000",
      marketing: "₹30,000",
      others: "₹15,000"
    },
    law_details: "Candle safety standards and local business registration requirements.",
    license_process: "Local business license and candle safety certification.",
    govt_scheme_details: "MSME and handicraft schemes support artisanal candle making."
  },
  {
    product_name: "Lemon-Based Soap Manufacturing",
    description: "Natural lemon-scented soaps and bath products for personal care market.",
    initial_investment: "₹2-5 lakhs",
    roi: "45-60%",
    difficulty_level: "Medium",
    legal_requirements: ["Soap Manufacturing License", "BIS Standards"],
    govt_schemes: ["MSME", "Handicraft"],
    location_suitability: ["Handicraft Centers", "Tourist Areas"],
    target_market: ["Beauty Stores", "Hotels", "Online Beauty Retailers"],
    budget_breakdown: {
      raw_material: "₹35,000",
      machinery: "₹1,20,000",
      packaging: "₹25,000",
      labor: "₹30,000",
      marketing: "₹35,000",
      others: "₹20,000"
    },
    law_details: "Soap manufacturing license and BIS quality standards compliance.",
    license_process: "Soap manufacturing license and BIS certification.",
    govt_scheme_details: "MSME and handicraft schemes support artisanal soap making."
  },
  {
    product_name: "Lemon-Based Air Fresheners",
    description: "Natural lemon air fresheners and room sprays for home and commercial use.",
    initial_investment: "₹1.5-4 lakhs",
    roi: "40-55%",
    difficulty_level: "Easy",
    legal_requirements: ["Chemical Safety", "Local Business License"],
    govt_schemes: ["MSME", "Chemical Industry"],
    location_suitability: ["Industrial Areas", "Urban Centers"],
    target_market: ["Home Stores", "Car Accessories", "Commercial Spaces"],
    budget_breakdown: {
      raw_material: "₹30,000",
      machinery: "₹1,00,000",
      packaging: "₹25,000",
      labor: "₹20,000",
      marketing: "₹25,000",
      others: "₹15,000"
    },
    law_details: "Chemical safety standards and local business registration.",
    license_process: "Local business license and chemical safety compliance.",
    govt_scheme_details: "MSME schemes support chemical product manufacturing."
  },
  {
    product_name: "Lemon-Based Fertilizer Production",
    description: "Organic lemon-based fertilizers and soil conditioners for agricultural use.",
    initial_investment: "₹2-6 lakhs",
    roi: "30-45%",
    difficulty_level: "Medium",
    legal_requirements: ["Fertilizer License", "Organic Certification"],
    govt_schemes: ["Agriculture", "Organic Farming"],
    location_suitability: ["Agricultural Regions", "Organic Farming Hubs"],
    target_market: ["Farmers", "Nurseries", "Organic Stores", "Export"],
    budget_breakdown: {
      raw_material: "₹40,000",
      machinery: "₹1,80,000",
      packaging: "₹30,000",
      labor: "₹35,000",
      marketing: "₹35,000",
      others: "₹25,000"
    },
    law_details: "Fertilizer license and organic certification requirements.",
    license_process: "Fertilizer license and organic certification process.",
    govt_scheme_details: "Agriculture schemes support organic fertilizer production."
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
