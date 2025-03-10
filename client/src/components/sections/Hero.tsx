import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroObject from "../canvas/HeroObject";

export default function Hero() {
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Background with subtle gradient effect */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text content */}
          <motion.div 
            className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="font-space text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              variants={fadeInUp}
            >
              I create<br />
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                digital experiences
              </span>
              <br />that inspire
            </motion.h1>
            
            <motion.p 
              className="font-inter text-lg md:text-xl text-neutral/80 mb-8 max-w-lg"
              variants={fadeInUp}
            >
              Creative developer specializing in interactive 3D websites, AR/VR experiences, 
              and cutting-edge digital solutions.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4 justify-center md:justify-start"
              variants={fadeInUp}
            >
              <motion.a 
                href="#portfolio" 
                className="bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-8 rounded-full transition-all"
                whileHover={{ y: -2, boxShadow: "0 10px 20px -10px rgba(74, 38, 171, 0.5)" }}
              >
                View My Work
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="border-2 border-accent text-accent hover:bg-accent/10 font-medium py-3 px-8 rounded-full transition-all"
                whileHover={{ y: -2 }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* 3D Object Canvas - Replaced with CSS version */}
          <motion.div 
            className="w-full md:w-1/2 h-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <HeroObject mousePosition={mousePosition} />
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <i className="fas fa-chevron-down text-accent text-2xl"></i>
        </motion.div>
      </div>
    </section>
  );
}
