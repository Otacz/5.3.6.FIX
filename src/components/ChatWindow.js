import React, { useEffect, useState } from "react";
import { loadChatHistory } from "../utils/loadChatHistory";
import { loadPresetMemory } from "../utils/loadPresetMemory";
import { getAssistantReply } from "../getAssistantReply";
import FileAnalyzer from "./FileAnalyzer";

const ChatWindow = ({ userId, chatId, apiKey }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("Jsi přátelský asistent. Odpovídej česky.");
  const [presetMemory, setPresetMemory] = useState("");
  const [memory, setMemory] = useState("");

  useEffect(() => {
    const loadEverything = async () => {
      const loaded = await loadChatHistory(userId, chatId);
      const preset = await loadPresetMemory(chatId);
      setMessages(loaded);
      setPresetMemory(preset);
    };
    if (chatId) loadEverything();
  }, [userId, chatId]);

  const handleSend = async () => {
    const userMsg = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    await saveMessage(userId, chatId, "user", input);

    const reply = await getAssistantReply(userId, chatId, systemPrompt, presetMemory, memory, newMessages, apiKey);
    const assistantMsg = {
      role: "assistant",
      content: reply,
      timestamp: new Date().toISOString()
    };
    await saveMessage(userId, chatId, "assistant", reply);
    setMessages([...newMessages, assistantMsg]);
    setInput("");
  };

  const formatTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{
        maxHeight: "60vh",
        overflowY: "auto",
        marginBottom: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#f9f9f9"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: "0.75rem",
            textAlign: msg.role === "user" ? "right" : "left"
          }}>
            <div style={{
              display: "inline-block",
              padding: "0.6rem 1rem",
              borderRadius: "12px",
              maxWidth: "70%",
              backgroundColor: msg.role === "user" ? "#daf1ff" : "#e6e6e6"
            }}>
              <div style={{ fontSize: "0.9rem", marginBottom: "0.3rem", fontWeight: "bold" }}>
                {msg.role === "user" ? "Uživatel" : "Asistent"}
              </div>
              <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
              {msg.timestamp && (
                <div style={{ fontSize: "0.75rem", marginTop: "0.3rem", color: "#666" }}>
                  {formatTime(msg.timestamp)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zadej zprávu..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={handleSend}>Odeslat</button>
      </div>
      <FileAnalyzer
        userId={userId}
        chatId={chatId}
        apiKey={apiKey}
        systemPrompt={systemPrompt}
        presetMemory={presetMemory}
        memory={memory}
        messages={messages}
        onReply={setMessages}
      />
    </div>
  );
};

export default ChatWindow;