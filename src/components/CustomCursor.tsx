import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [haloPosition, setHaloPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Sync with ThemeSwitcher toggle
    const savedCursor = localStorage.getItem("portfolio-cursor");
    if (savedCursor !== null) {
      setEnabled(savedCursor === "true");
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolio-cursor") {
        setEnabled(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      }
    };

    const updateHaloPosition = () => {
      setHaloPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, [role='button'], .interactive")) {
        setIsHovering(true);
        setCursorType("hover");
      } else if (target.matches(".project-card, .skill-card")) {
        setIsHovering(true);
        setCursorType("card");
      } else if (target.matches("h1, h2, h3")) {
        setCursorType("text");
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType("default");
    };

    // Listeners
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchmove", updateTouchPosition);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    const haloInterval = setInterval(updateHaloPosition, 16);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("touchmove", updateTouchPosition);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      clearInterval(haloInterval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [mousePosition]);

  // completely disable rendering if not enabled
  if (!enabled) return null;

  const getCursorSize = () => {
    switch (cursorType) {
      case "hover":
        return 20;
      case "card":
        return 60;
      case "text":
        return 8;
      default:
        return 12;
    }
  };

  const getHaloSize = () => {
    switch (cursorType) {
      case "hover":
        return 60;
      case "card":
        return 120;
      case "text":
        return 30;
      default:
        return 40;
    }
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - getCursorSize() / 2,
          top: mousePosition.y - getCursorSize() / 2,
          width: getCursorSize(),
          height: getCursorSize(),
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor:
            cursorType === "card"
              ? "hsl(var(--stellar-purple))"
              : "hsl(var(--primary))",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Cursor halo */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border-2 border-primary/30"
        style={{
          left: haloPosition.x - getHaloSize() / 2,
          top: haloPosition.y - getHaloSize() / 2,
          width: getHaloSize(),
          height: getHaloSize(),
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          borderColor:
            cursorType === "card"
              ? "hsl(var(--stellar-cyan) / 0.5)"
              : "hsl(var(--primary) / 0.3)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />

      {/* Ripple effect */}
      {cursorType === "card" && (
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full bg-gradient-stellar opacity-20"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </>
  );
};
