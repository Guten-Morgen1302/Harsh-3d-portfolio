import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

// This component creates an advanced animated avatar
export default function Avatar() {
  const { isDarkMode } = useTheme();
  const [animation, setAnimation] = useState(0);
  
  // Animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(prev => (prev + 0.05) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Generate glowing particles
  const generateParticles = (count: number) => {
    return [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${isDarkMode ? "bg-accent/40" : "bg-primary/40"}`}
        animate={{ 
          x: Math.sin(i * 0.5) * 100 + Math.cos(animation + i) * 30,
          y: Math.cos(i * 0.5) * 100 + Math.sin(animation + i) * 30,
          opacity: [0.2, 0.5, 0.2],
          scale: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 4 + i * 0.5, 
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
        style={{
          width: `${4 + Math.random() * 8}px`,
          height: `${4 + Math.random() * 8}px`,
          filter: `blur(${1 + Math.random()}px)`
        }}
      />
    ));
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {generateParticles(12)}
      </div>
      
      {/* Futuristic avatar */}
      <div className="relative z-10">
        {/* Technical circles */}
        <motion.div 
          className={`absolute w-64 h-64 rounded-full border-2 ${
            isDarkMode ? "border-accent/30" : "border-primary/30"
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ top: "-32px", left: "-32px" }}
        />
        
        <motion.div 
          className={`absolute w-72 h-72 rounded-full border ${
            isDarkMode ? "border-accent/20" : "border-primary/20"
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ top: "-36px", left: "-36px" }}
        />
        
        {/* Avatar head container */}
        <motion.div
          className="relative"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        >
          {/* Glowing halo */}
          <motion.div 
            className={`absolute w-56 h-56 rounded-full opacity-30 ${
              isDarkMode ? "bg-accent/30" : "bg-primary/30"
            }`}
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
            style={{ 
              top: "-16px", 
              left: "-16px",
              filter: "blur(10px)" 
            }}
          />
          
          {/* Main head */}
          <motion.div 
            className={`w-48 h-48 rounded-full bg-neutral-900 flex items-center justify-center relative
              ${isDarkMode ? "shadow-accent" : "shadow-primary"} shadow-xl`}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
            style={{
              background: isDarkMode 
                ? "radial-gradient(circle at 30% 30%, #121212 0%, #000000 70%)" 
                : "radial-gradient(circle at 30% 30%, #2a2a2a 0%, #121212 70%)"
            }}
          >
            {/* Glowing circuit patterns */}
            <motion.div 
              className={`absolute inset-6 rounded-full opacity-30 ${
                isDarkMode ? "bg-accent/20" : "bg-primary/20"
              }`}
              animate={{ 
                rotate: [0, 360], 
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{
                maskImage: "url('data:image/svg+xml;utf8,<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15,15 L85,15 L85,85 L15,85 Z\" stroke=\"white\" stroke-width=\"1\" fill=\"none\" /><path d=\"M30,30 L70,30 L70,70 L30,70 Z\" stroke=\"white\" stroke-width=\"1\" fill=\"none\" /><path d=\"M0,0 L100,100 M100,0 L0,100\" stroke=\"white\" stroke-width=\"1\" fill=\"none\" /></svg>')",
                maskSize: "cover",
                WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15,15 L85,15 L85,85 L15,85 Z\" stroke=\"white\" stroke-width=\"1\" fill=\"none\" /><path d=\"M30,30 L70,30 L70,70 L30,70 Z\" stroke=\"white\" stroke-width=\"1\" fill=\"none\" /><path d=\"M0,0 L100,100 M100,0 L0,100\" stroke=\"white\" stroke-width=\"1\" fill=\"none\" /></svg>')",
                WebkitMaskSize: "cover"
              }}
            />
          
            {/* Visor/eyes - main feature */}
            <motion.div 
              className={`absolute w-40 h-7 ${
                isDarkMode ? "bg-accent" : "bg-primary"
              } overflow-hidden`}
              style={{ 
                top: "38%", 
                borderRadius: "4px",
                boxShadow: isDarkMode 
                  ? "0 0 15px rgba(0, 229, 255, 0.7)" 
                  : "0 0 15px rgba(74, 38, 171, 0.7)"
              }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {/* Animated scanner effect inside visor */}
              <motion.div 
                className="absolute w-10 h-full bg-white/40"
                animate={{ x: [-40, 40] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          
            {/* Tech details/patterns */}
            <motion.div
              className={`absolute w-5 h-5 rounded-full left-10 bottom-10 ${
                isDarkMode ? "bg-accent" : "bg-primary"
              }`}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.5
              }}
              style={{
                boxShadow: isDarkMode 
                  ? "0 0 10px rgba(0, 229, 255, 0.6)" 
                  : "0 0 10px rgba(74, 38, 171, 0.6)"
              }}
            />
            
            <motion.div
              className={`absolute w-5 h-5 rounded-full right-10 bottom-10 ${
                isDarkMode ? "bg-accent" : "bg-primary"
              }`}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2
              }}
              style={{
                boxShadow: isDarkMode 
                  ? "0 0 10px rgba(0, 229, 255, 0.6)" 
                  : "0 0 10px rgba(74, 38, 171, 0.6)"
              }}
            />
            
            {/* Antenna structure */}
            <motion.div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ y: [0, -3, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`w-1 h-12 ${
                    isDarkMode ? "bg-accent" : "bg-primary"
                  }`}
                  style={{
                    boxShadow: isDarkMode 
                      ? "0 0 5px rgba(0, 229, 255, 0.7)" 
                      : "0 0 5px rgba(74, 38, 171, 0.7)"
                  }}
                />
                <motion.div 
                  className={`w-4 h-4 rounded-full ${
                    isDarkMode ? "bg-accent" : "bg-primary"
                  }`}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{
                    boxShadow: isDarkMode 
                      ? "0 0 10px rgba(0, 229, 255, 0.7)" 
                      : "0 0 10px rgba(74, 38, 171, 0.7)"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
