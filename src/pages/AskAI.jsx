import React, { useState } from "react";
import { apiRequest } from "../api";
import Button from "../components/Button";
import Card from "../components/Card";

export default function AskAI({ setToast }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function send() {
    if (!input.trim()) return;
    const q = input;
    setInput("");
    setMessages((msgs) => [...msgs, { role: "user", text: q }]);

    try {
      const res = await apiRequest("/ai/chat", {
        method: "POST",
        body: JSON.stringify({ query: q }),
      });
      setMessages((msgs) => [...msgs, { role: "assistant", text: res.answer }]);
    } catch (e) {
      setToast(e.message);
    }
  }

  const helpers = [
    "Summarize this article",
    "Find related articles",
    "Explain this in simple terms",
  ];

  return (
    <div>
      <h1>Ask AI</h1>

      <div style={{ marginBottom: "0.75rem" }}>
        {helpers.map((h) => (
          <Button
            key={h}
            variant="secondary"
            onClick={() => setInput(h)}
            style={{ marginRight: "0.5rem" }}
          >
            {h}
          </Button>
        ))}
      </div>

      <Card>
        <div className="messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "msg-user" : "msg-assistant"}
            >
              <strong>{m.role === "user" ? "You: " : "AI: "}</strong>
              {m.text}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: "0.5rem", gap: "0.5rem" }}>
          <input
            style={{ flex: 1 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </div>
  );
}
