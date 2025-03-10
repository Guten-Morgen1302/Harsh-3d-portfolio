// Project data
export const projects = [
  {
    title: "AR Visualization App",
    description: "An augmented reality application that transforms architectural blueprints into interactive 3D models.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&h=400",
    technologies: ["Three.js", "WebXR", "React"],
    link: "#"
  },
  {
    title: "Interactive Music Experience",
    description: "A 3D audio visualization platform that transforms music into stunning visual experiences.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&h=400",
    technologies: ["WebGL", "Web Audio API", "GSAP"],
    link: "#"
  },
  {
    title: "E-commerce 3D Configurator",
    description: "Custom product configurator allowing users to customize products in real-time 3D visualization.",
    image: "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?auto=format&fit=crop&w=600&h=400",
    technologies: ["Three.js", "Next.js", "Shopify"],
    link: "#"
  },
  {
    title: "Virtual Reality Gallery",
    description: "An immersive VR art gallery showcasing digital artwork in a custom-designed virtual space.",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&h=400",
    technologies: ["A-Frame", "WebVR", "Blender"],
    link: "#"
  },
  {
    title: "Interactive Data Visualization",
    description: "3D data visualization dashboard that makes complex information intuitive and engaging.",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=600&h=400",
    technologies: ["D3.js", "Three.js", "Vue.js"],
    link: "#"
  },
  {
    title: "Interactive Game World",
    description: "A browser-based 3D game world with physics and interactive elements created with WebGL.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&h=400",
    technologies: ["Three.js", "Cannon.js", "JavaScript"],
    link: "#"
  }
];

// Skills data
export const skills = [
  {
    name: "JavaScript",
    icon: "fab fa-js",
    color: "text-yellow-400",
    level: "Expert (5+ years)"
  },
  {
    name: "React",
    icon: "fab fa-react",
    color: "text-blue-400",
    level: "Advanced (4 years)"
  },
  {
    name: "Node.js",
    icon: "fab fa-node-js",
    color: "text-green-500",
    level: "Intermediate (3 years)"
  },
  {
    name: "Three.js",
    icon: "fas fa-cube",
    color: "text-purple-400",
    level: "Expert (4 years)"
  },
  {
    name: "WebXR",
    icon: "fas fa-vr-cardboard",
    color: "text-red-400",
    level: "Advanced (3 years)"
  },
  {
    name: "Unity",
    icon: "fab fa-unity",
    color: "text-gray-400",
    level: "Intermediate (2 years)"
  },
  {
    name: "Blender",
    icon: "fas fa-paint-brush",
    color: "text-orange-400",
    level: "Advanced (3 years)"
  },
  {
    name: "Vue.js",
    icon: "fab fa-vuejs",
    color: "text-green-400",
    level: "Intermediate (2 years)"
  }
];

// Skill categories with proficiency levels
export const skillCategories = [
  {
    name: "Development",
    icon: "fas fa-code",
    items: [
      { name: "JavaScript/TypeScript", proficiency: 95 },
      { name: "React/Next.js", proficiency: 90 },
      { name: "Node.js", proficiency: 85 },
      { name: "Vue.js", proficiency: 75 }
    ]
  },
  {
    name: "3D & Graphics",
    icon: "fas fa-cube",
    items: [
      { name: "Three.js/WebGL", proficiency: 90 },
      { name: "Blender", proficiency: 80 },
      { name: "WebXR/VR", proficiency: 85 },
      { name: "GSAP Animations", proficiency: 90 }
    ]
  },
  {
    name: "Design & Tools",
    icon: "fas fa-palette",
    items: [
      { name: "Figma", proficiency: 85 },
      { name: "Adobe Creative Suite", proficiency: 80 },
      { name: "UI/UX Design", proficiency: 90 },
      { name: "Design Systems", proficiency: 75 }
    ]
  }
];

// Testimonial data
export const testimonials = [
  {
    name: "Michael Johnson",
    position: "CEO, TechGear",
    text: "Alex transformed our e-commerce platform with an incredible 3D product configurator that increased our conversion rate by 40%. The attention to detail and technical excellence was exactly what we needed.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&h=60"
  },
  {
    name: "Sarah Chen",
    position: "Gallery Director, ArtSpace",
    text: "Working with Alex on our VR exhibition was an incredible experience. The immersive environment created for our digital art showcase received outstanding feedback from visitors and artists alike.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&h=60"
  },
  {
    name: "Thomas Wright",
    position: "Head of Innovation, FinViz",
    text: "The interactive data visualization dashboard Alex created for our financial services has completely transformed how our clients understand complex market data. It's both beautiful and incredibly functional.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=60&h=60"
  }
];
