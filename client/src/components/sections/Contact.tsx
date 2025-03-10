import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Send form data to backend
      await apiRequest("POST", "/api/contact", formData);
      
      // Show success message
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Message not sent",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-neutral-dark/20">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariant}
        >
          <motion.h2
            className="font-space text-3xl md:text-4xl font-bold mb-2 text-center"
            variants={itemVariant}
          >
            <span className="text-accent">Get In</span> Touch
          </motion.h2>

          <motion.p
            className="font-inter text-neutral/80 text-center max-w-2xl mx-auto mb-12"
            variants={itemVariant}
          >
            Have a project in mind or want to discuss a potential collaboration? I'd
            love to hear from you.
          </motion.p>

          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Contact Info */}
            <motion.div
              className="md:w-1/3 mb-8 md:mb-0"
              variants={itemVariant}
            >
              <div className="bg-neutral-dark/30 rounded-xl p-6 h-full">
                <h3 className="font-space text-xl font-bold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-secondary/20 rounded-lg p-3 text-accent mr-4">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="text-sm text-neutral/70 mb-1">Email</h4>
                      <a
                        href="mailto:harshpatil1302@gmail.com"
                        className="font-medium hover:text-accent transition-colors"
                      >
                        harshpatil1302@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/20 rounded-lg p-3 text-accent mr-4">
                      <i className="fas fa-code-branch"></i>
                    </div>
                    <div>
                      <h4 className="text-sm text-neutral/70 mb-1">GitHub</h4>
                      <a
                        href="https://github.com/Guten-Morgen1302"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-accent transition-colors"
                      >
                        Guten-Morgen1302
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary/20 rounded-lg p-3 text-accent mr-4">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h4 className="text-sm text-neutral/70 mb-1">Location</h4>
                      <p className="font-medium">Mumbai, India</p>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="pt-6 border-t border-neutral/10">
                    <h4 className="text-sm text-neutral/70 mb-4">Follow Me</h4>
                    <div className="flex space-x-4">
                      <motion.a
                        href="https://github.com/Guten-Morgen1302"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neutral-dark/50 hover:bg-secondary/30 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-neutral hover:text-accent"
                        whileHover={{ y: -3, rotate: 5 }}
                      >
                        <i className="fab fa-github"></i>
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/harshpatil13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neutral-dark/50 hover:bg-secondary/30 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-neutral hover:text-accent"
                        whileHover={{ y: -3, rotate: 5 }}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </motion.a>
                      <motion.a
                        href="https://www.instagram.com/harsh_patil1302/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neutral-dark/50 hover:bg-secondary/30 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-neutral hover:text-accent"
                        whileHover={{ y: -3, rotate: 5 }}
                      >
                        <i className="fab fa-instagram"></i>
                      </motion.a>
                      <motion.a
                        href="https://discordapp.com/users/941729896550502420"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neutral-dark/50 hover:bg-secondary/30 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-neutral hover:text-accent"
                        whileHover={{ y: -3, rotate: 5 }}
                      >
                        <i className="fab fa-discord"></i>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="md:w-2/3" variants={itemVariant}>
              <div className="bg-neutral-dark/30 rounded-xl p-6">
                <h3 className="font-space text-xl font-bold mb-6">
                  Send Me a Message
                </h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral/70 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-neutral-dark/50 border border-neutral/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral/70 mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-neutral-dark/50 border border-neutral/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-neutral/70 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-dark/50 border border-neutral/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-neutral/70 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-neutral-dark/50 border border-neutral/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-3 px-6 rounded-lg transition-all flex justify-center items-center"
                      whileHover={{ translateY: -2 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <i className="fas fa-paper-plane ml-2"></i>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
