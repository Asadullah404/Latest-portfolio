import { useCallback, useMemo, useEffect } from "react";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import { tsParticles } from "@tsparticles/engine";

export const ParticleBackground = () => {
  useEffect(() => {
    const initParticles = async () => {
      await loadSlim(tsParticles);
    };
    initParticles();
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles are loaded
  }, []);

  const options = useMemo(() => ({
    background: {
      opacity: 0,
    },
    fpsLimit: 120,
    interactivity: {
      detect_on: "canvas",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#8B5CF6", "#06B6D4", "#EC4899", "#10B981"],
      },
      links: {
        color: "#8B5CF6",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.4,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: ["circle", "triangle", "star"],
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
          sync: false,
        },
      },
    },
    detectRetina: true,
    fullScreen: {
      enable: false,
    },
    style: {
      position: "absolute",
    },
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 40,
            },
            links: {
              enable: false,
            },
            move: {
              speed: 0.5,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: false,
              },
            },
          },
        },
      },
    ],
  }), []);

  // Don't render particles if user prefers reduced motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return (
      <div className="absolute inset-0 bg-gradient-cosmic opacity-20 pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0"
      />
      {/* Fallback gradient overlay */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-10 pointer-events-none" />
    </div>
  );
};