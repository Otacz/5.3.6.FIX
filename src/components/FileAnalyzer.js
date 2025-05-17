import React, { useState } from "react";
import { getAssistantReply } from "../getAssistantReply";

const FileAnalyzer = ({ userId, chatId, apiKey, systemPrompt, presetMemory, memory, messages, onReply }) => {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    const fileContents = await Promise.all(
      files.map((file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ name: file.name, content: reader.result });
          };
          reader.onerror = reject;
          reader.readAsText(file);
        })
      )
    );

    const contentForAI = fileContents
      .map(f => `Soubor: ${f.name}\n\n${f.content}`)
      .join("\n\n---\n\n");

    const newMessages = [...messages, {
      role: "user",
      content: "Analyzuj následující soubory:\n\n" + contentForAI
    }];

    await saveMessage(userId, chatId, "user", "Analyzuj následující soubory:\n\n" + fileContents.map(f => f.name).join(", "));
    const reply = await getAssistantReply(userId, chatId, systemPrompt, presetMemory, memory, newMessages, apiKey);
    await saveMessage(userId, chatId, "assistant", reply);
    onReply([...newMessages, { role: "assistant", content: reply }]);
    setUploading(false);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <input type="file" multiple onChange={handleFiles} />
      {uploading && <p>Nahrávám a analyzuji...</p>}
    </div>
  );
};

export default FileAnalyzer;