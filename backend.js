import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Chatbot API route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Call OpenAI (or DeepSeek API)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.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}`, // your API key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
