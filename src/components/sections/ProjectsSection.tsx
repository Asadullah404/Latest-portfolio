import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Zap,
  Code2,
  Cpu,
  Globe,
  Bot,
  Box,
  HeartPulse,
  Mic,
  Eye,
  Activity,
  Github,
  X,
  Layers,
  Sparkles,
  Grid,
  RotateCw,
  Award
} from "lucide-react";
import { Tilt3DCard } from "../ui/Tilt3DCard";

/* ─── Project Data Interface ─────────────────────────────────────────────────────────── */
export interface ProjectItem {
  id: number;
  title: string;
  category: "Full-Stack" | "IoT & Hardware" | "AI & Automation" | "Web & Software Services";
  badgeTag: string;
  description: string;
  longDescription: string;
  tech: string[];
  media: { type: "image" | "video"; src: string }[];
  status: string;
  year: string;
  demo?: string;
  github?: string;
  icon: any;
  color: string;
  glow: string;
  features: string[];
}

/* ─── 12 Curated Flagship Projects Catalog with 3D AI Art Assets ─────────────────── */
const projects: ProjectItem[] = [
  {
    id: 1,
    title: "TaskHubDigital",
    category: "Web & Software Services",
    badgeTag: "Agency Platform",
    description: "Fast, reliable digital solutions – web & software development, SEO, content writing, and design.",
    longDescription:
      "TaskHubDigital helps businesses grow by providing end-to-end digital solutions such as high-performance web applications, search engine optimization (SEO), brand copywriting, and customized UI/UX design.",
    tech: ["Next.js", "TailwindCSS", "SEO Optimization", "Digital Services"],
    media: [{ type: "image", src: "/assets/taskhub.png" }],
    status: "Completed",
    year: "2024",
    demo: "https://taskhubdigital.store",
    github: "https://github.com/Asadullah404/TaskhubDigital",
    icon: Globe,
    color: "#6366f1",
    glow: "rgba(99,102,241,0.7)",
    features: [
      "Professional web & software development",
      "SEO and digital marketing automation",
      "Content writing and brand design suite",
    ],
  },
  {
    id: 2,
    title: "Pharmacy Inventory Manager",
    category: "Full-Stack",
    badgeTag: "Healthcare SaaS",
    description: "Inventory management, profit analysis, and demand generator for pharmacies.",
    longDescription:
      "A comprehensive medical inventory system allowing pharmacists to add medicines, track stock levels, calculate inventory worth, auto-generate purchase demands, and generate daily PDF reports with custom branding.",
    tech: ["React", "Firebase", "Chart.js", "TailwindCSS"],
    media: [{ type: "image", src: "/assets/pharmacy.png" }],
    status: "Completed",
    year: "2024",
    demo: "https://smmc-pharmacy-web.vercel.app/",
    github: "https://github.com/Asadullah404/SMMC-PHARMACY-WEB",
    icon: Code2,
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.7)",
    features: [
      "Add and track inventory stock levels",
      "Cost vs. Retail profit margin analytics",
      "Sales-based demand generation engine",
      "Daily PDF report export with pharmacy logo",
    ],
  },
  {
    id: 3,
    title: "Quran with Tarjuma (Soulscape)",
    category: "Full-Stack",
    badgeTag: "Audio Streaming",
    description: "Listen to all 114 Surahs with translation audio by Qari Waheed.",
    longDescription:
      "A serene, high-audio-quality Quran streaming app that allows users to stream all 114 Surahs with synchronized Urdu translation audio, offering continuous playback controls and intuitive bookmarking.",
    tech: ["Next.js", "React", "Web Audio API", "TailwindCSS"],
    media: [{ type: "image", src: "/assets/Quran.png" }],
    status: "Completed",
    year: "2024",
    demo: "https://quran-with-tarjuma.vercel.app/",
    github: "https://github.com/Asadullah404/Quran__with__Tarjuma",
    icon: Zap,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.7)",
    features: [
      "114 Surahs complete audio stream",
      "Qari Waheed clear recitation & translation",
      "Continuous playlist auto-advance",
    ],
  },
  {
    id: 4,
    title: "Electricity Meter Analysis",
    category: "Full-Stack",
    badgeTag: "Analytics Platform",
    description: "Electricity meter reading, storage, and usage analysis system.",
    longDescription:
      "A database-driven web application designed to track, analyze, and visualize residential and commercial electricity meter consumption over time with interactive Chart.js graphs and bill estimations.",
    tech: ["React", "Firebase", "Chart.js", "JavaScript"],
    media: [
      { type: "image", src: "/assets/Electricity1.png" },
      { type: "image", src: "/assets/Electricity2.png" },
    ],
    status: "Completed",
    year: "2024",
    demo: "https://home-react-1.vercel.app/home",
    github: "https://github.com/Asadullah404/Home-React-1",
    icon: Zap,
    color: "#10b981",
    glow: "rgba(16,185,129,0.7)",
    features: [
      "Database storage for meter readings",
      "Interactive consumption trend charts",
      "Monthly cost estimation & alerts",
    ],
  },
  {
    id: 5,
    title: "Follow Cart FYP (Award Winner)",
    category: "IoT & Hardware",
    badgeTag: "🏆 Award Winner",
    description: "A hybrid obstacle avoidance cart using Ultrasonic + OpenCV vision.",
    longDescription:
      "Final Year Project featuring an autonomous smart cart powered by ESP32 microcontrollers, ultrasonic distance sensors, and OpenCV computer vision for dual-layer obstacle avoidance. Honored with a 10,000 PKR cash award by iCreativez Karachi.",
    tech: ["ESP32", "Arduino", "OpenCV", "Python", "C++"],
    media: [
      { type: "image", src: "/assets/cart1.jpg" },
      { type: "image", src: "/assets/cart2.png" },
      { type: "video", src: "/assets/cart3.mp4" },
    ],
    status: "Completed",
    year: "2025",
    github: "https://github.com/Asadullah404/followcart",
    icon: Cpu,
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.7)",
    features: [
      "Ultrasonic real-time distance scanning",
      "OpenCV camera target tracking",
      "Awarded 10,000 PKR Cash Prize by iCreativez",
      "Hybrid decision navigation system",
    ],
  },
  {
    id: 6,
    title: "ESP32-CAM Spy Car",
    category: "IoT & Hardware",
    badgeTag: "Robotics & Stream",
    description: "WiFi + Bluetooth controlled car with live video streaming.",
    longDescription:
      "Robotic vehicle powered by ESP32-CAM module featuring real-time low-latency video streaming, Dual-mode WiFi/Bluetooth web dashboard controls, custom HTML interface, and dynamic motor speed regulation.",
    tech: ["ESP32-CAM", "Arduino C++", "WebSocket", "HTML5"],
    media: [
      { type: "image", src: "/assets/ESP32cam1.jpg" },
      { type: "image", src: "/assets/ESP32cam2.jpg" },
      { type: "image", src: "/assets/ESP32cam3.png" },
    ],
    status: "Completed",
    year: "2024",
    github: "https://github.com/Asadullah404/ESP32-CAM-Spy-Car",
    icon: Cpu,
    color: "#a855f7",
    glow: "rgba(168,85,247,0.7)",
    features: [
      "Real-time video feed streaming",
      "WiFi & Bluetooth remote control",
      "Custom embedded HTML dashboard",
    ],
  },
  {
    id: 7,
    title: "Auto Blog AI",
    category: "AI & Automation",
    badgeTag: "AI Neural Pipeline",
    description: "AI-powered automated content extraction, SEO rewriting, & WP publishing.",
    longDescription:
      "An automated AI pipeline built with Python and OpenAI APIs that extracts raw web content, performs SEO rewriting with Rank Math compliance, generates custom featured images, and auto-publishes posts directly to WordPress sites.",
    tech: ["Python", "OpenAI API", "WordPress REST API", "SEO"],
    media: [{ type: "image", src: "/assets/auto_blog_ai_3d.jpg" }],
    status: "Completed",
    year: "2025",
    github: "https://github.com/Asadullah404/auto-blog-ai",
    icon: Bot,
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.7)",
    features: [
      "Automated web content scraping",
      "Rank Math SEO optimization engine",
      "AI DALL-E image generation",
      "One-click WordPress auto-publishing",
    ],
  },
  {
    id: 8,
    title: "AR Planets (WebXR 3D)",
    category: "Full-Stack",
    badgeTag: "3D WebXR Cosmic",
    description: "Interactive 3D Augmented Reality solar system visualization in WebXR.",
    longDescription:
      "An immersive 3D solar system explorer created with Three.js and WebXR, enabling users to orbit around planets, inspect texture details, view orbital physics, and project celestial bodies into real-world spaces via AR.",
    tech: ["TypeScript", "Three.js", "WebXR", "React"],
    media: [{ type: "image", src: "/assets/ar_planets_3d.jpg" }],
    status: "Completed",
    year: "2025",
    github: "https://github.com/Asadullah404/Ar-Planets",
    icon: Box,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.7)",
    features: [
      "Interactive WebGL 3D planet models",
      "WebXR Augmented Reality projection",
      "Real-time orbital lighting & shaders",
    ],
  },
  {
    id: 9,
    title: "ClinicFlow & PatientPath Grid",
    category: "Full-Stack",
    badgeTag: "Health Tech EMR",
    description: "Clinical management portal with patient path tracking & scheduling.",
    longDescription:
      "A cloud-backed healthcare web platform that streamlines patient intake, doctor scheduling, electronic medical records (EMR), and diagnostic grid analysis with real-time Firebase syncing.",
    tech: ["TypeScript", "React", "Firebase", "TailwindCSS"],
    media: [{ type: "image", src: "/assets/clinic_flow_3d.jpg" }],
    status: "Completed",
    year: "2025",
    github: "https://github.com/Asadullah404/clinicflow-firebase",
    icon: HeartPulse,
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.7)",
    features: [
      "Real-time appointment scheduling",
      "Patient path grid tracking",
      "Cloud EMR & prescription storage",
    ],
  },
  {
    id: 10,
    title: "AI Video Dubbing & Neural Codec",
    category: "AI & Automation",
    badgeTag: "Deep Audio Neural",
    description: "Neural speech translation, video dubbing, and Encodec neural audio compression.",
    longDescription:
      "A deep learning lab suite featuring AI speech translation, automated lip-synced video dubbing, and fine-tuned Encodec transformer models for neural audio compression and audio enhancement.",
    tech: ["Python", "PyTorch", "Encodec", "Whisper AI"],
    media: [{ type: "image", src: "/assets/ai_dubbing_3d.jpg" }],
    status: "Completed",
    year: "2025",
    github: "https://github.com/Asadullah404/Ai_Video_Dubbing",
    icon: Mic,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.7)",
    features: [
      "Multi-lingual AI speech translation",
      "Neural Encodec model fine-tuning",
      "High-efficiency audio compression pipeline",
    ],
  },
  {
    id: 11,
    title: "Bulk Watermark Hider Utility",
    category: "AI & Automation",
    badgeTag: "Computer Vision",
    description: "Automated computer vision utility for erasing watermarks across dataset images.",
    longDescription:
      "High-throughput Python computer vision script using OpenCV and inpainting algorithms to detect, mask, and seamlessly erase watermarks from image libraries without degrading image quality.",
    tech: ["Python", "OpenCV", "NumPy", "Inpainting"],
    media: [{ type: "image", src: "/assets/ESP32cam3.png" }],
    status: "Completed",
    year: "2025",
    github: "https://github.com/Asadullah404/Bulk-Watermark-Hider-utility",
    icon: Eye,
    color: "#f97316",
    glow: "rgba(249,115,22,0.7)",
    features: [
      "Batch image watermark detection",
      "Navier-Stokes computer vision inpainting",
      "Zero pixel quality loss pipeline",
    ],
  },
  {
    id: 12,
    title: "LabWise Care Diagnostic Portal",
    category: "Full-Stack",
    badgeTag: "Enterprise Diagnostic",
    description: "Patient diagnostic lab management platform with test report downloads.",
    longDescription:
      "Medical diagnostic laboratory software enabling medical technicians to manage test orders, store patient lab records, generate automated PDF reports, and notify patients when results are ready.",
    tech: ["TypeScript", "React", "Node.js", "TailwindCSS"],
    media: [{ type: "image", src: "/assets/pharmacy.png" }],
    status: "Completed",
    year: "2025",
    github: "https://github.com/Asadullah404/labwise-care",
    icon: Activity,
    color: "#0284c7",
    glow: "rgba(2,132,199,0.7)",
    features: [
      "Automated test result generation",
      "Patient result download portal",
      "Lab technician workflow management",
    ],
  },
];

/* ─── Main Projects Component ─────────────────────────────────────────────────────────── */
export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);
  const [mediaIndex, setMediaIndex] = useState<{ [key: number]: number }>({});

  const categories = ["All", "Full-Stack", "IoT & Hardware", "AI & Automation", "Web & Software Services"];

  const filteredProjects = projects.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  const TOTAL = filteredProjects.length;
  const ANGLE_PER_ITEM = 360 / Math.max(TOTAL, 1);

  /* ── Scroll-driven rotation ───────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(ANGLE_PER_ITEM * (Math.max(TOTAL, 1) - 1))]
  );

  const springRotation = useSpring(rawRotation, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    const unsubscribe = rawRotation.on("change", (val) => {
      const idx = Math.round(Math.abs(val) / ANGLE_PER_ITEM) % Math.max(TOTAL, 1);
      if (idx < TOTAL) {
        setActiveIndex(idx);
      }
    });
    return unsubscribe;
  }, [rawRotation, ANGLE_PER_ITEM, TOTAL]);

  const navigateTo = (idx: number) => {
    if (idx < 0 || idx >= TOTAL) return;
    setActiveIndex(idx);
    if (!sectionRef.current) return;
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + scrollTop;
    const sectionHeight = rect.height;
    const targetScroll = sectionTop + (idx / Math.max(TOTAL - 1, 1)) * (sectionHeight - window.innerHeight);
    
    try {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, targetScroll);
    }
  };

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0] || projects[0];

  return (
    <div
      ref={sectionRef}
      className="projects-scroll-container relative min-h-screen"
      style={{ height: viewMode === "carousel" ? `${Math.max(TOTAL, 1) * 70 + 80}vh` : "auto" }}
    >
      {/* Sticky viewport for 3D Carousel */}
      <div className={`${viewMode === "carousel" ? "projects-sticky-view sticky top-0" : "py-20"} min-h-screen flex flex-col justify-between overflow-hidden`}>
        
        {/* Atmosphere glowing background */}
        <div className="projects-atmosphere pointer-events-none">
          <motion.div
            className="atm-orb atm-orb-1"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: activeProject.glow }}
          />
          <motion.div
            className="atm-orb atm-orb-2"
            animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ background: activeProject.color }}
          />
          <div className="projects-grid-lines" />
        </div>

        {/* Section Header */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-wider text-primary mb-4 uppercase glow">
              <Sparkles size={14} className="animate-spin" />
              Flagship 3D Showcase ({projects.length} Repositories)
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Featured <span className="gradient-text">Projects & Innovations</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-8">
              Explore my top creations built across Full-Stack Web Development, AI Pipelines, Computer Vision, and IoT Hardware. Hover cards for 3D spatial rotation!
            </p>

            {/* View Mode & Filter Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 bg-secondary/30 p-1.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveIndex(0);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground shadow-lg glow scale-105"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Switcher Toggle */}
              <div className="flex items-center gap-1 bg-secondary/30 p-1.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
                <button
                  onClick={() => setViewMode("carousel")}
                  className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                    viewMode === "carousel"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="3D Wheel View"
                >
                  <RotateCw size={14} />
                  <span className="hidden sm:inline">3D Stage</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  title="Grid View"
                >
                  <Grid size={14} />
                  <span className="hidden sm:inline">3D Grid</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── MODE 1: 3D CAROUSEL STAGE ────────────────────────────── */}
        {viewMode === "carousel" && (
          <div className="carousel-stage relative flex-1 flex items-center justify-center my-6">
            <div className="carousel-wheel-wrapper">
              <motion.div
                className="carousel-wheel"
                style={{ rotateY: springRotation }}
              >
                {filteredProjects.map((project, index) => {
                  const angle = index * ANGLE_PER_ITEM;
                  const isActive = index === activeIndex;
                  const Icon = project.icon;

                  return (
                    <div
                      key={project.id}
                      className={`carousel-item ${isActive ? "carousel-item--active" : ""}`}
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(var(--carousel-radius, 520px))`,
                      }}
                      onClick={() => navigateTo(index)}
                    >
                      <Tilt3DCard glowColor={project.glow}>
                        <div
                          className="carousel-card cursor-pointer group glass border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between"
                          style={{
                            borderColor: isActive ? project.color + "90" : "rgba(255,255,255,0.08)",
                          }}
                        >
                          {/* Top Accent Bar */}
                          <div
                            className="h-1 w-full"
                            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                          />

                          {/* Media Preview Header */}
                          <div className="relative h-48 overflow-hidden bg-black/40">
                            <img src={project.media[0].src} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                            {/* Badge tag */}
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-wide uppercase" style={{ color: project.color }}>
                              {project.badgeTag}
                            </div>

                            <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded bg-black/70 border border-white/10" style={{ color: project.color }}>
                              #{String(index + 1).padStart(2, "0")}
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-6 flex flex-col justify-between flex-1">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: project.color }}>
                                  <Icon size={12} /> {project.category}
                                </span>
                                <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                              </div>

                              <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>

                              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                                {project.description}
                              </p>

                              {/* Tech Stack Pills */}
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.tech.slice(0, 3).map((t) => (
                                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-foreground/80 font-mono">
                                    {t}
                                  </span>
                                ))}
                                {project.tech.length > 3 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground font-mono">
                                    +{project.tech.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Links */}
                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                              {project.demo && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-all duration-300 hover:scale-105"
                                  style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)` }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={12} /> Demo
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-foreground transition-all"
                                  title="View GitHub Code"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github size={14} />
                                </a>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedModalProject(project);
                                }}
                                className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </Tilt3DCard>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Orbit rings */}
            <div className="orbit-ring orbit-ring-outer pointer-events-none" />
            <div className="orbit-ring orbit-ring-inner pointer-events-none" />
          </div>
        )}

        {/* ── MODE 2: INTERACTIVE 3D GRID VIEW ────────────────────────────── */}
        {viewMode === "grid" && (
          <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
            {filteredProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Tilt3DCard glowColor={project.glow}>
                    <div
                      className="glass rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-primary/50 transition-all duration-300 shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden bg-black/40">
                        <img src={project.media[0].src} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase" style={{ color: project.color }}>
                          {project.badgeTag}
                        </div>
                        <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded bg-black/60 border border-white/10" style={{ color: project.color }}>
                          {project.year}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-medium mb-2" style={{ color: project.color }}>
                            <Icon size={14} /> {project.category}
                          </div>

                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tech.map((t) => (
                              <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:brightness-110"
                              style={{ background: project.color }}
                            >
                              <ExternalLink size={12} /> Demo
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-foreground transition-all"
                              title="GitHub Source"
                            >
                              <Github size={14} />
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedModalProject(project)}
                            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tilt3DCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom Carousel Navigation Controls */}
        {viewMode === "carousel" && (
          <div className="relative z-20 pb-8 flex flex-col items-center gap-4">
            <div className="text-center text-xs font-semibold tracking-wider" style={{ color: activeProject.color }}>
              <span className="opacity-60">{String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
              <span className="mx-2">•</span>
              <span>{activeProject.title}</span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 max-w-xl px-4">
              {filteredProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-8" : "w-2 opacity-40 hover:opacity-100"
                  }`}
                  style={{
                    background: p.color,
                    boxShadow: i === activeIndex ? `0 0 10px ${p.color}` : "none",
                  }}
                  title={p.title}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="p-2.5 rounded-full glass border border-white/10 text-foreground hover:bg-primary/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => navigateTo(activeIndex + 1)}
                disabled={activeIndex === TOTAL - 1}
                className="p-2.5 rounded-full glass border border-white/10 text-foreground hover:bg-primary/20 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── INTERACTIVE FULL DETAILS MODAL DRAWER ────────────────────────────── */}
      <AnimatePresence>
        {selectedModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 z-10"
              style={{ boxShadow: `0 0 100px ${selectedModalProject.glow}` }}
            >
              <button
                onClick={() => setSelectedModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-muted-foreground hover:text-foreground transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-2" style={{ color: selectedModalProject.color }}>
                <Layers size={16} />
                <span className="text-xs font-bold tracking-wider uppercase">{selectedModalProject.category}</span>
                <span>•</span>
                <span className="text-xs font-semibold">{selectedModalProject.year}</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-black mb-4">
                {selectedModalProject.title}
              </h3>

              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl mb-6 bg-black/40 border border-white/10">
                <img src={selectedModalProject.media[0].src} alt={selectedModalProject.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs font-bold uppercase" style={{ color: selectedModalProject.color }}>
                  {selectedModalProject.badgeTag}
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">About the Project</h4>
                <p className="text-sm md:text-base leading-relaxed text-foreground/90">
                  {selectedModalProject.longDescription}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Key Highlights & Features</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedModalProject.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                      <span className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: selectedModalProject.color }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModalProject.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-secondary/50 border border-white/10 text-xs font-mono font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                {selectedModalProject.demo && (
                  <a
                    href={selectedModalProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 shadow-lg"
                    style={{ background: selectedModalProject.color }}
                  >
                    <ExternalLink size={16} /> Open Live Application
                  </a>
                )}
                {selectedModalProject.github && (
                  <a
                    href={selectedModalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-bold text-foreground transition-all"
                  >
                    <Github size={16} /> View Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
