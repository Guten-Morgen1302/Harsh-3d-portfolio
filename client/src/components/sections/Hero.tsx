import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroObject from "../canvas/HeroObject";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hero() {
  const { isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement for interactive 3D object
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized position (-1 to 1)
    const x = ((clientX - left) / width) * 2 - 1;
    const y = -((clientY - top) / height) * 2 + 1;
    
    setMousePosition({ x, y });
  };

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 60,
        damping: 12
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 60,
        damping: 12
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  // Generate floating particles
  const generateParticles = (count: number) => {
    return [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${isDarkMode ? "bg-accent/30" : "bg-secondary/30"}`}
        animate={{ 
          x: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth
          ],
          y: [
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight
          ],
          opacity: [0.1 + Math.random() * 0.3, 0.4, 0.1 + Math.random() * 0.3],
          scale: [0.1 + Math.random() * 0.3, 0.3 + Math.random() * 0.2, 0.1 + Math.random() * 0.3]
        }}
        transition={{ 
          duration: 10 + Math.random() * 20, 
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          width: `${2 + Math.random() * 5}px`,
          height: `${2 + Math.random() * 5}px`,
          filter: `blur(${Math.random()}px)`
        }}
      />
    ));
  };

  // Text animation for highlighted words
  const highlightedTextVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      }
    }
  };

  // Letter animation for title
  const letterAnimVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        damping: 12,
        stiffness: 70
      }
    })
  };
  
  // Split text for letter animation
  const titleWords = ["I", "create", "digital", "experiences", "that", "inspire"];

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Enhanced background with animated particles */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent">
          {/* Floating particles */}
          {generateParticles(30)}
        </div>
        
        {/* Animated decorative elements */}
        <motion.div 
          className={`absolute top-20 left-[10%] w-40 h-40 rounded-full opacity-10 ${
            isDarkMode ? "bg-accent" : "bg-secondary"
          }`}
          animate={{ 
            x: mousePosition.x * -15,
            y: mousePosition.y * -15,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div 
          className={`absolute bottom-40 right-[10%] w-60 h-60 rounded-full opacity-5 ${
            isDarkMode ? "bg-accent" : "bg-secondary"
          }`}
          animate={{ 
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />
        
        {/* Technical grid pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `radial-gradient(circle at 30px 30px, ${isDarkMode ? '#ffffff' : '#000000'} 2px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Enhanced text content */}
          <motion.div 
            className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Title with letter-by-letter animation */}
            <motion.h1 
              className="font-space text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              variants={fadeInRight}
            >
              <div className="overflow-hidden mb-2">
                <div className="flex flex-wrap">
                  {titleWords.slice(0, 2).map((word, wordIndex) => (
                    <span key={wordIndex} className="mr-4">
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={`${wordIndex}-${charIndex}`}
                          custom={wordIndex + charIndex * 0.1}
                          variants={letterAnimVariants}
                          initial="hidden"
                          animate="visible"
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
              
              <motion.span 
                className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent inline-block"
                variants={highlightedTextVariants}
              >
                {titleWords.slice(2, 4).join(" ")}
              </motion.span>
              
              <div className="overflow-hidden mt-2">
                <div className="flex flex-wrap">
                  {titleWords.slice(4).map((word, wordIndex) => (
                    <span key={wordIndex} className="mr-4">
                      {word.split("").map((char, charIndex) => (
                        <motion.span
                          key={`${wordIndex + 4}-${charIndex}`}
                          custom={(wordIndex + 4) + charIndex * 0.1}
                          variants={letterAnimVariants}
                          initial="hidden"
                          animate="visible"
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </motion.h1>
            
            <motion.p 
              className="font-inter text-lg md:text-xl text-neutral/80 mb-8 max-w-lg"
              variants={fadeInUp}
            >
              Creative developer specializing in interactive 3D websites, AR/VR experiences, 
              and cutting-edge digital solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={fadeInUp}
            >
              <motion.a 
                href="#portfolio" 
                className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-full transition-all"
                whileHover={{ 
                  y: -5, 
                  boxShadow: isDarkMode 
                    ? "0 10px 25px -5px rgba(0, 229, 255, 0.5)" 
                    : "0 10px 25px -5px rgba(74, 38, 171, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className={`border-2 ${
                  isDarkMode ? "border-accent text-accent" : "border-secondary text-secondary"
                } hover:bg-accent/10 font-medium py-3 px-8 rounded-full transition-all`}
                whileHover={{ 
                  y: -5,
                  boxShadow: isDarkMode 
                    ? "0 10px 25px -15px rgba(0, 229, 255, 0.4)" 
                    : "0 10px 25px -15px rgba(74, 38, 171, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
            
            {/* Social icons */}
            <motion.div 
              className="flex items-center justify-center md:justify-start gap-5 mt-8"
              variants={fadeInUp}
            >
              {['github', 'dribbble', 'linkedin', 'twitter'].map((platform, i) => (
                <motion.a
                  key={platform}
                  href={`#${platform}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    isDarkMode 
                      ? "border-neutral-700 hover:border-accent hover:text-accent" 
                      : "border-neutral-300 hover:border-secondary hover:text-secondary"
                  } transition-colors`}
                  whileHover={{ 
                    y: -3,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 1.2 + i * 0.1 }
                  }}
                >
                  <span>{platform[0].toUpperCase()}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced 3D Object Canvas with better entrance animation */}
          <motion.div 
            className="w-full md:w-1/2 h-[400px]"
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              x: 50 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0
            }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.7
            }}
          >
            <HeroObject mousePosition={mousePosition} />
          </motion.div>
        </div>
        
        {/* Improved scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <motion.div 
            className={`w-6 h-10 border-2 ${
              isDarkMode ? "border-accent" : "border-secondary"
            } rounded-full flex justify-center p-1`}
          >
            <motion.div 
              className={`w-1 h-2 rounded-full ${
                isDarkMode ? "bg-accent" : "bg-secondary"
              }`}
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          <motion.p 
            className="mt-2 text-sm opacity-70"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
