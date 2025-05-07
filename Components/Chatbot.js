import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...messages, userMessage, { role: "bot", content: data.reply }]);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setInput(""); // Clear input after sending
  };

  return (
    <div className="border rounded-lg p-4 mt-4 bg-gray-100">
      <h2 className="text-lg font-bold">Chatbot</h2>
      <div className="h-40 overflow-y-auto bg-white p-2 rounded-md">
        {messages.map((msg, i) => (
          <p key={i} className={msg.role === "user" ? "text-right text-blue-500" : "text-left text-gray-700"}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full p-2 border rounded mt-2"
      />
      <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
        Send
      </button>
    </div>
  );
};

export default Chatbot;
