import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Get current visible testimonials (3 at a time on desktop, 1 on mobile)
  const getVisibleTestimonials = () => {
    // For simplicity, showing first 3 testimonials
    return testimonials.slice(0, 3);
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
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
            <span className="text-accent">Client</span> Testimonials
          </motion.h2>

          <motion.p
            className="font-inter text-neutral/80 text-center max-w-2xl mx-auto mb-12"
            variants={itemVariant}
          >
            Feedback from clients I've had the pleasure of working with on various
            projects.
          </motion.p>

          {/* Testimonials Carousel */}
          <div className="testimonials-carousel relative">
            {/* Testimonial cards with 3D effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card bg-neutral-dark/30 rounded-xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)" }}
                >
                  <div className="text-accent text-2xl mb-4">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="font-inter text-neutral/90 mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name} Avatar`}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-space font-bold">{testimonial.name}</h4>
                      <p className="text-neutral/70 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Carousel Navigation */}
            <motion.div
              className="flex justify-center mt-8 space-x-2"
              variants={itemVariant}
            >
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeIndex === index
                      ? "bg-accent"
                      : "bg-neutral-dark/50 hover:bg-accent/50"
                  }`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`View testimonial set ${index + 1}`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
