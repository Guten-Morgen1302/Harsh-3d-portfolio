import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface SkillCubeProps {
  icon: string;
  index: number;
  delay: number;
}

function SkillCube({ icon, index, delay }: SkillCubeProps) {
  const { isDarkMode } = useTheme();
  const [position, setPosition] = useState({ y: 0, rotation: 0 });
  
  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        y: Math.sin((Date.now() / 1000) + delay) * 10,
        rotation: prev.rotation + 2
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [delay]);

  // Calculate grid position
  const row = Math.floor(index / 4);
  const col = index % 4;
  const x = (col - 1.5) * 80;
  const y = row * 80;

  return (
    <div 
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px + ${position.y}px)`,
        transform: `translate(-50%, -50%) rotateY(${position.rotation}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease',
      }}
    >
      <div 
        className={`w-16 h-16 flex items-center justify-center ${
          isDarkMode ? "bg-neutral-800 text-accent" : "bg-neutral-100 text-primary"
        } relative shadow-lg`}
        style={{
          borderRadius: '8px',
          boxShadow: isDarkMode 
            ? '0 0 15px rgba(0, 229, 255, 0.3)' 
            : '0 0 15px rgba(74, 38, 171, 0.3)'
        }}
      >
        <div className="text-xl font-bold">{icon}</div>
      </div>
    </div>
  );
}

export default function SkillsIcons() {
  const skills = [
    { icon: "JS", delay: 0 },
    { icon: "TS", delay: 0.2 },
    { icon: "R", delay: 0.4 }, // R for React
    { icon: "3JS", delay: 0.6 },
    { icon: "N", delay: 0.8 }, // N for Node
    { icon: "Vue", delay: 1 },
    { icon: "XR", delay: 1.2 },
    { icon: "B", delay: 1.4 }, // B for Blender
  ];

  return (
    <div className="w-full h-full relative">
      {skills.map((skill, index) => (
        <SkillCube
          key={index}
          icon={skill.icon}
          index={index}
          delay={skill.delay}
        />
      ))}
    </div>
  );
}
