
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize with dark mode as default
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check localStorage for saved preference or use system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update body class and localStorage when theme changes
  useEffect(() => {
    // This function keeps the site always in cosmic theme, but with light/dark variants
    const applyCosmicTheme = () => {
      // Apply theme-specific cosmic variants
      if (isDarkMode) {
        // Dark cosmic theme - deeper purple, brighter accents
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        document.body.classList.remove("light-mode");

        document.documentElement.style.setProperty("--background", "260 75% 25%"); // Deep purple space
        document.documentElement.style.setProperty("--primary", "260 75% 45%"); // Vibrant purple
        document.documentElement.style.setProperty("--secondary", "180 100% 50%"); // Bright cyan
        document.documentElement.style.setProperty("--foreground", "0 0% 100%"); // Pure white text
        document.documentElement.style.setProperty("--muted", "260 70% 35%"); // Deep muted purple
        document.documentElement.style.setProperty("--neutral", "217 10% 70%");
        document.documentElement.style.setProperty("--neutral-dark", "240 30% 10%");
        document.documentElement.style.setProperty("--accent", "187 100% 60%");
      } else {
        // Light cosmic theme - lighter purples, softer glows
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        document.body.classList.add("light-mode");

        document.documentElement.style.setProperty("--background", "220 20% 90%"); // Light blue-gray like daylight sky
        document.documentElement.style.setProperty("--primary", "259 75% 45%"); // Lighter purple
        document.documentElement.style.setProperty("--secondary", "187 90% 45%"); // Softer cyan
        document.documentElement.style.setProperty("--foreground", "240 30% 10%"); // Dark text
        document.documentElement.style.setProperty("--muted", "220 20% 80%"); // Lighter muted purple
        document.documentElement.style.setProperty("--neutral", "240 10% 40%");
        document.documentElement.style.setProperty("--neutral-dark", "220 20% 80%");
        document.documentElement.style.setProperty("--accent", "259 75% 45%");
      }
    };

    // Apply the cosmic theme
    applyCosmicTheme();

    // Save preference to local storage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
