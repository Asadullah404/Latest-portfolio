import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ChapterRevealProps {
  isVisible: boolean;
  chapterNumber: number;
  chapterTitle: string;
  onComplete: () => void;
}

export const ChapterReveal = ({
  isVisible,
  chapterNumber,
  chapterTitle,
  onComplete,
}: ChapterRevealProps) => {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chapterRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset hasShown when chapter changes
    if (chapterRef.current !== chapterNumber) {
      setHasShown(false);
      chapterRef.current = chapterNumber;
    }

    // Only show if visible and hasn't been shown for this chapter
    if (isVisible && !hasShown) {
      setHasShown(true);
      setShow(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShow(false);
        onComplete();
      }, 2800);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, chapterNumber, hasShown, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`chapter-reveal-${chapterNumber}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0.95) 70%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  delay: Math.random() * 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
            
            {/* Orbital Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute top-1/2 left-1/2 border border-blue-400/20 rounded-full"
                style={{
                  width: `${300 + i * 100}px`,
                  height: `${300 + i * 100}px`,
                  marginLeft: `-${150 + i * 50}px`,
                  marginTop: `-${150 + i * 50}px`
                }}
                initial={{ rotate: 0, scale: 0.5, opacity: 0 }}
                animate={{ 
                  rotate: 360,
                  scale: 1,
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: 4 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-4xl px-4">
            {/* Chapter Number with Advanced Animation */}
            <motion.div
              initial={{ scale: 0, rotateY: -180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0, rotateY: 180, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1
              }}
              className="mb-8 relative"
            >
              {/* Rotating Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                  filter: 'blur(20px)',
                  width: '140px',
                  height: '140px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Number Container */}
              <div 
                className="relative w-32 h-32 mx-auto rounded-full flex items-center justify-center text-5xl font-black text-white shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
                  border: '2px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  {chapterNumber.toString().padStart(2, "0")}
                </motion.span>
              </div>
            </motion.div>

            {/* Chapter Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <motion.span 
                className="text-sm uppercase tracking-[0.3em] text-blue-300/80 font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Chapter
              </motion.span>
            </motion.div>

            {/* Chapter Title with Modern Typography */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black mb-12 leading-tight"
            >
              <span className="modern-gradient-text">
                {chapterTitle}
              </span>
            </motion.h2>

            {/* Animated Progress Dots */}
            <motion.div
              className="flex justify-center space-x-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </motion.div>

            {/* Modern Progress Bar */}
            <motion.div
              className="w-80 max-w-full mx-auto h-1 rounded-full overflow-hidden relative"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                  backgroundSize: '200% 100%'
                }}
                initial={{ width: '0%' }}
                animate={{ 
                  width: '100%',
                  backgroundPosition: ['0% 0%', '200% 0%']
                }}
                transition={{ 
                  width: { duration: 2.2, delay: 1.4, ease: "easeOut" },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              />
            </motion.div>
          </div>

          {/* Corner Decorative Elements */}
          {[
            { position: "top-6 left-6", rotation: 0 },
            { position: "top-6 right-6", rotation: 90 },
            { position: "bottom-6 left-6", rotation: -90 },
            { position: "bottom-6 right-6", rotation: 180 }
          ].map((corner, idx) => (
            <motion.div
              key={`corner-${idx}`}
              className={`absolute ${corner.position} w-16 h-16`}
              initial={{ opacity: 0, scale: 0, rotate: corner.rotation - 90 }}
              animate={{ opacity: 0.4, scale: 1, rotate: corner.rotation }}
              exit={{ opacity: 0, scale: 0, rotate: corner.rotation + 90 }}
              transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
            >
              <div 
                className="w-full h-full relative"
                style={{ transform: `rotate(${corner.rotation}deg)` }}
              >
                <div className="absolute top-0 left-0 w-8 h-1 bg-gradient-to-r from-blue-400 to-transparent" />
                <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-blue-400 to-transparent" />
              </div>
            </motion.div>
          ))}

          {/* Embedded Styles */}
          <style>{`
            .modern-gradient-text {
              background: linear-gradient(135deg, #ffffff 0%, #a78bfa 25%, #60a5fa 50%, #34d399 75%, #ffffff 100%);
              background-size: 300% 300%;
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradientFlow 4s ease infinite;
            }
            
            @keyframes gradientFlow {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};