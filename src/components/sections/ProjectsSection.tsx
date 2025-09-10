import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [mediaIndex, setMediaIndex] = useState<{ [key: number]: number }>({});

  const projects = [
    {
      id: 1,
      title: "TaskHubDigital",
      category: "Web & Software Services",
      description: "Fast, reliable digital solutions – web & software development, SEO, content writing, and design.",
      longDescription:
        "TaskHubDigital helps businesses grow by providing end-to-end digital solutions such as website development, SEO optimization, content writing, and branding.",
      tech: ["Next.js", "TailwindCSS", "SEO", "Digital Services"],
      media: [{ type: "image", src: "/assets/taskhub.png" }],
      status: "Completed",
      year: "2024",
      demo: "https://taskhubdigital.store",
      features: [
        "Professional web & software development",
        "SEO and digital marketing services",
        "Content writing and brand design",
      ],
    },
    {
      id: 2,
      title: "Pharmacy Inventory Manager",
      category: "Full-Stack Web App",
      description: "Inventory management, profit analysis, and demand generator for pharmacies.",
      longDescription:
        "Pharmacists can add medicines, track stock, calculate worth, generate demand, and analyze profit. Includes daily report generation with pharmacy logo branding.",
      tech: ["React", "Firebase", "Charts.js", "TailwindCSS"],
      media: [{ type: "image", src: "/assets/pharmacy.png" }],
      status: "Completed",
      year: "2024",
      demo: "https://smmc-pharmacy-web.vercel.app/",
      features: [
        "Add and track medicines",
        "Inventory worth and cost vs retail price",
        "Sales-based demand generation",
        "Daily report generation with logo",
      ],
    },
    {
      id: 3,
      title: "Quran with Tarjuma",
      category: "Web App",
      description: "Listen to all 114 Surahs with translation by Qari Waheed.",
      longDescription:
        "A simple Quran app that allows users to listen to the complete Quran with Tarjuma (translation). Users can start from any Surah.",
      tech: ["Next.js", "React", "Audio API"],
      media: [{ type: "image", src: "/assets/Quran.png" }],
      status: "Completed",
      year: "2024",
      demo: "https://quran-with-tarjuma.vercel.app/",
      features: [
        "114 Surahs with translation",
        "Qari Waheed audio",
        "Continuous play from selected Surah",
      ],
    },
    {
      id: 4,
      title: "Electricity Meter Analysis",
      category: "Database & Analytics",
      description: "Electricity meter reading, storage, and usage analysis system.",
      longDescription:
        "A web app that allows storing electricity meter readings and provides detailed analysis with interactive charts.",
      tech: ["React", "Firebase", "Chart.js"],
      media: [
        { type: "image", src: "/assets/Electricity1.png" },
        { type: "image", src: "/assets/Electricity2.png" },
      ],
      status: "Completed",
      year: "2024",
      demo: "https://home-react-1.vercel.app/home",
      features: [
        "Store meter readings in database",
        "Analyze consumption over time",
        "Interactive charts & reports",
      ],
    },
    {
      id: 5,
      title: "Follow Cart FYP",
      category: "IoT & Computer Vision",
      description: "A hybrid obstacle avoidance cart using Ultrasonic + OpenCV.",
      longDescription:
        "Uses ultrasonic sensors for real-time distance measurement and OpenCV-based vision for obstacle detection. Hybrid navigation for reliability.",
      tech: ["ESP32", "Arduino", "OpenCV", "Python"],
      media: [
        { type: "image", src: "/assets/cart1.jpg" },
        { type: "image", src: "/assets/cart2.png" },
        { type: "video", src: "/assets/cart3.mp4" },
      ],
      status: "In Progress",
      year: "2025",
      features: [
        "Ultrasonic obstacle detection",
        "OpenCV-based camera vision",
        "Hybrid decision system",
      ],
    },
    {
      id: 6,
      title: "ESP32-CAM Spy Car",
      category: "IoT & Robotics",
      description: "WiFi + Bluetooth controlled car with live video streaming.",
      longDescription:
        "ESP32-CAM powered car with WiFi/Bluetooth control, live video, custom HTML dashboard with filters, and motor control.",
      tech: ["ESP32-CAM", "Arduino", "WebSocket", "IoT"],
      media: [
        { type: "image", src: "/assets/ESP32cam1.jpg" },
        { type: "image", src: "/assets/ESP32cam2.jpg" },
        { type: "image", src: "/assets/ESP32cam3.png" },
      ],
      status: "Completed",
      year: "2024",
      features: [
        "Real-time video streaming",
        "Bluetooth + WiFi control",
        "Custom HTML dashboard",
      ],
    },
  ];

  const handlePrev = (id: number, total: number) => {
    setMediaIndex((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : total - 1,
    }));
  };

  const handleNext = (id: number, total: number) => {
    setMediaIndex((prev) => ({
      ...prev,
      [id]: prev[id] < total - 1 ? prev[id] + 1 : 0,
    }));
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative solutions spanning IoT, web apps, and
            full-stack development.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => {
            const currentIndex = mediaIndex[project.id] || 0;
            const currentMedia = project.media[currentIndex];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group"
              >
                <div
                  className={`project-card glass rounded-3xl overflow-hidden interactive-card border border-primary/10 hover:border-primary/30 transition-all duration-500 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex flex-col lg:flex`}
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* Media Carousel */}
                  <div className="lg:w-1/2 relative overflow-hidden">
                    {currentMedia.type === "image" ? (
                      <img
                        src={currentMedia.src}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={currentMedia.src}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}

                    {project.media.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            handlePrev(project.id, project.media.length)
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          onClick={() =>
                            handleNext(project.id, project.media.length)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                        >
                          <ChevronRight />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {project.media.map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i === currentIndex
                                  ? "bg-white"
                                  : "bg-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold bg-accent/20 text-accent rounded-full">
                        {project.year}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          project.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {activeProject === project.id
                        ? project.longDescription
                        : project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-secondary/50 rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    {activeProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                      >
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-primary">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-3 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Demo Button */}
                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass interactive"
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
