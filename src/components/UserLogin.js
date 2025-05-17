import React, { useState } from "react";

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "1985";

const UserLogin = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!userId.trim()) {
      setError("Zadej uživatelské jméno nebo ID.");
      return;
    }

    if (userId === "admin") {
      if (password !== ADMIN_PASSWORD) {
        setError("Nesprávné heslo pro admina.");
        return;
      }
    }

    onLogin(userId.trim());
  };

  return (
    <div>
      <h3>Přihlášení</h3>
      <input
        type="text"
        placeholder="Zadej své uživatelské jméno nebo ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      {userId === "admin" && (
        <input
          type="password"
          placeholder="Zadej heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <button onClick={handleLogin}>Přihlásit se</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UserLogin;