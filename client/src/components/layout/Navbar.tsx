import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import { Link } from "wouter";

export default function Navbar() {
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
    scrolled ? "bg-primary/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link href="#hero" onClick={closeMenu}>
            <a className="text-xl font-orbitron font-bold text-accent">
              NOVA<span className="text-white">CODE</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-neutral hover:text-accent transition-colors">
              Home
            </a>
            <a href="#about" className="text-neutral hover:text-accent transition-colors">
              About
            </a>
            <a href="#portfolio" className="text-neutral hover:text-accent transition-colors">
              Portfolio
            </a>
            <a href="#skills" className="text-neutral hover:text-accent transition-colors">
              Skills
            </a>
            <a href="#testimonials" className="text-neutral hover:text-accent transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-neutral hover:text-accent transition-colors">
              Contact
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
                href="#hero"
                className="text-neutral hover:text-accent py-2 transition-colors"
                onClick={closeMenu}
              >
                Home
              </a>
              <a
                href="#about"
                className="text-neutral hover:text-accent py-2 transition-colors"
                onClick={closeMenu}
              >
                About
              </a>
              <a
                href="#portfolio"
                className="text-neutral hover:text-accent py-2 transition-colors"
                onClick={closeMenu}
              >
                Portfolio
              </a>
              <a
                href="#skills"
                className="text-neutral hover:text-accent py-2 transition-colors"
                onClick={closeMenu}
              >
                Skills
              </a>
              <a
                href="#testimonials"
                className="text-neutral hover:text-accent py-2 transition-colors"
                onClick={closeMenu}
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-neutral hover:text-accent py-2 transition-colors"
                onClick={closeMenu}
              >
                Contact
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
