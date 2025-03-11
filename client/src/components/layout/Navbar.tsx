import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Link } from "wouter";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];

      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      }) || 'home';

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? "bg-[#3a1b7a]/85 backdrop-blur-md py-3 shadow-lg shadow-indigo-900/30" : "bg-transparent py-5"
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <a href="#hero" onClick={closeMenu} className="text-xl font-orbitron font-bold text-accent">
            HARSH<span className="text-white">PATIL</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className={`text-neutral transition-colors relative ${activeSection === 'home' ? 'text-accent' : ''}`}>
              Home
              {activeSection === 'home' && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
            <a href="#about" className={`text-neutral transition-colors relative ${activeSection === 'about' ? 'text-accent' : ''}`}>
              About
              {activeSection === 'about' && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
            <a href="#projects" className={`text-neutral transition-colors relative ${activeSection === 'projects' ? 'text-accent' : ''}`}>
              Projects
              {activeSection === 'projects' && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
            <a href="#skills" className={`text-neutral transition-colors relative ${activeSection === 'skills' ? 'text-accent' : ''}`}>
              Skills
              {activeSection === 'skills' && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>

            <a href="#contact" className={`text-neutral transition-colors relative ${activeSection === 'contact' ? 'text-accent' : ''}`}>
              Contact
              {activeSection === 'contact' && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral hover:text-accent"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-neutral-dark/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="#home"
                className={`text-neutral hover:text-accent py-2 transition-colors relative ${activeSection === 'home' ? 'text-accent' : ''}`}
                onClick={closeMenu}
              >
                Home
                {activeSection === 'home' && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
              <a
                href="#about"
                className={`text-neutral hover:text-accent py-2 transition-colors relative ${activeSection === 'about' ? 'text-accent' : ''}`}
                onClick={closeMenu}
              >
                About
                {activeSection === 'about' && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
              <a
                href="#projects"
                className={`text-neutral hover:text-accent py-2 transition-colors relative ${activeSection === 'projects' ? 'text-accent' : ''}`}
                onClick={closeMenu}
              >
                Projects
                {activeSection === 'projects' && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
              <a
                href="#skills"
                className={`text-neutral hover:text-accent py-2 transition-colors relative ${activeSection === 'skills' ? 'text-accent' : ''}`}
                onClick={closeMenu}
              >
                Skills
                {activeSection === 'skills' && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>

              <a
                href="#contact"
                className={`text-neutral hover:text-accent py-2 transition-colors relative ${activeSection === 'contact' ? 'text-accent' : ''}`}
                onClick={closeMenu}
              >
                Contact
                {activeSection === 'contact' && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
              <div className="flex justify-between">
                <div className="text-neutral hover:text-accent transition-colors py-2">
                  <ThemeToggle isMobile={true} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}