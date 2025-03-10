import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Avatar from "../canvas/Avatar";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bioRef, { once: false, amount: 0.3 });

  // Fade in & up animation for text elements
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Staggered container animation
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Stats animation
  const statsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const statItem = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Avatar Container */}
          <motion.div 
            className="w-full md:w-1/3 h-[300px] mb-12 md:mb-0 order-1 md:order-none"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Avatar />
          </motion.div>
          
          {/* Text content */}
          <div className="md:w-1/2 md:pl-12">
            <motion.h2 
              className="font-space text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-accent">About</span> Me
            </motion.h2>
            
            {/* Bio text with animation */}
            <motion.div 
              ref={bioRef}
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p 
                className="font-inter text-neutral/90 text-lg"
                variants={fadeInUp}
              >
                👋 Hello, I'm Harsh Patil, a passionate Web Developer and Designer based in Mumbai, India.
              </motion.p>
              
              <motion.p 
                className="font-inter text-neutral/80"
                variants={fadeInUp}
              >
                I create user-friendly and visually stunning websites that deliver exceptional user experiences.
              </motion.p>
              
              <motion.p 
                className="font-inter text-neutral/80"
                variants={fadeInUp}
              >
                With a keen eye for detail and a commitment to staying at the forefront of technology trends, I develop solutions that are not only beautiful but also functionally robust and scalable.
              </motion.p>
              
              <motion.p 
                className="font-inter text-neutral/80"
                variants={fadeInUp}
              >
                I'm constantly learning and exploring new technologies to enhance my skills and create better digital experiences for my clients and users.
              </motion.p>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              variants={statsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <motion.div 
                className="text-center p-4 bg-neutral-dark/50 rounded-lg"
                variants={statItem}
                whileHover={{ y: -5, boxShadow: "0 5px 10px rgba(0,0,0,0.2)" }}
              >
                <span className="text-accent font-orbitron text-3xl font-bold">7+</span>
                <p className="text-sm font-inter text-neutral/70">Years Experience</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 bg-neutral-dark/50 rounded-lg"
                variants={statItem}
                whileHover={{ y: -5, boxShadow: "0 5px 10px rgba(0,0,0,0.2)" }}
              >
                <span className="text-accent font-orbitron text-3xl font-bold">50+</span>
                <p className="text-sm font-inter text-neutral/70">Projects Completed</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 bg-neutral-dark/50 rounded-lg"
                variants={statItem}
                whileHover={{ y: -5, boxShadow: "0 5px 10px rgba(0,0,0,0.2)" }}
              >
                <span className="text-accent font-orbitron text-3xl font-bold">30+</span>
                <p className="text-sm font-inter text-neutral/70">Happy Clients</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 bg-neutral-dark/50 rounded-lg"
                variants={statItem}
                whileHover={{ y: -5, boxShadow: "0 5px 10px rgba(0,0,0,0.2)" }}
              >
                <span className="text-accent font-orbitron text-3xl font-bold">12</span>
                <p className="text-sm font-inter text-neutral/70">Awards Won</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
