import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export default function Hero() {
  const { isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
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

  // Container variant for staggered animations
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  // Fade in animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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
          className={`absolute bottom-20 right-[10%] w-64 h-64 rounded-full opacity-10 ${
            isDarkMode ? "bg-accent" : "bg-secondary"
          }`}
          animate={{ 
            x: mousePosition.x * 25,
            y: mousePosition.y * 25,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 40, damping: 30 },
            y: { type: "spring", stiffness: 40, damping: 30 },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
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
                  <span className="mr-4">
                    {"Hello, I'm".split("").map((char, charIndex) => (
                      <motion.span
                        key={`hello-${charIndex}`}
                        custom={charIndex * 0.1}
                        variants={letterAnimVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </div>
              </div>

              <motion.span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent inline-block" variants={highlightedTextVariants}>
                Harsh Patil
              </motion.span>

              <div className="overflow-hidden mt-2">
                <div className="flex flex-wrap h-12">
                  {/* Animated typing effect with alternating roles */}
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    className="relative flex items-center h-full"
                  >
                    <motion.span
                      key="designer-role"
                      initial={{ display: "block" }}
                      animate={{ 
                        display: ["block", "block", "none", "none"],
                      }}
                      transition={{
                        duration: 6,
                        times: [0, 0.4, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      className="absolute left-0"
                    >
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-semibold">
                        {"UI/UX Designer".split("").map((char, idx) => (
                          <motion.span
                            key={`designer-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: idx * 0.08
                              }
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    </motion.span>

                    <motion.span
                      key="developer-role"
                      initial={{ display: "none" }}
                      animate={{ 
                        display: ["none", "none", "block", "block"],
                      }}
                      transition={{
                        duration: 6,
                        times: [0, 0.4, 0.5, 1],
                        repeat: Infinity,
                        repeatDelay: 0
                      }}
                      className="absolute left-0"
                    >
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
                        {"Web Developer".split("").map((char, idx) => (
                          <motion.span
                            key={`developer-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: idx * 0.08
                              }
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.h1>

            <motion.p 
              className="font-inter text-lg md:text-xl text-neutral/80 mb-8 max-w-lg"
              variants={fadeInUp}
            >
              Hello, I'm Harsh Patil. I'm a passionate Web Developer & UI/UX Designer focusing on 
              creating intuitive and visually appealing interfaces with smooth user experiences.
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
                className="border-2 border-secondary hover:bg-secondary/10 text-secondary font-medium py-3 px-8 rounded-full transition-all"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual element/illustration */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.5
              }
            }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Animated background shape */}
              <motion.div 
                className={`absolute inset-0 rounded-full ${
                  isDarkMode 
                    ? "bg-gradient-to-br from-secondary/30 to-accent/20" 
                    : "bg-gradient-to-br from-secondary/20 to-accent/10"
                }`}
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />

              {/* Central image placeholder - replace with your profile image or 3D model */}
              <motion.div 
                className="absolute inset-10 rounded-full bg-gradient-to-br from-secondary to-accent overflow-hidden border-4 border-white/20"
                animate={{ 
                  y: [0, -10, 0],
                  boxShadow: [
                    "0 20px 50px -15px rgba(0, 0, 0, 0.4)",
                    "0 30px 50px -15px rgba(0, 0, 0, 0.4)",
                    "0 20px 50px -15px rgba(0, 0, 0, 0.4)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                {/* Replace with your image */}
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-white text-6xl font-bold">H</span>
                </div>
              </motion.div>

              {/* Orbital rings */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transform: 'rotate(0deg)' }}
              />

              <motion.div 
                className="absolute inset-4 rounded-full border-2 border-dashed border-accent/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ transform: 'rotate(0deg)' }}
              />

              {/* Floating tech icons */}
              {[30, 90, 150, 210, 270, 330].map((angle, i) => (
                <motion.div 
                  key={i}
                  className={`absolute w-10 h-10 rounded-full flex items-center justify-center 
                    ${isDarkMode ? "bg-primary-dark" : "bg-white"} 
                    shadow-lg border border-secondary/10`}
                  animate={{ 
                    x: Math.cos(angle * (Math.PI/180)) * 180,
                    y: Math.sin(angle * (Math.PI/180)) * 180,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    x: { duration: 25, repeat: Infinity, ease: "linear", delay: i * 0.5 },
                    y: { duration: 25, repeat: Infinity, ease: "linear", delay: i * 0.5 },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                  }}
                  style={{ 
                    x: Math.cos(angle * (Math.PI/180)) * 180,
                    y: Math.sin(angle * (Math.PI/180)) * 180,
                  }}
                >
                  <span className="text-secondary text-xs font-bold">
                    {['JS', 'TS', 'React', 'Node', 'CSS', 'UI'][i]}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: [0, 1, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          delay: 2
        }}
      >
        <span className="text-neutral/60 text-sm mb-2">Scroll Down</span>
        <motion.div 
          className="w-6 h-10 border-2 border-neutral/30 rounded-full flex justify-center p-1"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-secondary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}