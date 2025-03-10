import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

// This component creates an enhanced animated hero object
export default function HeroObject({ mousePosition = { x: 0, y: 0 } }) {
  const { isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Enhanced interactive animation
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updatePosition = () => {
      if (!containerRef.current) return;
      
      setPosition({
        x: mousePosition.x * 20,
        y: mousePosition.y * 20
      });
    };
    
    updatePosition();
    
    const intervalId = setInterval(updatePosition, 50);
    return () => clearInterval(intervalId);
  }, [mousePosition]);

  // Generate particles
  const generateParticles = (count: number) => {
    return [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${isDarkMode ? "bg-accent/30" : "bg-secondary/30"}`}
        initial={{ 
          x: 0, 
          y: 0, 
          opacity: 0.1 + Math.random() * 0.3,
          scale: 0.1 + Math.random() * 0.4
        }}
        animate={{ 
          x: Math.random() * 400 - 200 + position.x * 0.1,
          y: Math.random() * 400 - 200 + position.y * 0.1,
          opacity: [0.1 + Math.random() * 0.3, 0.5, 0.1 + Math.random() * 0.3],
          scale: [0.1 + Math.random() * 0.4, 0.2 + Math.random() * 0.6, 0.1 + Math.random() * 0.4]
        }}
        transition={{ 
          duration: 3 + Math.random() * 5, 
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut",
          delay: Math.random() * 2 
        }}
        style={{
          width: `${5 + Math.random() * 10}px`,
          height: `${5 + Math.random() * 10}px`,
          filter: `blur(${Math.random() * 2}px)`
        }}
      />
    ));
  };

  // Core shapes for the main object
  const coreElements = [
    { 
      size: "w-64 h-64", 
      opacity: "opacity-70", 
      delay: 0, 
      rotate: 0,
      tx: 0, 
      ty: 0 
    },
    { 
      size: "w-52 h-52", 
      opacity: "opacity-90", 
      delay: 0.1, 
      rotate: 15,
      tx: -10, 
      ty: 10 
    },
    { 
      size: "w-40 h-40", 
      opacity: "opacity-100", 
      delay: 0.2, 
      rotate: 30,
      tx: 15, 
      ty: -15 
    }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" ref={containerRef}>
      {/* Floating particles effect */}
      {generateParticles(15)}
      
      {/* Animated core shape */}
      <div className="relative">
        {coreElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute left-1/2 top-1/2 ${element.size} ${element.opacity} rounded-xl bg-gradient-to-br ${
              isDarkMode ? "from-accent to-secondary/70" : "from-primary to-secondary/70"
            }`}
            initial={{ 
              x: -50 + element.tx, 
              y: -50 + element.ty, 
              rotate: element.rotate,
              borderRadius: "20%"
            }}
            animate={{ 
              x: [
                -50 + element.tx, 
                -50 + element.tx + (position.x * 0.05), 
                -50 + element.tx
              ],
              y: [
                -50 + element.ty, 
                -50 + element.ty + (position.y * 0.05), 
                -50 + element.ty
              ],
              rotate: [
                element.rotate, 
                element.rotate + 5, 
                element.rotate
              ],
              borderRadius: ["20%", "30%", "25%", "20%"]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse", 
              ease: "easeInOut",
              delay: element.delay 
            }}
            style={{
              boxShadow: isDarkMode 
                ? `0 0 30px rgba(0, 229, 255, ${0.2 + index * 0.1})` 
                : `0 0 30px rgba(74, 38, 171, ${0.2 + index * 0.1})`,
              transformOrigin: "center center"
            }}
          />
        ))}
        
        {/* Core floating element */}
        <motion.div
          className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${
            isDarkMode ? "from-white/90 to-accent/80" : "from-white/90 to-primary/80"
          }`}
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 10, 0, -10, 0],
            y: [0, -10, 0, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse", 
            ease: "easeInOut"
          }}
          style={{
            boxShadow: isDarkMode 
              ? "0 0 40px rgba(0, 229, 255, 0.5)" 
              : "0 0 40px rgba(74, 38, 171, 0.5)",
            transformOrigin: "center center"
          }}
        >
          {/* Inner rings */}
          <motion.div 
            className="absolute inset-2 rounded-full bg-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 rounded-full bg-white/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
