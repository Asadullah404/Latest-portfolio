import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, Zap, Code2, Cpu, Globe } from "lucide-react";

/* ─── Project Data ─────────────────────────────────────────────────────────── */
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
    icon: Globe,
    color: "#6366f1",
    glow: "rgba(99,102,241,0.6)",
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
    icon: Code2,
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.6)",
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
    icon: Zap,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.6)",
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
    icon: Zap,
    color: "#10b981",
    glow: "rgba(16,185,129,0.6)",
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
      "Uses ultrasonic sensors for real-time distance measurement and OpenCV-based vision for obstacle detection. Hybrid navigation for reliability. Awarded 10,000 PKR cash prize by iCreativez Karachi.",
    tech: ["ESP32", "Arduino", "OpenCV", "Python"],
    media: [
      { type: "image", src: "/assets/cart1.jpg" },
      { type: "image", src: "/assets/cart2.png" },
      { type: "video", src: "/assets/cart3.mp4" },
    ],
    status: "Completed",
    year: "2025",
    icon: Cpu,
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.6)",
    features: [
      "Ultrasonic obstacle detection",
      "OpenCV-based camera vision",
      "Hybrid decision system",
      "Awarded 10,000 PKR cash prize by iCreativez Karachi",
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
    icon: Cpu,
    color: "#a855f7",
    glow: "rgba(168,85,247,0.6)",
    features: [
      "Real-time video streaming",
      "Bluetooth + WiFi control",
      "Custom HTML dashboard",
    ],
  },
];

/* ─── Circular Carousel ─────────────────────────────────────────────────────── */
export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState<{ [key: number]: number }>({});
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const TOTAL = projects.length;
  const ANGLE_PER_ITEM = 360 / TOTAL;

  /* ── Scroll-driven rotation ───────────────────────────────────────── */
  // The sticky section height = 100vh per project + 100vh padding
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress [0,1] → rotation [0°, -360°+sliceAngle] so we go full circle
  const rawRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(ANGLE_PER_ITEM * (TOTAL - 1))]
  );

  const springRotation = useSpring(rawRotation, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  // Track active index from scroll
  useEffect(() => {
    const unsubscribe = rawRotation.on("change", (val) => {
      const idx = Math.round(Math.abs(val) / ANGLE_PER_ITEM) % TOTAL;
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [rawRotation, ANGLE_PER_ITEM, TOTAL]);

  /* ── Manual navigation (arrows) ─────────────────────────────────── */
  const navigateTo = (idx: number) => {
    if (idx < 0 || idx >= TOTAL) return;
    if (!sectionRef.current) return;
    
    // Safely calculate the absolute top of the scroll container
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + scrollTop;
    const sectionHeight = rect.height;
    
    // Calculate exact pixel target to align with the chosen index
    const targetScroll = sectionTop + (idx / (TOTAL - 1)) * (sectionHeight - window.innerHeight);
    
    try {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, targetScroll);
    }
  };

  /* ── Keyboard Navigation ────────────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Only navigate if the projects section is in view
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateTo(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateTo(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, TOTAL]);

  /* ── Media navigation ────────────────────────────────────────────── */
  const handlePrev = (id: number, total: number) => {
    setMediaIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) - 1 + total) % total }));
  };
  const handleNext = (id: number, total: number) => {
    setMediaIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % total }));
  };

  const activeProject = projects[activeIndex];

  return (
    /* Sticky scroll container — height determines scroll travel */
    <div
      ref={sectionRef}
      className="projects-scroll-container"
      style={{ height: `${TOTAL * 100 + 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="projects-sticky-view">

        {/* ── Background atmosphere ─────────────────────── */}
        <div className="projects-atmosphere">
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
            style={{ background: projects[(activeIndex + 2) % TOTAL].glow }}
          />
          {/* Grid lines */}
          <div className="projects-grid-lines" />
        </div>

        {/* ── Section header ────────────────────────────── */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="projects-eyebrow">SCROLL TO EXPLORE</p>
          <h2 className="projects-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="projects-scroll-hint">
            <motion.div
              className="scroll-hint-line"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* ── 3D Carousel Stage ─────────────────────────── */}
        <div className="carousel-stage">
          <div className="carousel-wheel-wrapper">
            <motion.div
              className="carousel-wheel"
              style={{ rotateY: springRotation }}
            >
            {projects.map((project, index) => {
              const angle = index * ANGLE_PER_ITEM;
              const isActive = index === activeIndex;
              const Icon = project.icon;
              const currentMediaIdx = mediaIndex[project.id] || 0;
              const currentMedia = project.media[currentMediaIdx];

              return (
                <div
                  key={project.id}
                  className={`carousel-item ${isActive ? "carousel-item--active" : ""}`}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(var(--carousel-radius, 520px))`,
                  }}
                  onClick={() => navigateTo(index)}
                >
                  <motion.div
                    className="carousel-card"
                    animate={{
                      scale: isActive ? 1 : 0.72,
                      opacity: isActive ? 1 : 0.45,
                      filter: isActive ? "blur(0px)" : "blur(3px)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    whileHover={!isActive ? { scale: 0.78, opacity: 0.65, filter: "blur(1px)" } : {}}
                    style={{
                      boxShadow: isActive
                        ? `0 0 80px ${project.glow}, 0 0 160px ${project.glow}40, 0 30px 60px rgba(0,0,0,0.6)`
                        : "0 10px 40px rgba(0,0,0,0.4)",
                      borderColor: isActive ? project.color + "80" : "rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={() => setIsHoveringCard(true)}
                    onMouseLeave={() => setIsHoveringCard(false)}
                  >
                    {/* Card top accent bar */}
                    <div
                      className="card-accent-bar"
                      style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                    />

                    {/* Media area */}
                    <div className="card-media">
                      {currentMedia.type === "image" ? (
                        <img src={currentMedia.src} alt={project.title} className="card-media-img" />
                      ) : (
                        <video src={currentMedia.src} controls className="card-media-img" />
                      )}

                      {/* Media overlay gradient */}
                      <div
                        className="card-media-overlay"
                        style={{ background: `linear-gradient(to top, ${project.color}33, transparent)` }}
                      />

                      {/* Media navigation */}
                      {project.media.length > 1 && (
                        <>
                          <button
                            className="card-nav-btn card-nav-btn--left"
                            onClick={(e) => { e.stopPropagation(); handlePrev(project.id, project.media.length); }}
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            className="card-nav-btn card-nav-btn--right"
                            onClick={(e) => { e.stopPropagation(); handleNext(project.id, project.media.length); }}
                          >
                            <ChevronRight size={16} />
                          </button>
                          <div className="card-media-dots">
                            {project.media.map((_, i) => (
                              <div
                                key={i}
                                className={`card-dot ${i === currentMediaIdx ? "card-dot--active" : ""}`}
                                style={{ background: i === currentMediaIdx ? project.color : undefined }}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* Project number badge */}
                      <div className="card-index-badge" style={{ color: project.color, borderColor: project.color + "60" }}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="card-body">
                      <div className="card-meta">
                        <span className="card-category" style={{ color: project.color, borderColor: project.color + "40" }}>
                          <Icon size={10} />
                          {project.category}
                        </span>
                        <span className="card-year">{project.year}</span>
                      </div>

                      <h3 className="card-title">{project.title}</h3>

                      <p className="card-description">
                        {isActive ? project.longDescription : project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="card-tech-stack">
                        {project.tech.map((t) => (
                          <span key={t} className="card-tech-pill" style={{ borderColor: project.color + "40" }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Features — only visible when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="card-features"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <p className="card-features-label" style={{ color: project.color }}>Key Features</p>
                            <ul className="card-features-list">
                              {project.features.map((f, i) => (
                                <li key={i} className="card-feature-item">
                                  <span className="card-feature-dot" style={{ background: project.color }} />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CTA */}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-cta"
                          style={{
                            background: isActive
                              ? `linear-gradient(135deg, ${project.color}, ${project.color}99)`
                              : "rgba(255,255,255,0.05)",
                            borderColor: project.color + "60",
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                          {isActive ? "View Live Demo" : "Demo"}
                        </motion.a>
                      )}
                    </div>

                    {/* Active ring glow */}
                    {isActive && (
                      <motion.div
                        className="card-active-ring"
                        style={{ borderColor: project.color }}
                        animate={{ opacity: [0.4, 0.9, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </div>
              );
            })}
            </motion.div>
          </div>

          {/* ── Orbit ring decorations ──────────────────── */}
          <div className="orbit-ring orbit-ring-outer" />
          <div className="orbit-ring orbit-ring-inner" />
          <motion.div
            className="orbit-ring orbit-ring-pulse"
            animate={{ scale: [1, 1.04, 1], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ borderColor: activeProject.color }}
          />
        </div>

        {/* ── Bottom navigation dots ─────────────────────── */}
        <div className="carousel-nav">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`carousel-nav-dot ${i === activeIndex ? "carousel-nav-dot--active" : ""}`}
              onClick={() => navigateTo(i)}
              style={{
                background: i === activeIndex ? p.color : undefined,
                boxShadow: i === activeIndex ? `0 0 12px ${p.glow}` : undefined,
              }}
            >
              <span className="carousel-nav-label">{p.title}</span>
            </button>
          ))}
        </div>

        {/* ── Arrow navigation ───────────────────────────── */}
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={() => navigateTo(activeIndex - 1)}
          style={{ opacity: activeIndex === 0 ? 0.3 : 1, pointerEvents: activeIndex === 0 ? 'none' : 'auto' }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={() => navigateTo(activeIndex + 1)}
          style={{ opacity: activeIndex === TOTAL - 1 ? 0.3 : 1, pointerEvents: activeIndex === TOTAL - 1 ? 'none' : 'auto' }}
        >
          <ChevronRight size={22} />
        </button>

        {/* ── Active project name floating label ─────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="active-project-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span style={{ color: activeProject.color }}>
              {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL).padStart(2, "0")}
            </span>
            &nbsp;&nbsp;{activeProject.title}
          </motion.div>
        </AnimatePresence>

        {/* ── Scroll progress bar ────────────────────────── */}
        <motion.div
          className="projects-progress-bar"
          style={{ scaleX: scrollYProgress, background: activeProject.color }}
        />
      </div>
    </div>
  );
};
