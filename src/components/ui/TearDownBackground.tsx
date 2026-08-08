import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TearDownBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ── 3D HYPERSPACE ZOOM & ROTATION PARALLAX ─────────────────────── */
  const extremeZoom1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.8, 3.2]);
  const extremeZoom2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 2.0, 3.8]);

  const rotate3D1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate3D2 = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const yParallax1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  /* Dynamic Tear Down Slices */
  const tearClip1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      "polygon(0 0, 100% 5vw, 100% 95vw, 0 100%)",
      "polygon(0 6vw, 100% 0, 100% 100%, 0 94vw)",
      "polygon(0 0, 100% 8vw, 100% 92vw, 0 100%)",
    ]
  );

  /* ── Canvas Interconnected Neural Node Network Engine ────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate interconnected neural nodes
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 75);
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }[] = [];

    const colors = ["#a855f7", "#06b6d4", "#f43f5e", "#10b981", "#6366f1", "#38bdf8"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Dynamic Mouse/Touch interaction state
    let mouse = { x: -1000, y: -1000 };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        mouse.x = (e as MouseEvent).clientX;
        mouse.y = (e as MouseEvent).clientY;
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    const maxDist = Math.min(width, height) * 0.25;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.04;

        // Screen boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw glowing node
        const r = node.radius + Math.sin(node.pulse) * 1.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, r), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 16;
        ctx.fill();

        // Connect node to mouse if nearby
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < maxDist * 1.4) {
          const alpha = (1 - distMouse / (maxDist * 1.4)) * 0.85;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = node.color;
          ctx.shadowBlur = 14;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Connect nearby nodes together
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.6;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);

            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, other.color);

            ctx.strokeStyle = gradient;
            ctx.shadowBlur = 8;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1.0;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0c1e]">
      {/* ── Background Layer 1: Vivid 8K Detailed Interconnected Neural Artwork ─────── */}
      <motion.div
        style={{
          scale: extremeZoom1,
          rotate: rotate3D1,
          y: yParallax1,
        }}
        className="absolute inset-0 opacity-75 transform-origin-center"
      >
        <img
          src="/assets/cyber_interconnected_8k.jpg"
          alt="8K Detailed Interconnected Background"
          className="w-full h-full object-cover filter brightness-110 contrast-115 saturate-140"
        />
      </motion.div>

      {/* ── Background Layer 2: Vivid 4K Hyperspace Warp Tunnel ──────────────────── */}
      <motion.div
        style={{
          scale: extremeZoom2,
          rotate: rotate3D2,
          y: yParallax2,
          clipPath: tearClip1,
        }}
        className="absolute inset-0 opacity-70 mix-blend-screen transform-origin-center"
      >
        <img
          src="/assets/hyper_space_tunnel_4k.jpg"
          alt="4K Hyperspace Warp Tunnel"
          className="w-full h-full object-cover filter brightness-120 saturate-160"
        />
      </motion.div>

      {/* ── Real-Time Interactive Canvas Interconnected Constellation Node Web ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-90"
      />

      {/* ── Laser Tear Line 1 (Neon Cyan Glow) ─────────────────────────── */}
      <motion.div
        style={{
          scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.4, 2.0]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1.0, 1.0, 0.7]),
        }}
        className="absolute top-1/3 -left-1/3 -right-1/3 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_40px_#06b6d4] rotate-[-4deg]"
      />

      {/* ── Laser Tear Line 2 (Electric Magenta Glow) ────────────────── */}
      <motion.div
        style={{
          scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [2.0, 1.4, 0.8]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1.0, 1.0, 0.6]),
        }}
        className="absolute top-2/3 -left-1/3 -right-1/3 h-2 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent shadow-[0_0_40px_#ec4899] rotate-[3deg]"
      />

      {/* ── Cyber Mesh & Subtle Contrast Gradient ───────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#090b1c_90%)] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
    </div>
  );
};
