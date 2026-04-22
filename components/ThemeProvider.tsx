"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Initialize state lazily. 
  // This function only runs once on the initial build.
  const [theme, setTheme] = useState<string>(() => {
    // We check if we are in the browser (window is defined) 
    // to prevent errors during Next.js Server Side Rendering.
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // 2. Synchronize the DOM and localStorage whenever the theme changes.
useEffect(() => {
    const root = window.document.documentElement;
    
    // Explicitly remove both to prevent <html class="dark light">
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);