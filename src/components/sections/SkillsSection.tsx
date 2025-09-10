import { motion } from 'framer-motion';

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", level: 90, color: "stellar-blue" },
        { name: "Python", level: 85, color: "stellar-purple" },
        { name: "Java", level: 80, color: "stellar-cyan" },
        { name: "C/C++", level: 75, color: "stellar-pink" }
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "React.js", level: 90, color: "stellar-cyan" },
        { name: "HTML/CSS", level: 95, color: "stellar-blue" },
        { name: "Node.js", level: 75, color: "stellar-purple" },
        { name: "Tailwind CSS", level: 90, color: "stellar-pink" }
      ]
    },
    {
      title: "Hardware & IoT",
      skills: [
        { name: "Arduino", level: 85, color: "stellar-purple" },
        { name: "ESP32", level: 80, color: "stellar-cyan" },
        { name: "Circuit Design", level: 70, color: "stellar-blue" },
        { name: "Sensor Integration", level: 75, color: "stellar-pink" }
      ]
    },
    {
      title: "Tools & Databases",
      skills: [
        { name: "Firebase", level: 85, color: "stellar-blue" },
        { name: "MySQL", level: 80, color: "stellar-purple" },
        { name: "Git/GitHub", level: 90, color: "stellar-cyan" },
        { name: "OpenCV", level: 70, color: "stellar-pink" }
      ]
    }
  ];

  const certifications = [
    "Java Programming Certification",
    "Web Development Bootcamp",
    "IoT Systems Design",
    "Database Management Systems"
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-gradient-stellar rounded-full opacity-5 animate-rotate-slow blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-aurora rounded-full opacity-5 animate-rotate-slow blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
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
            A comprehensive toolkit built through academic learning, practical projects, 
            and continuous exploration of emerging technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-8 gradient-text">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                    viewport={{ once: true }}
                    className="skill-card interactive"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute top-0 left-0 h-full bg-gradient-stellar rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1), ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
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
          <h3 className="text-3xl font-bold mb-12 gradient-text">Certifications & Learning</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
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

        {/* Experience Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass p-12 rounded-3xl text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Professional Experience</h3>
            <div className="mb-8">
              <h4 className="text-xl font-semibold gradient-text mb-2">Java Developer Intern</h4>
              <p className="text-muted-foreground mb-4">CodSoft • Summer 2024</p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Gained hands-on experience in Java development, working on real-world projects 
                and collaborating with experienced developers to deliver quality software solutions.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span>Professional Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span>Team Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-stellar-cyan animate-pulse" />
                  <span>Code Quality</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};