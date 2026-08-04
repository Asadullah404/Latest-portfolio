import { motion } from 'framer-motion';
import { Code, Cpu, Lightbulb, Rocket, Trophy, Sparkles, GraduationCap } from 'lucide-react';
import { Tilt3DCard } from '../ui/Tilt3DCard';

export const AboutSection = () => {
  const achievements = [
    {
      icon: Code,
      title: "Full-Stack Software Developer",
      description: "Proficient in modern web ecosystems: React.js, Next.js, TypeScript, Python, and cloud backends with Firebase & REST APIs."
    },
    {
      icon: Cpu,
      title: "IoT & Robotics Specialist",
      description: "Hands-on engineering with Arduino, ESP32, ESP32-CAM video streaming, ultrasonic sensors, and OpenCV computer vision integration."
    },
    {
      icon: Lightbulb,
      title: "AI & Automation Engineer",
      description: "Building automated AI pipelines, OpenAI content scraping/SEO engines, deep audio dubbing, and Encodec neural compression models."
    },
    {
      icon: Rocket,
      title: "BSCS Computer Science Graduate",
      description: "Pursuing Computer Science with a strong 3.3 CGPA, graduating August 2025 with hands-on software & hardware project experience."
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-aurora rounded-full opacity-15 animate-float blur-3xl" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-gradient-stellar rounded-full opacity-20 animate-float-delayed blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold tracking-wider text-accent mb-4 uppercase">
            <Sparkles size={14} /> Spatial Journey & Vision
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">About</span> Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate Computer Science Graduate bridging the gap between high-level web engineering, AI automation pipelines, and embedded hardware systems.
          </p>
        </motion.div>

        {/* 🏆 FYP Cash Prize Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Tilt3DCard glowColor="rgba(244,63,94,0.6)">
            <div className="glass p-8 rounded-3xl border border-rose-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 glow shrink-0">
                  <Trophy size={40} className="animate-bounce" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
                    🏆 Prestigious Award Recognition
                  </div>
                  <h3 className="text-2xl font-black text-foreground">
                    Awarded 10,000 PKR Cash Prize by iCreativez Karachi
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    Recognized for excellence in Final Year Project (FYP) "Follow Cart" — an autonomous hybrid smart cart integrating ultrasonic distance scanning and OpenCV camera computer vision.
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-center md:text-right">
                <span className="text-xs font-mono text-muted-foreground block">Project Category</span>
                <span className="text-sm font-bold text-rose-400">IoT & Computer Vision</span>
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Tilt3DCard glowColor="rgba(99,102,241,0.4)">
              <div className="glass p-8 rounded-2xl border border-white/10 h-full">
                <h3 className="text-2xl font-bold mb-4 gradient-text">My Engineering Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From writing my first line of code to building AI content pipelines and autonomous robotics, I approach every engineering challenge with curiosity, mathematical precision, and dedication to visual excellence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My academic journey in Computer Science has equipped me with strong analytical problem-solving skills, algorithm optimization, and software architecture fundamentals.
                </p>
              </div>
            </Tilt3DCard>

            <div className="grid sm:grid-cols-2 gap-4">
              <Tilt3DCard glowColor="rgba(6,182,212,0.4)">
                <div className="glass p-6 rounded-xl text-center border border-white/10">
                  <div className="text-3xl font-black gradient-text mb-1">3.3</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CGPA Score</div>
                </div>
              </Tilt3DCard>
              <Tilt3DCard glowColor="rgba(16,185,129,0.4)">
                <div className="glass p-6 rounded-xl text-center border border-white/10">
                  <div className="text-3xl font-black gradient-text mb-1">2025</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Graduation Year</div>
                </div>
              </Tilt3DCard>
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Tilt3DCard glowColor="rgba(99,102,241,0.3)">
                  <div className="glass p-6 rounded-xl border border-white/10 hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/20 text-primary glow shrink-0">
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{achievement.title}</h4>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Quick Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto border border-white/10">
            <h3 className="text-xl font-bold mb-4 gradient-text">Direct Contact Line</h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span>muhammad.asadullah.suhail@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span>+92 302 2111051</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
