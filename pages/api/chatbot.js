import {OpenAI} from "openai";

// Ensure API Key is loaded from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Make sure the API key is present
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OpenAI API Key" });
    }

    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      });
      

    return res.status(200).json({ reply: response.choices?.[0]?.message?.content || "No response from AI" });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return res.status(500).json({ error: "Failed to fetch response", details: error.message });
  }
}
