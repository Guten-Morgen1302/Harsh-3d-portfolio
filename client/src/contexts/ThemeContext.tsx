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
      document.documentElement.style.setProperty("--background", "240 30% 5%"); // Space dark
      document.documentElement.style.setProperty("--primary", "259 85% 50%"); // Purple cosmic
      document.documentElement.style.setProperty("--secondary", "187 100% 60%"); // Bright cyan
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.add("light-mode");
      document.documentElement.style.setProperty("--background", "220 20% 90%"); // Light blue-gray
      document.documentElement.style.setProperty("--primary", "259 75% 45%"); // Lighter purple
      document.documentElement.style.setProperty("--secondary", "187 90% 45%"); // Lighter cyan
    }
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
