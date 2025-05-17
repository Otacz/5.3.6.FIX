
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import { icons } from "./IconSet";

function ChatList({ onSelectChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const querySnapshot = await getDocs(collection(db, "geriapp-history"));
      const chatList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        preview: doc.data().question || "Bez názvu",
      }));
      setChats(chatList);
    };

    fetchChats();
  }, []);

  return (
    <div>
      <h2>Moje chaty</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            style={{ cursor: "pointer", marginBottom: "10px" }}
            onClick={() => onSelectChat(chat.id)}
          >
            {icons.chat} {chat.preview} <button style={{ float: "right" }} onClick={(e) => { e.stopPropagation(); onDesignSelect(chat); }}>📄 Návrh</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
