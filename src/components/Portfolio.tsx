import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './CustomCursor';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeroSection } from './HeroSection';
import { ChapterReveal } from './ChapterReveal';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ContactSection } from './sections/ContactSection';

export const Portfolio = () => {
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [showChapterReveal, setShowChapterReveal] = useState(false);
  const lastScrollY = useRef(0);
  const chapterTriggerPosition = useRef<number>(0);
  
  // 🎛️ CUSTOMIZABLE SETTINGS - Adjust these to change behavior
  const CHAPTER_DETECTION_THRESHOLD = 0.3; // How much of section needs to be visible (0.1-0.8)
  const SCROLL_TO_CLOSE_THRESHOLD = 0.00;  // How much scroll closes chapter (0.05-0.5)
  const DEBOUNCE_DELAY = 100; // Milliseconds to wait before processing scroll

  const chapters = [
    { id: 1, title: "About Me", sectionId: "about" },
    { id: 2, title: "Technical Skills", sectionId: "skills" },
    { id: 3, title: "Featured Projects", sectionId: "projects" },
    { id: 4, title: "Let's Connect", sectionId: "contact" }
  ];

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear existing timeout for debouncing
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        let activeChapter: number | null = null;

        // 📍 CHAPTER DETECTION LOGIC
        for (const chapter of chapters) {
          const section = document.getElementById(chapter.sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate visible portion
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibleRatio = visibleHeight / rect.height;

            // Section center position
            const sectionCenter = rect.top + rect.height / 1

            // 🎯 CUSTOMIZABLE: Adjust chapter detection sensitivity
            const isVisibleEnough =
              visibleRatio > CHAPTER_DETECTION_THRESHOLD ||
              (sectionCenter > 0 && sectionCenter < windowHeight);

            if (isVisibleEnough) {
              activeChapter = chapter.id;
              break;
            }
          }
        }

        // 🔄 CHAPTER REVEAL LOGIC
        if (activeChapter !== currentChapter) {
          if (activeChapter) {
            // 🆕 New chapter detected - SHOW
            console.log(`📖 Opening Chapter ${activeChapter}: ${chapters.find(c => c.id === activeChapter)?.title}`);
            setCurrentChapter(activeChapter);
            setShowChapterReveal(true);
            chapterTriggerPosition.current = currentScrollY;
          } else {
            // ❌ No active chapter - HIDE
            setCurrentChapter(null);
            setShowChapterReveal(false);
          }
        } else if (showChapterReveal && currentChapter) {
          // 📏 Check if user scrolled enough to close current chapter
          const scrollDifference = Math.abs(currentScrollY - chapterTriggerPosition.current);
          const scrollThreshold = window.innerHeight * SCROLL_TO_CLOSE_THRESHOLD;
          
          if (scrollDifference > scrollThreshold) {
            console.log(`📖 Closing Chapter ${currentChapter} - User scrolled ${Math.round(scrollDifference)}px`);
            setShowChapterReveal(false);
          }
        }

        lastScrollY.current = currentScrollY;
      }, DEBOUNCE_DELAY);
    };

    handleScroll(); // Run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentChapter, showChapterReveal, chapters, CHAPTER_DETECTION_THRESHOLD, SCROLL_TO_CLOSE_THRESHOLD, DEBOUNCE_DELAY]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <ThemeSwitcher />

      <AnimatePresence mode="wait">
        {currentChapter && showChapterReveal && (
          <ChapterReveal
            key={`chapter-${currentChapter}`} // Force re-mount on chapter change
            isVisible={true}
            chapterNumber={currentChapter}
            chapterTitle={chapters.find(c => c.id === currentChapter)?.title || ''}
            onComplete={() => {
              console.log(`✅ Chapter ${currentChapter} animation completed`);
              setShowChapterReveal(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </motion.main>
    </div>
  );
};

// 📚 CUSTOMIZATION GUIDE:
// 
// 🎯 CHAPTER_DETECTION_THRESHOLD (0.1 - 0.8):
//    • 0.1 = Very sensitive - chapter opens with just 10% visible
//    • 0.3 = Balanced - chapter opens with 30% visible (recommended)
//    • 0.5 = Conservative - chapter opens with 50% visible
//    • 0.8 = Very conservative - chapter opens with 80% visible
//
// 📏 SCROLL_TO_CLOSE_THRESHOLD (0.05 - 0.5):
//    • 0.05 = Very sensitive - closes after scrolling 5% of viewport
//    • 0.15 = Balanced - closes after scrolling 15% of viewport (recommended)
//    • 0.3 = Patient - closes after scrolling 30% of viewport
//    • 0.5 = Very patient - closes after scrolling 50% of viewport
//
// ⏱️ DEBOUNCE_DELAY (50 - 200ms):
//    • 50ms = Very responsive but may cause performance issues
//    • 100ms = Balanced performance and responsiveness (recommended)
//    • 200ms = Slower but better performance on low-end devices