import React, { useEffect, useState } from "react";
import { icons } from "./IconSet";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button onClick={toggleTheme} style={{ float: "right", marginBottom: "10px" }}>
      {theme === "dark" ? icons.sun : icons.moon}
    </button>
  );
};

export default ThemeToggle;