import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SkillsIcons from "../canvas/SkillsIcons";
import { skills, skillCategories } from "@/lib/data";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const skillItemVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-neutral-dark/20"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
        >
          <motion.h2 
            className="font-space text-3xl md:text-4xl font-bold mb-2 text-center"
            variants={itemVariant}
          >
            <span className="text-accent">My</span> Skills
          </motion.h2>
          
          <motion.p 
            className="font-inter text-neutral/80 text-center max-w-2xl mx-auto mb-12"
            variants={itemVariant}
          >
            My technical toolkit encompasses a range of technologies that enable me to bring creative visions to life.
          </motion.p>
          
          {/* Skills Visualization Container */}
          <motion.div 
            className="h-[300px] mb-12"
            variants={itemVariant}
          >
            <SkillsIcons />
          </motion.div>
          
          {/* Interactive skill icons - for mobile or alternative display */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 py-8 mb-8 md:hidden"
            variants={containerVariant}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-item flex flex-col items-center group"
                variants={skillItemVariant}
                custom={index}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-dark/50 rounded-2xl flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                  <i className={`${skill.icon} text-4xl ${skill.color}`}></i>
                </div>
                <span className="mt-2 font-inter text-sm">{skill.name}</span>
                <div className="hidden group-hover:block absolute mt-24 bg-neutral-dark rounded-lg px-4 py-2 text-xs">
                  {skill.level}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Skill Categories */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            variants={containerVariant}
          >
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="bg-neutral-dark/30 rounded-xl p-6"
                variants={itemVariant}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              >
                <div className="text-accent text-2xl mb-4">
                  <i className={category.icon}></i>
                </div>
                <h3 className="font-space text-xl font-bold mb-4">{category.name}</h3>
                <ul className="space-y-2 font-inter">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="w-1/3 bg-neutral-dark/50 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-accent h-full rounded-full" 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.proficiency}%` }}
                          viewport={{ once: false, amount: 0.8 }}
                          transition={{ duration: 0.8, delay: 0.2 * idx }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
