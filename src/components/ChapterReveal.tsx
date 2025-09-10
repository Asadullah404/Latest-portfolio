import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Stable ChapterReveal + Portfolio integration
 * - Uses IntersectionObserver (center-biased via rootMargin) for robust, low-flicker detection
 * - Picks the section with the highest intersectionRatio (and above a configurable minimum)
 * - Temporarily suppresses detection right after anchor clicks so nav jumps don't open the wrong chapter
 * - Debounces evaluation to avoid rapid flicker on fast scrolls
 *
 * Drop this file into your project and replace your existing Portfolio + ChapterReveal files,
 * or copy the relevant parts into your files.
 */

/* ==========================
   ChapterReveal (slightly improved)
   ========================== */

interface ChapterRevealProps {
  isVisible: boolean;
  chapterNumber: number;
  chapterTitle: string;
  onComplete: () => void;
  durationMs?: number; // total visible duration (defaults to 2800)
}

export const ChapterReveal = ({
  isVisible,
  chapterNumber,
  chapterTitle,
  onComplete,
  durationMs = 2800,
}: ChapterRevealProps) => {
  const timeoutRef = useRef<number | null>(null);
  const prevChapterRef = useRef<number | null>(null);
  const [localShow, setLocalShow] = useState(false);

  useEffect(() => {
    // Reset when a new chapter number is given so animations can re-run
    if (prevChapterRef.current !== chapterNumber) {
      prevChapterRef.current = chapterNumber;
    }

    if (isVisible) {
      setLocalShow(true);
      // clear any existing
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setLocalShow(false);
        onComplete();
      }, durationMs);
    } else {
      // if parent hides it early, clear timer
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setLocalShow(false);
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, chapterNumber, durationMs, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {localShow && (
        <motion.div
          key={`chapter-reveal-${chapterNumber}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0.95) 70%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* visual content kept intentionally minimal here to focus on the logic — paste your full visuals back if you like */}
          <div className="relative z-10 text-center max-w-4xl px-4">
            <motion.div
              initial={{ scale: 0, rotateY: -180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0, rotateY: 180, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.9 }}
              className="mb-8 relative"
            >
              <div className="relative w-32 h-32 mx-auto rounded-full flex items-center justify-center text-5xl font-black text-white shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                  border: '2px solid rgba(59, 130, 246, 0.3)'
                }}
              >
                <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.45 }} className="bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {chapterNumber.toString().padStart(2, "0")}
                </motion.span>
              </div>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="modern-gradient-text">{chapterTitle}</span>
            </motion.h2>
          </div>

          <style>{`.modern-gradient-text{background:linear-gradient(135deg,#ffffff 0%,#a78bfa 25%,#60a5fa 50%,#34d399 75%,#ffffff 100%);background-size:300% 300%;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradientFlow 4s ease infinite;}@keyframes gradientFlow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ==========================
   Portfolio (stable detection)
   ========================== */

type Chapter = { id: number; title: string; sectionId: string };

export const Portfolio = () => {
  // === TUNABLE CONSTANTS ===
  const ROOT_MARGIN = "-40% 0px -40% 0px"; // biases toward the center of viewport
  const THRESHOLDS = [0, 0.05, 0.15, 0.33, 0.5, 0.75, 1];
  const MIN_INTERSECTION_RATIO = 0.15; // only consider sections that have this much intersection
  const EVAL_DEBOUNCE_MS = 80; // debounce evaluation to prevent flicker
  const ANCHOR_SUPPRESSION_MS = 600; // suppress detection right after an anchor/link click

  const chapters: Chapter[] = [
    { id: 1, title: "About Me", sectionId: "about" },
    { id: 2, title: "Technical Skills", sectionId: "skills" },
    { id: 3, title: "Featured Projects", sectionId: "projects" },
    { id: 4, title: "Let's Connect", sectionId: "contact" },
  ];

  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [showChapterReveal, setShowChapterReveal] = useState(false);

  // refs for stable, low-churn detection
  const visibilityMapRef = useRef<Map<number, number>>(new Map());
  const rafRef = useRef<number | null>(null);
  const evalTimeoutRef = useRef<number | null>(null);
  const ignoreUntilRef = useRef<number>(0);

  useEffect(() => {
    // Evaluate the visibilityMap and pick the best section
    const evaluate = () => {
      if (Date.now() < ignoreUntilRef.current) return; // suppression window after anchor clicks

      let bestId: number | null = null;
      let bestRatio = 0;

      for (const [id, ratio] of visibilityMapRef.current.entries()) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestRatio >= MIN_INTERSECTION_RATIO && bestId !== null) {
        if (bestId !== currentChapter) {
          setCurrentChapter(bestId);
          setShowChapterReveal(true);
          // optional: remember the scroll position if you want to auto-close later
        }
      } else {
        // no section is sufficiently visible
        if (currentChapter !== null) {
          setCurrentChapter(null);
          setShowChapterReveal(false);
        }
      }
    };

    const debouncedEvaluate = () => {
      if (evalTimeoutRef.current) window.clearTimeout(evalTimeoutRef.current);
      evalTimeoutRef.current = window.setTimeout(() => evaluate(), EVAL_DEBOUNCE_MS);
    };

    // IntersectionObserver callback
    const observerCallback: IntersectionObserverCallback = (entries) => {
      let changed = false;
      for (const entry of entries) {
        const datasetId = entry.target instanceof HTMLElement ? entry.target.dataset.chapterId : undefined;
        if (!datasetId) continue;
        const id = Number(datasetId);
        const ratio = entry.intersectionRatio;

        const old = visibilityMapRef.current.get(id) || 0;
        if (Math.abs(old - ratio) > 0.01) {
          visibilityMapRef.current.set(id, ratio);
          changed = true;
        }
      }

      if (changed) {
        debouncedEvaluate();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: ROOT_MARGIN,
      threshold: THRESHOLDS,
    });

    // Attach to sections
    chapters.forEach((c) => {
      const el = document.getElementById(c.sectionId);
      if (el) {
        el.setAttribute("data-chapter-id", String(c.id));
        visibilityMapRef.current.set(c.id, 0);
        observer.observe(el);
      }
    });

    // If the user clicks an anchor (<a href="#contact">) suppress detection briefly so the
    // browser's jump/smooth-scroll can finish and the observer can settle.
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest && (target.closest("a[href^='#']") as HTMLAnchorElement | null);
      if (anchor && anchor.hash) {
        ignoreUntilRef.current = Date.now() + ANCHOR_SUPPRESSION_MS;
      }
    };

    // Also suppress if page loads with a hash (deep link)
    if (window.location.hash) {
      ignoreUntilRef.current = Date.now() + ANCHOR_SUPPRESSION_MS;
    }

    document.addEventListener("click", onDocClick, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onDocClick);
      if (evalTimeoutRef.current) window.clearTimeout(evalTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapter]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* keep your CustomCursor and ThemeSwitcher here if you want */}

      <AnimatePresence mode="wait">
        {currentChapter && showChapterReveal && (
          <ChapterReveal
            key={`chapter-${currentChapter}`}
            isVisible={true}
            chapterNumber={currentChapter}
            chapterTitle={chapters.find((c) => c.id === currentChapter)?.title || ""}
            onComplete={() => {
              // when the animation finishes, auto-hide
              setShowChapterReveal(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        {/* NOTE: Ensure these sections have the exact IDs used in `chapters`. */}
        <section id="about">{/* ... */}</section>
        <section id="skills">{/* ... */}</section>
        <section id="projects">{/* ... */}</section>
        <section id="contact">{/* ... */}</section>
      </motion.main>

      {/* Quick tuning guide in-code (editable):
        - ROOT_MARGIN: make the top negative by header height if you have a fixed header, e.g. `-64px -0px -40% 0px`
        - MIN_INTERSECTION_RATIO: raise to make detection more conservative
        - ANCHOR_SUPPRESSION_MS: increase if your smooth-scroll takes longer
      */}
    </div>
  );
};
