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
    <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center">
      <div className="text-accent animate-pulse">
        <div className="text-4xl font-orbitron">HARSH PATIL</div>
        <div className="text-xl text-center mt-2">UI/UX Designer & Developer</div>
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
