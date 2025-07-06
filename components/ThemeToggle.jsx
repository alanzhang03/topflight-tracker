"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn"
      style={{
        padding: "0.5rem 1rem",
        border: "1px solid var(--border)",
        backgroundColor: "var(--card)",
        color: "var(--card-foreground)",
        borderRadius: "0.375rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "1.25rem",
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "var(--secondary)";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "var(--card)";
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
