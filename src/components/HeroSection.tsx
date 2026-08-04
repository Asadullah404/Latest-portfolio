import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Sparkles, Award, ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from './ParticleBackground';
import { Tilt3DCard } from './ui/Tilt3DCard';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Animated 3D Background */}
      <ParticleBackground />
      
      {/* Floating Glowing Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-stellar rounded-full opacity-25 animate-float blur-3xl" />
      <div className="absolute bottom-32 right-16 w-56 h-56 bg-gradient-aurora rounded-full opacity-30 animate-float-delayed blur-3xl" />
      <div className="absolute top-1/2 left-20 w-32 h-32 bg-stellar-cyan/20 rounded-full animate-pulse-glow" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        
        {/* Live Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-8 shadow-xl shadow-emerald-500/10"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Available for High-Impact Software Roles 2025</span>
        </motion.div>

        {/* 3D Cyber Avatar Container - Perfectly Centered */}
        <div className="flex justify-center items-center w-full mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 180 }}
            className="relative flex justify-center items-center"
          >
            <Tilt3DCard glowColor="rgba(99,102,241,0.8)" className="rounded-full">
              <div className="relative p-2 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-2xl shadow-indigo-500/50 flex items-center justify-center">
                <div className="p-1 rounded-full bg-background overflow-hidden flex items-center justify-center">
                  <img
                    src="/assets/cyber_hero_avatar.jpg"
                    alt="Muhammad Asadullah Sohail Cyberpunk Avatar"
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-inner hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Tilt3DCard>
            <div className="absolute bottom-0 right-0 p-2.5 rounded-full bg-primary text-primary-foreground shadow-xl glow z-40">
              <Sparkles size={20} />
            </div>
          </motion.div>
        </div>

        {/* Title & Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight"
        >
          <span className="gradient-text">Muhammad Asadullah</span>
          <br />
          <span className="text-foreground">Sohail</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-3xl font-bold text-muted-foreground mb-6"
        >
          Computer Science Graduate • Full-Stack & AI Automation Specialist
        </motion.p>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Building ultra-extra premium 3D web applications, full-stack enterprise portals, automated AI pipelines, and IoT robotics systems with state-of-the-art engineering.
        </motion.p>

        {/* Quick Highlights Stat Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
        >
          <Tilt3DCard glowColor="rgba(99,102,241,0.4)">
            <div className="glass p-5 rounded-2xl border border-white/10 text-center h-full flex flex-col justify-center">
              <div className="text-2xl font-black gradient-text">3.3 CGPA</div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">BSCS Degree</div>
            </div>
          </Tilt3DCard>
          <Tilt3DCard glowColor="rgba(6,182,212,0.4)">
            <div className="glass p-5 rounded-2xl border border-white/10 text-center h-full flex flex-col justify-center">
              <div className="text-2xl font-black gradient-text">12 Flagship</div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">Projects Built</div>
            </div>
          </Tilt3DCard>
          <Tilt3DCard glowColor="rgba(244,63,94,0.4)">
            <div className="glass p-5 rounded-2xl border border-white/10 text-center h-full flex flex-col justify-center">
              <div className="text-2xl font-black gradient-text">🏆 Award Winner</div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">iCreativez FYP Prize</div>
            </div>
          </Tilt3DCard>
          <Tilt3DCard glowColor="rgba(16,185,129,0.4)">
            <div className="glass p-5 rounded-2xl border border-white/10 text-center h-full flex flex-col justify-center">
              <div className="text-2xl font-black gradient-text">Full-Stack</div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">Web, AI & Robotics</div>
            </div>
          </Tilt3DCard>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <Button 
            size="lg" 
            className="glow px-8 py-6 text-lg font-bold bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/50 group interactive rounded-2xl"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore 3D Work & Projects
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="glass border-white/20 hover:border-primary/60 px-8 py-6 text-lg font-bold interactive rounded-2xl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Mail, href: 'mailto:muhammad.asadullah.suhail@gmail.com', label: 'Email' },
            { icon: Github, href: 'https://github.com/asadullah404', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-asadullah-sohail-9738b1396', label: 'LinkedIn' },
            { icon: Phone, href: 'https://wa.me/923022111051', label: 'WhatsApp' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl glass border border-white/10 glow hover:bg-primary/20 transition-all duration-300 group interactive"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              <span className="sr-only">{social.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </section>
  );
};
