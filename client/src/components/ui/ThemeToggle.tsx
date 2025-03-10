import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  isMobile?: boolean;
}

export default function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`text-neutral hover:text-accent transition-colors ${
        isMobile ? "flex items-center" : ""
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <>
          <i className="fas fa-sun"></i>
          {isMobile && <span className="ml-2">Light Mode</span>}
        </>
      ) : (
        <>
          <i className="fas fa-moon"></i>
          {isMobile && <span className="ml-2">Dark Mode</span>}
        </>
      )}
    </motion.button>
  );
}
