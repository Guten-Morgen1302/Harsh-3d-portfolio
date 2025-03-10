import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

interface SkillCubeProps {
  icon: string;
  index: number;
  delay: number;
}

function SkillCube({ icon, index, delay }: SkillCubeProps) {
  const { isDarkMode } = useTheme();
  const [hover, setHover] = useState(false);
  
  // Calculate grid position in a circular pattern
  const angle = (index / 8) * Math.PI * 2; // Distribute around a circle
  const radius = 140; // Circle radius
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  // Colors based on theme
  const glowColor = isDarkMode 
    ? "0 0 20px rgba(0, 229, 255, 0.7)" 
    : "0 0 20px rgba(74, 38, 171, 0.7)";
  
  const strongGlowColor = isDarkMode 
    ? "0 0 30px rgba(0, 229, 255, 0.9)" 
    : "0 0 30px rgba(74, 38, 171, 0.9)";
  
  const bgColor = isDarkMode 
    ? "rgba(18, 18, 18, 0.8)" 
    : "rgba(240, 240, 240, 0.8)";
  
  const textColor = isDarkMode 
    ? "text-accent" 
    : "text-primary";

  return (
    <motion.div
      initial={{ x, y, opacity: 0, scale: 0 }}
      animate={{ 
        x: x, 
        y: y, 
        opacity: 1, 
        scale: 1,
        rotate: hover ? [0, 5, -5, 0] : [0, 0],
        z: hover ? 50 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100,
        damping: 10, 
        delay: delay * 0.2,
        rotate: {
          duration: 0.3,
          repeat: hover ? 2 : 0
        }
      }}
      whileHover={{ 
        scale: 1.2,
        boxShadow: strongGlowColor,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="absolute left-1/2 top-1/2 flex items-center justify-center cursor-pointer"
      style={{ 
        width: '70px',
        height: '70px',
        borderRadius: '16px',
        background: bgColor,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: glowColor,
        border: `1px solid ${isDarkMode ? 'rgba(0, 229, 255, 0.3)' : 'rgba(74, 38, 171, 0.3)'}`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Floating animation for each skill cube */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{ 
          y: [0, -5, 0, -3, 0],
          rotateY: [0, 180, 360]
        }}
        transition={{ 
          y: {
            duration: 2 + index * 0.3, 
            repeat: Infinity,
            repeatType: "reverse", 
            ease: "easeInOut",
          },
          rotateY: {
            duration: 8 + index * 0.5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <div className={`text-2xl font-bold ${textColor}`}>{icon}</div>
      </motion.div>
      
      {/* Tooltip that appears on hover */}
      {hover && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 40 }}
          exit={{ opacity: 0 }}
          className={`absolute px-3 py-1 rounded-md text-sm text-white ${
            isDarkMode ? "bg-accent/90" : "bg-primary/90"
          }`}
          style={{
            boxShadow: glowColor,
            zIndex: 10
          }}
        >
          {getFullName(icon)}
        </motion.div>
      )}
    </motion.div>
  );
}

// Get full technology name from short code
function getFullName(icon: string): string {
  const names: Record<string, string> = {
    "JS": "JavaScript",
    "TS": "TypeScript",
    "R": "React",
    "3JS": "Three.js",
    "N": "Node.js",
    "Vue": "Vue.js",
    "XR": "WebXR",
    "B": "Blender"
  };
  
  return names[icon] || icon;
}

export default function SkillsIcons() {
  const { isDarkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Mouse movement effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (normalized -1 to 1)
      const rotateY = ((e.clientX - centerX) / rect.width) * 20;
      const rotateX = ((e.clientY - centerY) / rect.height) * -20;
      
      setRotation({ x: rotateX, y: rotateY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const skills = [
    { icon: "JS", delay: 0 },
    { icon: "TS", delay: 1 },
    { icon: "R", delay: 2 },
    { icon: "3JS", delay: 3 },
    { icon: "N", delay: 4 },
    { icon: "Vue", delay: 5 },
    { icon: "XR", delay: 6 },
    { icon: "B", delay: 7 }
  ];

  return (
    <div 
      className="w-full h-full relative flex items-center justify-center" 
      ref={containerRef}
    >
      {/* Orbital ring */}
      <motion.div
        className={`absolute rounded-full border-2 ${
          isDarkMode ? "border-accent/20" : "border-primary/20"
        }`}
        style={{ 
          width: '300px', 
          height: '300px',
          boxShadow: isDarkMode ? "0 0 30px rgba(0, 229, 255, 0.1)" : "0 0 30px rgba(74, 38, 171, 0.1)"
        }}
        animate={{ 
          rotateX: rotation.x * 0.5,
          rotateY: rotation.y * 0.5,
          rotate: 360
        }}
        transition={{ 
          rotate: {
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          },
          rotateX: { type: "spring", stiffness: 50, damping: 30 },
          rotateY: { type: "spring", stiffness: 50, damping: 30 }
        }}
      />
      
      {/* Skills container */}
      <motion.div 
        className="relative w-80 h-80"
        animate={{ 
          rotateX: rotation.x * 0.2,
          rotateY: rotation.y * 0.2,
          rotate: -5
        }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 30
        }}
        style={{ perspective: '1000px' }}
      >
        {/* Central glowing orb */}
        <motion.div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            isDarkMode ? "bg-accent/30" : "bg-primary/30"
          }`}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          style={{ 
            width: '60px', 
            height: '60px',
            boxShadow: isDarkMode ? "0 0 40px rgba(0, 229, 255, 0.5)" : "0 0 40px rgba(74, 38, 171, 0.5)",
            filter: "blur(8px)"
          }}
        />
        
        {/* Individual skill cubes */}
        {skills.map((skill, index) => (
          <SkillCube
            key={index}
            icon={skill.icon}
            index={index}
            delay={skill.delay}
          />
        ))}
      </motion.div>
    </div>
  );
}
