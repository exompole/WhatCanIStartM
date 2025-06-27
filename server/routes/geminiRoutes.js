const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generateidea", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const responseText = await result.response.text();
    res.json({ result: responseText });

  } catch (error) {
    console.error("Gemini API error:", error.message);
    if (error.response?.data) {
      console.error("Gemini API details:", error.response.data);
    }
    res.status(500).json({ error: "Failed to generate content" });
  }
});

module.exports = router;
