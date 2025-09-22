import { motion } from 'framer-motion';
import { Code, Cpu, Lightbulb, Rocket } from 'lucide-react';

export const AboutSection = () => {
  const achievements = [
    {
      icon: Code,
      title: "Frontend Developer",
      description: "Proficient in modern web technologies including React.js, JavaScript, Python, and full-stack development with Firebase"

    },
    {
      icon: Cpu,
      title: "IoT Specialist",
      description: "Experience with Arduino, ESP32, and hardware-software integration"
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Passionate about creating innovative solutions to complex challenges"
    },
    {
      icon: Rocket,
      title: "Fast Learner",
      description: "Currently pursuing BSCS with a 3.3 CGPA, graduating August 2025"
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-aurora rounded-full opacity-10 animate-float blur-2xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-stellar rounded-full opacity-15 animate-float-delayed blur-xl" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">About</span> Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate Computer Science Graduate with a drive for innovation and excellence. 
            My journey in technology spans from low-level hardware programming to modern web development, 
            always seeking to bridge the gap between imagination and reality.
          </p>
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
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 gradient-text">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From the moment I wrote my first "Hello World" program, I knew I had found my calling. 
                My academic journey in Computer Science has been complemented by hands-on experience 
                in diverse technologies, from embedded systems to cloud platforms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in the power of technology to transform lives and solve real-world problems. 
                Whether it's developing intelligent shopping cart systems with OpenCV or creating 
                responsive web applications, I approach each project with curiosity and dedication.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-xl text-center interactive-card"
              >
                <div className="text-3xl font-bold gradient-text mb-2">3.3</div>
                <div className="text-sm text-muted-foreground">CGPA</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-xl text-center interactive-card"
              >
                <div className="text-3xl font-bold gradient-text mb-2">2025</div>
                <div className="text-sm text-muted-foreground">Graduation</div>
              </motion.div>
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
                whileHover={{ scale: 1.02, x: 10 }}
                className="glass p-6 rounded-xl interactive-card border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20 glow">
                    <achievement.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Info Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>muhammad.asadullah.suhail@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>0302-2111051</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
