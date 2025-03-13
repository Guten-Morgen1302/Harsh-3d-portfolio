import { Suspense, useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Portfolio from "./components/sections/Portfolio";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";
import { motion } from "framer-motion";

function Preloader() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <div className="relative perspective-1000">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5, rotateX: -45 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            z: [0, 50, 0],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="text-6xl font-orbitron font-bold tracking-wider mb-4
                      bg-clip-text text-transparent bg-gradient-to-r 
                      from-blue-500 via-purple-500 to-green-500
                      filter drop-shadow-[0_0_15px_rgba(79,70,229,0.9)]"
            animate={{
              textShadow: [
                "0 0 8px rgba(124, 58, 237, 0.7)",
                "0 0 16px rgba(79, 70, 229, 0.9)",
                "0 0 8px rgba(124, 58, 237, 0.7)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            HARSH'S PORTFOLIO
          </motion.div>
          <motion.div 
            className="text-xl text-cyan-300 tracking-wide font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Entering Harsh's Universe
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced cosmic background with parallax stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 3 === 0 ? 'w-1.5 h-1.5' : 'w-1 h-1'} ${i % 5 === 0 ? 'bg-blue-300' : i % 4 === 0 ? 'bg-purple-300' : 'bg-white'} rounded-full`}
            style={{
              boxShadow: i % 5 === 0 ? '0 0 4px 1px rgba(191, 219, 254, 0.8)' : 
                        i % 4 === 0 ? '0 0 4px 1px rgba(216, 180, 254, 0.8)' : 
                        '0 0 2px 1px rgba(255, 255, 255, 0.5)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StarBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Small twinkling stars */}
      {Array.from({ length: 150 }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${Math.random() * 10}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
      
      {/* Medium stars with stronger glow */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`medium-${i}`}
          className="star medium-star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 2}px`,
            height: `${Math.random() * 2 + 2}px`,
            animationDelay: `${Math.random() * 7}s`,
            boxShadow: `0 0 ${Math.random() * 15}px rgba(255, 255, 255, 0.9)`,
          }}
        />
      ))}
      
      {/* Larger celestial bodies */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`large-${i}`}
          className="large-star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 3}px`,
            height: `${Math.random() * 4 + 3}px`,
            background: i % 2 === 0 ? 'rgba(135, 206, 250, 0.9)' : 'rgba(255, 223, 186, 0.9)',
            boxShadow: i % 2 === 0 
              ? `0 0 20px rgba(135, 206, 250, 0.9), 0 0 40px rgba(135, 206, 250, 0.5)` 
              : `0 0 20px rgba(255, 223, 186, 0.9), 0 0 40px rgba(255, 223, 186, 0.5)`,
          }}
        />
      ))}
      
      {/* Cosmic dust */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`dust-${i}`}
          className="cosmic-dust"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 30 + 20}px`,
            height: `${Math.random() * 30 + 20}px`,
            opacity: Math.random() * 0.1,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(3px)',
          }}
        />
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="bg-[#3a1b7a] text-white relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          background: "radial-gradient(circle at 50% 50%, #4922a3 0%, #3a1b7a 50%, #2a125c 100%)",
          opacity: 0.9
        }}
      />
      <StarBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Portfolio />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets (increased to 5 seconds as requested)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Preloader />
          </motion.div>
        ) : (
          <Suspense fallback={<Preloader />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        )}
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;
