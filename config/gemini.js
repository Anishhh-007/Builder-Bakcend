const { GoogleGenAI }  = require("@google/genai");

// Directly API key pathaune, object bhitra haina
const gemini = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});

module.exports = gemini;