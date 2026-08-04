import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TearDownBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();

  /* ── EXTREME 3D HYPERSPACE ZOOM & ROTATION ─────────────────────── */
  // Zooming from 1x up to 4.8x extreme magnification as user scrolls down!
  const extremeZoom1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2.6, 4.8]);
  const extremeZoom2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 2.8, 5.2]);
  
  const rotate3D1 = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const rotate3D2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yParallax1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  /* Dynamic Tear Down Slices */
  const tearClip1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      "polygon(0 0, 100% 8vw, 100% 92vw, 0 100%)",
      "polygon(0 10vw, 100% 0, 100% 100%, 0 90vw)",
      "polygon(0 0, 100% 12vw, 100% 88vw, 0 100%)",
    ]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070814]">
      {/* ── Background Layer 1: Hyperspace Warp Tunnel ─────────────────── */}
      <motion.div
        style={{
          scale: extremeZoom1,
          rotate: rotate3D1,
          y: yParallax1,
        }}
        className="absolute inset-0 opacity-55 mix-blend-screen transform-origin-center"
      >
        <img
          src="/assets/hyper_space_tunnel_3d.jpg"
          alt="3D Hyperspace Warp Tunnel"
          className="w-full h-full object-cover filter brightness-125 contrast-125 saturate-150"
        />
      </motion.div>

      {/* ── Background Layer 2: Cyber Matrix Laser Grid ───────────────── */}
      <motion.div
        style={{
          scale: extremeZoom2,
          rotate: rotate3D2,
          y: yParallax2,
          clipPath: tearClip1,
        }}
        className="absolute inset-0 opacity-50 mix-blend-lighten transform-origin-center"
      >
        <img
          src="/assets/cyber_hyper_matrix_3d.jpg"
          alt="3D Cyber Matrix Landscape"
          className="w-full h-full object-cover filter brightness-130 saturate-200"
        />
      </motion.div>

      {/* ── Laser Tear Line 1 (Neon Cyan) ───────────────────────────── */}
      <motion.div
        style={{
          scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.4, 2.0]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 0.9, 0.9, 0.5]),
        }}
        className="absolute top-1/3 -left-1/3 -right-1/3 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_35px_#06b6d4] rotate-[-5deg]"
      />

      {/* ── Laser Tear Line 2 (Electric Magenta) ────────────────────── */}
      <motion.div
        style={{
          scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [2.0, 1.3, 0.8]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.95, 0.95, 0.4]),
        }}
        className="absolute top-2/3 -left-1/3 -right-1/3 h-1.5 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent shadow-[0_0_35px_#ec4899] rotate-[4deg]"
      />

      {/* ── Ambient Radial Glow & Cyber Grid Overlays ────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#070814_95%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
};
