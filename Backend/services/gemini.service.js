import { configDotenv } from "dotenv";

configDotenv();
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export const askGemini = async (prompt, model = 'gemini-2.5-flash-lite') => {
  const url = `${GEMINI_URL}/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Gemini Error: ${data.error?.message || response.statusText}`);
  }

  return data.candidates[0].content.parts[0].text;
};