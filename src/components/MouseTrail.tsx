import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export const MouseTrail = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 0,
          },
          color: {
            value: ['#a855f7', '#3b82f6', '#8b5cf6', '#6366f1'],
          },
          shape: {
            type: ['circle', 'triangle', 'square'],
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
          size: {
            value: { min: 2, max: 6 },
            animation: {
              enable: true,
              speed: 10,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: { min: 1, max: 3 },
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'destroy',
            },
          },
          life: {
            duration: {
              value: 2,
            },
          },
        },
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: {
              enable: true,
              mode: 'trail',
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            trail: {
              delay: 0.005,
              quantity: 3,
              pauseOnStop: true,
            },
          },
        },
        detectRetina: true,
        background: {
          color: 'transparent',
        },
      }}
    />
  );
};
