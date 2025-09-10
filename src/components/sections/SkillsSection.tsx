import { motion } from "framer-motion";

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C", "Java (OOP)", "JavaScript", "Python"],
    },
    {
      title: "Web Development",
      skills: ["HTML", "CSS", "Bootstrap 5", "React.js"],
    },
    {
      title: "Hardware & IoT",
      skills: ["Arduino", "ESP-32"],
    },
    {
      title: "Databases",
      skills: ["MySQL (Basic)", "Firebase (Basic)"],
    },
    {
      title: "Productivity Tools",
      skills: ["Excel (Basic)", "Word (Basic)"],
    },
    {
      title: "Soft Skills",
      skills: [
        "Problem-solving",
        "Analytical Thinking",
        "Debugging",
        "Teamwork & Adaptability",
        "Communication",
      ],
    },
  ];

  const certifications = [
    "Coursera: Google Prompting Essentials (Specialization)",
    "Google IT Automation with Python (Professional Certificate)",
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Floating Background Effects */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-gradient-stellar rounded-full opacity-20 animate-pulse blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-aurora rounded-full opacity-20 animate-pulse blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A versatile toolkit built through academic learning, real-world
            projects, and continuous exploration of emerging technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 perspective-1000">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl"
              whileHover={{
                rotateY: 6,
                rotateX: -3,
                scale: 1.02,
                transition: { duration: 0.4 },
              }}
            >
              <h3 className="text-2xl font-bold mb-8 gradient-text">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: skillIndex * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.15,
                      rotateZ: 5,
                      y: -8,
                      boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-stellar-blue/20 to-stellar-purple/20 border border-white/10 shadow-lg cursor-pointer backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="font-medium text-lg">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-12 gradient-text">
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6 perspective-1000">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 8,
                  y: -6,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                }}
                className="glass p-6 rounded-xl interactive-card text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-stellar glow flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">
                  {cert}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
