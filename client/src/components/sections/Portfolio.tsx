import { useState } from "react";
import { motion } from "framer-motion";
import { projects, allProjectsUrl } from "@/lib/data";

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const sectionVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const projectVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Cosmic particle effect for the portfolio section
  const CosmicParticles = () => {
    return (
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#93c5fd' : i % 2 === 0 ? '#c4b5fd' : '#f9fafb',
              boxShadow: i % 3 === 0 ? '0 0 4px 1px rgba(147, 197, 253, 0.6)' : 
                        i % 2 === 0 ? '0 0 4px 1px rgba(196, 181, 253, 0.6)' : 
                        '0 0 2px 1px rgba(249, 250, 251, 0.5)'
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() * 1.5 + 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <CosmicParticles />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariant}
        >
          <motion.h2
            className="font-space text-3xl md:text-4xl font-bold mb-2 text-center"
            variants={headingVariant}
          >
            <span className="text-accent">Featured</span> Projects
          </motion.h2>
          
          <motion.p
            className="font-inter text-neutral/80 text-center max-w-2xl mx-auto mb-12"
            variants={headingVariant}
          >
            Explore a selection of my most innovative projects. Each one represents a unique challenge solved through creativity and technical expertise.
          </motion.p>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-secondary/20"
                variants={projectVariant}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -8 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-space text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="font-inter text-neutral/90 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium bg-secondary/30 text-white px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-sm font-medium flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      Live Demo <i className="fas fa-external-link-alt ml-2"></i>
                    </motion.a>
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm font-medium flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      GitHub <i className="fab fa-github ml-2"></i>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* View All Projects Button */}
          <motion.div
            className="mt-12 text-center"
            variants={headingVariant}
          >
            <motion.a
              href={allProjectsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary/20 hover:bg-secondary/30 text-accent hover:text-white border border-accent hover:border-transparent font-medium py-3 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects <i className="fas fa-external-link-alt ml-2"></i>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
