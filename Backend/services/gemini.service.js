import { configDotenv } from "dotenv";

configDotenv();

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export const askGemini = async (
  prompt,
  model = "gemini-2.5-flash", // Updated to a current model
  onToken,
) => {
  const url = `${GEMINI_URL}/${model}:streamGenerateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini Error: ${error}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Gemini streams often look like: [ { ... }, { ... } ]
    // We need to find valid JSON objects within the stream
    let startIdx;
    while ((startIdx = buffer.indexOf('{')) !== -1) {
      let endIdx = -1;
      let bracketCount = 0;

      for (let i = startIdx; i < buffer.length; i++) {
        if (buffer[i] === '{') bracketCount++;
        if (buffer[i] === '}') bracketCount--;

        if (bracketCount === 0) {
          endIdx = i;
          break;
        }
      }

      if (endIdx !== -1) {
        const jsonStr = buffer.substring(startIdx, endIdx + 1);
        try {
          const json = JSON.parse(jsonStr);
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) onToken(text);
        } catch (e) {
          console.error("Parsing error", e);
        }
        buffer = buffer.substring(endIdx + 1);
      } else {
        // Incomplete JSON object, wait for next chunk
        break;
      }
    }
  }
};
