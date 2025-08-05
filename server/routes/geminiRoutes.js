const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: "../../.env" });

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generateidea", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192, // Limit response size for faster generation
      },
    });

    console.log('Sending request to Gemini API...');
    const startTime = Date.now();

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const responseText = await result.response.text();
    const endTime = Date.now();
    
    console.log(`Gemini API response time: ${endTime - startTime}ms`);

    res.json({ 
      result: responseText,
      responseTime: endTime - startTime
    });

  } catch (error) {
    console.error("Gemini API error:", error.message);
    
    // Handle specific Gemini API errors
    if (error.message.includes('timeout') || error.message.includes('deadline')) {
      return res.status(408).json({ 
        error: "Request timeout - the AI service is taking too long to respond. Please try again." 
      });
    }
    
    if (error.message.includes('quota') || error.message.includes('rate limit')) {
      return res.status(429).json({ 
        error: "Rate limit exceeded. Please try again later." 
      });
    }
    
    if (error.response?.data) {
      console.error("Gemini API details:", error.response.data);
    }
    
    res.status(500).json({ 
      error: "Failed to generate content. Please try again." 
    });
  }
});

module.exports = router;
