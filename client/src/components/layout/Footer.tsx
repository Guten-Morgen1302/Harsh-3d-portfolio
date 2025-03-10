import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark/70 py-10 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-xl font-orbitron font-bold text-accent">
              HARSH<span className="text-white">PATIL</span>
            </a>
            <p className="text-neutral/60 text-sm mt-2">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
            <a
              href="#hero"
              className="text-neutral/70 hover:text-accent transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-neutral/70 hover:text-accent transition-colors"
            >
              About
            </a>
            <a
              href="#portfolio"
              className="text-neutral/70 hover:text-accent transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#skills"
              className="text-neutral/70 hover:text-accent transition-colors"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="text-neutral/70 hover:text-accent transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/Guten-Morgen1302"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="text-neutral hover:text-accent transition-colors"
            >
              <i className="fab fa-github text-xl"></i>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/harshpatil13"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="text-neutral hover:text-accent transition-colors"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </motion.a>
            <motion.a
              href="https://www.instagram.com/harsh_patil1302/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="text-neutral hover:text-accent transition-colors"
            >
              <i className="fab fa-instagram text-xl"></i>
            </motion.a>
            <motion.a
              href="https://discordapp.com/users/941729896550502420"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="text-neutral hover:text-accent transition-colors"
            >
              <i className="fab fa-discord text-xl"></i>
            </motion.a>
          </div>
        </div>

        {/* Additional Footer Info */}
        <div className="border-t border-neutral/10 mt-8 pt-8 text-center text-neutral/60 text-sm">
          <p>
            Designed and developed with <span className="text-red-500">♥</span> and Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
