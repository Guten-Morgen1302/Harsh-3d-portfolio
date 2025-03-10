import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// This component creates a placeholder for the 3D hero object
export default function HeroObject({ mousePosition = { x: 0, y: 0 } }) {
  const { isDarkMode } = useTheme();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Simple animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.01,
        y: prev.y + 0.01
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Use mousePosition to adjust the rotation slightly
  useEffect(() => {
    setRotation(prev => ({
      x: prev.x + mousePosition.y * 0.01,
      y: prev.y + mousePosition.x * 0.01
    }));
  }, [mousePosition.x, mousePosition.y]);

  console.log("Three.js would be initialized here in production");

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className={`w-64 h-64 rounded-full bg-gradient-to-br ${
          isDarkMode ? "from-accent to-secondary" : "from-primary to-secondary"
        } animate-float`}
        style={{
          transform: `rotate(${rotation.x * 10}deg) scale(${0.9 + Math.sin(rotation.y) * 0.1})`,
          boxShadow: isDarkMode 
            ? "0 0 30px rgba(0, 229, 255, 0.4)" 
            : "0 0 30px rgba(74, 38, 171, 0.4)"
        }}
      />
    </div>
  );
}
