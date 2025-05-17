import React, { useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import DesignExport from "./components/DesignExport";
import Gallery from "./components/Gallery";
import ChatDetail from "./components/ChatDetail";
import NewChatForm from "./components/NewChatForm";
import UserLogin from "./components/UserLogin";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [designChat, setDesignChat] = useState(null);

  const handleLogin = (userId) => {
    console.log("Přihlášen:", userId);
    setIsLoggedIn(true);
  };

  const handleNewChat = () => {
    setSelectedChatId(null);
  };

  if (!isLoggedIn) {
    return <UserLogin onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <ThemeToggle />
      <h1>GeriApp Chat + Obrázky</h1>
      <NewChatForm onNewChat={handleNewChat} />
      <ChatList onSelectChat={setSelectedChatId} />
      {selectedChatId ? (
        <ChatDetail chatId={selectedChatId} />
      ) : (
        <ChatWindow />
      )}
    </div>
  );
}

export default App;
