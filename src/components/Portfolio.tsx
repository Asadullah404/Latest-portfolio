import { motion } from 'framer-motion';
import { CustomCursor } from './CustomCursor';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeroSection } from './HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';
import { ChatBot } from './ui/ChatBot';
import { TearDownBackground } from './ui/TearDownBackground';

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip relative">
      <CustomCursor />
      <ThemeSwitcher />
      <ChatBot />

      {/* ─── AI Animated Artwork Background + Tear Down Scroll Effect ────────── */}
      <TearDownBackground />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <HeroSection />
        <section id="about"><AboutSection /></section>
        <section id="skills"><SkillsSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="contact"><ContactSection /></section>
      </motion.main>
    </div>
  );
};
