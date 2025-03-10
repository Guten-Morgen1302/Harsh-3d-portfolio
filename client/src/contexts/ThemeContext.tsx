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
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("light-mode");
      document.documentElement.style.setProperty("--background", "260 75% 25%"); // Deep purple space
      document.documentElement.style.setProperty("--primary", "260 75% 45%"); // Vibrant purple
      document.documentElement.style.setProperty("--secondary", "180 100% 50%"); // Bright cyan
      document.documentElement.style.setProperty("--cosmic", "260 75% 25%"); // Deep space purple
      document.documentElement.style.setProperty("--cosmic-accent", "180 100% 60%"); // Bright glow
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.add("light-mode");
      document.documentElement.style.setProperty("--background", "260 60% 30%"); // Lighter purple
      document.documentElement.style.setProperty("--primary", "260 60% 40%"); // Medium purple
      document.documentElement.style.setProperty("--secondary", "180 90% 45%"); // Lighter cyan
      document.documentElement.style.setProperty("--cosmic", "260 60% 30%"); // Lighter space purple
      document.documentElement.style.setProperty("--cosmic-accent", "180 90% 55%"); // Lighter glow
    }
    
    // Setting the default to always be space-themed regardless of mode
    document.documentElement.style.setProperty("--background", "260 75% 25%"); // Deep purple space
    document.documentElement.style.setProperty("--cosmic", "260 75% 25%"); // Deep space purple
    
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
