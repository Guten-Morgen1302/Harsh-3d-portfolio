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
          <div className="text-6xl font-orbitron font-bold tracking-wider mb-4
                        bg-clip-text text-transparent bg-gradient-to-r 
                        from-blue-500 via-purple-500 to-green-500
                        filter drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]">
            LOADING
          </div>
          <motion.div 
            className="text-xl text-cyan-300 tracking-wide font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Entering Universe
          </motion.div>
        </motion.div>
      </div>
      
      {/* Stars background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
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

function Home() {
  return (
    <div className="bg-primary text-foreground">
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
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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
