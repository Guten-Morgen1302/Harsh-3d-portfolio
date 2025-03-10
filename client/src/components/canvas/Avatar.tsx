import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// This component creates a placeholder for the 3D avatar
export default function Avatar() {
  const { isDarkMode } = useTheme();
  const [animation, setAnimation] = useState(0);
  
  // Simple animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(prev => (prev + 0.05) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Avatar head */}
        <div 
          className={`w-48 h-48 rounded-full bg-neutral-100 flex items-center justify-center
            ${isDarkMode ? "shadow-accent" : "shadow-primary"} shadow-lg`}
          style={{
            transform: `translateY(${Math.sin(animation) * 5}px)`
          }}
        >
          {/* Visor/glasses */}
          <div 
            className={`absolute w-40 h-10 rounded-full ${
              isDarkMode ? "bg-accent/70" : "bg-primary/70"
            }`}
            style={{ top: "45%", transform: "translateY(-50%)" }}
          />
          
          {/* Decorative antenna */}
          <div 
            className={`absolute w-4 h-8 ${
              isDarkMode ? "bg-accent" : "bg-primary"
            } rounded-t-full`}
            style={{ top: "-15px" }}
          />
        </div>
      </div>
    </div>
  );
}
