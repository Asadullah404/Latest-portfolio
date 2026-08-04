import { motion } from "framer-motion";
import { Sparkles, Award } from "lucide-react";

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming & Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "Python", "Java (OOP)", "C++ / C", "SQL"],
    },
    {
      title: "Full-Stack Web Development",
      skills: ["React.js", "Next.js", "TailwindCSS", "Node.js", "HTML5/CSS3", "Bootstrap 5", "REST APIs"],
    },
    {
      title: "AI, ML & Automation",
      skills: ["OpenAI API", "PyTorch / Encodec", "OpenCV Vision", "Python Auto Pipelines", "Rank Math SEO"],
    },
    {
      title: "Hardware, Robotics & IoT",
      skills: ["ESP-32 / ESP32-CAM", "Arduino C++", "Ultrasonic Sensors", "WebSockets & Bluetooth"],
    },
    {
      title: "Databases & Cloud",
      skills: ["Firebase / Firestore", "MySQL", "Vercel / Expo EAS", "Git & GitHub"],
    },
    {
      title: "Soft Skills & Engineering Practices",
      skills: [
        "Problem-solving",
        "System Architecture",
        "Debugging & Optimization",
        "Team Leadership & Adaptability",
        "Technical Communication",
      ],
    },
  ];

  const certifications = [
    {
      title: "Google Prompting Essentials",
      issuer: "Coursera / Google",
      badge: "Specialization",
      desc: "Mastering generative AI prompt engineering, task automation, and AI workflows.",
    },
    {
      title: "Google IT Automation with Python",
      issuer: "Coursera / Google",
      badge: "Professional Certificate",
      desc: "Advanced Python scripting, OS interaction, Git version control, and system automation.",
    },
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Floating Background Effects */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-stellar rounded-full opacity-20 animate-pulse blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-aurora rounded-full opacity-20 animate-pulse blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-wider text-primary mb-4 uppercase glow">
            <Sparkles size={14} /> Full Technical Toolkit
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A versatile toolkit built through computer science degree coursework, real-world software engineering, robotics research, and continuous exploration of emerging AI technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 perspective-1000">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              whileHover={{
                rotateY: 4,
                rotateX: -2,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div>
                <h3 className="text-xl font-bold mb-6 gradient-text">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: skillIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        y: -3,
                        boxShadow: "0 10px 25px rgba(99,102,241,0.3)",
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-stellar-blue/10 via-stellar-purple/10 to-stellar-cyan/10 border border-white/10 shadow-sm cursor-pointer backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                    >
                      <span className="font-medium text-xs md:text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold tracking-wider text-accent mb-4 uppercase">
            <Award size={14} /> Professional Qualifications
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">
            Verified Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-8 perspective-1000 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  y: -6,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
                className="glass p-8 rounded-2xl interactive-card text-left border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-stellar glow flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                      {cert.badge}
                    </span>
                    <h4 className="font-bold text-lg text-foreground mt-1 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cert.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 text-[11px] font-medium text-muted-foreground flex justify-between">
                  <span>Issuer: {cert.issuer}</span>
                  <span className="text-primary font-bold">Verified ✓</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
