import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeButton: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage when app starts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // Handle theme switching
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-custom hover:bg-secondary transition-all"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-primary" />
      ) : (
        <Sun className="w-5 h-5 text-primary" />
      )}
    </button>
  );
};

export default ThemeButton;
