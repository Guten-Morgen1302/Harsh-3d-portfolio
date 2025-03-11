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

        {/* Cosmic background with particles */}
        <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
          {/* Animated stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className={`absolute ${i % 4 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'} ${i % 5 === 0 ? 'bg-blue-400' : i % 3 === 0 ? 'bg-purple-400' : 'bg-white'} rounded-full`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                boxShadow: i % 5 === 0 ? '0 0 6px 2px rgba(96, 165, 250, 0.6)' : 
                          i % 3 === 0 ? '0 0 6px 2px rgba(192, 132, 252, 0.6)' : 
                          '0 0 3px 1px rgba(255, 255, 255, 0.5)'
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [1, i % 7 === 0 ? 1.5 : 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}

          {/* Nebula effect */}
          <div className="absolute inset-0 opacity-10"
            style={{
              background: isDarkMode 
                ? 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.3), transparent 30%), radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3), transparent 40%)'
                : 'radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15), transparent 30%), radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15), transparent 40%)'
            }}
          />

          {/* Technical grid pattern - more subtle now */}
          <div className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: `radial-gradient(circle at 30px 30px, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 0)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
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

              <motion.span 
                className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent inline-block"
                variants={highlightedTextVariants}
              >
                Harsh Patil
              </motion.span>

              <div className="overflow-hidden mt-2">
                <div className="flex flex-wrap">
                  <span className="mr-4">
                    {"UI/UX Designer & Web Developer".split("").map((char, charIndex) => (
                      <motion.span
                        key={`role-${charIndex}`}
                        custom={charIndex * 0.05}
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
                href="#projects" 
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
              {[
                { name: 'github', url: 'https://github.com/Guten-Morgen1302' },
                { name: 'linkedin', url: 'https://www.linkedin.com/in/harshpatil13' },
                { name: 'instagram', url: 'https://www.instagram.com/harsh_patil1302/' },
                { name: 'discord', url: 'https://discordapp.com/users/941729896550502420' }
              ].map((platform, i) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-neutral-dark/30 hover:bg-secondary text-neutral/80 hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-lg`}
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
                  {platform.name === 'github' &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  }
                  {platform.name === 'linkedin' &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  }
                  {platform.name === 'instagram' &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  }
                  {platform.name === 'discord' &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.5 2.5A11 11 0 1 1 2.5 13.5 11 11 0 0 1 13.5 2.5zm-.401 8.093a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"/>
                    </svg>
                  }
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Picture with cosmic effects */}
          <motion.div 
            className="w-full md:w-1/2 h-[400px] flex items-center justify-center"
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
            <div className="relative">
              {/* Glowing orbit effect */}
              <motion.div 
                className="absolute inset-0 bg-transparent rounded-full"
                style={{ 
                  border: '2px solid rgba(135, 206, 250, 0.4)',
                  boxShadow: '0 0 40px 5px rgba(135, 206, 250, 0.2)',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Second orbit */}
              <motion.div 
                className="absolute inset-0 bg-transparent rounded-full"
                style={{ 
                  border: '1px solid rgba(180, 255, 255, 0.3)',
                  transform: 'scale(1.2) rotate(45deg)',
                  boxShadow: '0 0 20px 2px rgba(180, 255, 255, 0.1)',
                }}
                animate={{
                  rotate: [45, 405],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Profile image with glow */}
              <motion.div
                className="relative z-10 w-[250px] h-[250px] rounded-full overflow-hidden"
                style={{
                  boxShadow: '0 0 30px 5px rgba(70, 130, 240, 0.5)',
                }}
                animate={{
                  boxShadow: ['0 0 30px 5px rgba(70, 130, 240, 0.5)', '0 0 40px 10px rgba(70, 130, 240, 0.7)', '0 0 30px 5px rgba(70, 130, 240, 0.5)']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src="/harsh-patil.png" 
                  alt="Harsh Patil" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating particles around the image */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    boxShadow: '0 0 10px 2px rgba(6, 182, 212, 0.7)'
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 150],
                    y: [0, (Math.random() - 0.5) * 150],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
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