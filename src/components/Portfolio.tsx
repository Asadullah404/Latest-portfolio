import { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from './CustomCursor';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeroSection } from './HeroSection';
// import { ChapterReveal } from './ChapterReveal';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';

export const Portfolio = () => {
  // const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  // const [showChapterReveal, setShowChapterReveal] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <ThemeSwitcher />

      {/* 🚫 ChapterReveal disabled for now */}
      {/* 
      <AnimatePresence mode="wait">
        {currentChapter && showChapterReveal && (
          <ChapterReveal
            key={`chapter-${currentChapter}`}
            isVisible={true}
            chapterNumber={currentChapter}
            chapterTitle={chapters.find(c => c.id === currentChapter)?.title || ''}
            onComplete={() => setShowChapterReveal(false)}
          />
        )}
      </AnimatePresence>
      */}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
