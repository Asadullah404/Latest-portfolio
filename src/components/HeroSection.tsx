import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from './ParticleBackground';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-stellar rounded-full opacity-20 animate-float blur-xl" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-aurora rounded-full opacity-30 animate-float-delayed blur-lg" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-stellar-cyan/20 rounded-full animate-pulse-glow" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo / Picture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
            className="inline-block p-4 rounded-full glass glow mb-8"
          >
            <img
              src="/face.png"
              alt="Muhammad Asadullah Sohail"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
        >
          <span className="gradient-text">Muhammad Asadullah</span>
          <br />
          <span className="text-foreground">Sohail</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-2 font-medium"
        >
          Computer Science Student & Developer
        </motion.p>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Crafting innovative solutions with cutting-edge technology. 
          Specializing in full-stack development, IoT systems, and interactive experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button 
            size="lg" 
            className="glow px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-cosmic group interactive"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
            <motion.div
              className="ml-2 group-hover:translate-x-1 transition-transform"
              whileHover={{ x: 4 }}
            >
              →
            </motion.div>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="glass border-primary/30 hover:border-primary/60 px-8 py-4 text-lg interactive"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-6 mb-16"
        >
          {[
            { icon: Mail, href: 'mailto:muhammad.asadullah.suhail@gmail.com', label: 'Email' },
            { icon: Github, href: 'https://github.com/asadullah404', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-asadullah-b97271364', label: 'LinkedIn' },
            { icon: Phone, href: 'https://wa.me/923022111051', label: 'WhatsApp' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full glass glow hover:bg-primary/10 transition-all duration-300 group interactive"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
            >
              <social.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
              <span className="sr-only">{social.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none" />
    </section>
  );
};
