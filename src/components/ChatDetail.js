
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function ChatDetail({ chatId }) {
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const fetchChat = async () => {
      const docRef = doc(db, "geriapp-history", chatId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setChat(docSnap.data());
      }
    };
    if (chatId) fetchChat();
  }, [chatId]);

  if (!chat) return <p>Načítám chat...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Detail chatu</h3>
      <p><strong>Otázka:</strong> {chat.question}</p>
      <p><strong>Odpověď:</strong> {chat.answer}</p>
    </div>
  );
}

export default ChatDetail;
