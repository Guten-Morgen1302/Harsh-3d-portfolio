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
      className={`relative p-2 rounded-full ${
        isDarkMode 
          ? "bg-muted text-yellow-400 hover:text-yellow-300" 
          : "bg-muted text-indigo-500 hover:text-indigo-400"
      } transition-all duration-300 ${
        isMobile ? "flex items-center" : ""
      }`}
      whileHover={{ 
        scale: 1.1,
        rotate: isDarkMode ? 15 : -15,
        boxShadow: isDarkMode 
          ? "0 0 10px 2px rgba(250, 204, 21, 0.5)" 
          : "0 0 10px 2px rgba(99, 102, 241, 0.5)" 
      }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-glow"
      >
        {isDarkMode ? (
          <>
            <i className="fas fa-sun text-lg"></i>
            {isMobile && <span className="ml-2 text-neutral-200">Light Mode</span>}
          </>
        ) : (
          <>
            <i className="fas fa-moon text-lg"></i>
            {isMobile && <span className="ml-2 text-neutral-800">Dark Mode</span>}
          </>
        )}
      </motion.div>
      
      {/* Cosmic particles animation around the toggle */}
      {!isMobile && (
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          {isDarkMode && Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 30],
                y: [0, (Math.random() - 0.5) * 30],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                top: '50%',
                left: '50%',
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
