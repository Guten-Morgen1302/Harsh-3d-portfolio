
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function OrbitalRing() {
  const { isDarkMode } = useTheme();
  const ringRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ringRef, { once: false, amount: 0.3 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" ref={ringRef}>
      {/* Orbital rings */}
      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-2 ${
          isDarkMode ? "border-accent/20" : "border-primary/20"
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1,
          rotate: 360 
        } : {}}
        transition={{ 
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
        style={{
          boxShadow: isDarkMode 
            ? "0 0 30px rgba(0, 229, 255, 0.1)" 
            : "0 0 30px rgba(74, 38, 171, 0.1)"
        }}
      />
      
      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full border-2 rotate-45 ${
          isDarkMode ? "border-accent/10" : "border-primary/10"
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1,
          rotate: [45, 405] 
        } : {}}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.2 },
          scale: { duration: 0.8, delay: 0.2 },
          rotate: { duration: 80, repeat: Infinity, ease: "linear" }
        }}
        style={{
          boxShadow: isDarkMode 
            ? "0 0 20px rgba(0, 229, 255, 0.05)" 
            : "0 0 20px rgba(74, 38, 171, 0.05)"
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute rounded-full ${
            isDarkMode 
              ? i % 2 === 0 ? "bg-accent" : "bg-blue-300" 
              : i % 2 === 0 ? "bg-primary" : "bg-purple-300"
          }`}
          initial={{ opacity: 0 }}
          animate={isInView ? { 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          } : {}}
          transition={{ 
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5 
          }}
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            top: `calc(50% + ${Math.sin(i * 45) * (150 + i * 20)}px)`,
            left: `calc(50% + ${Math.cos(i * 45) * (150 + i * 20)}px)`,
            boxShadow: isDarkMode 
              ? "0 0 10px rgba(0, 229, 255, 0.6)" 
              : "0 0 10px rgba(74, 38, 171, 0.6)"
          }}
        />
      ))}
    </div>
  );
}
