import { useEffect, useState } from 'react';

// Konami code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const useMicroInteractions = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);

  // Track mouse position for particles
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newSequence = [...konamiSequence, key].slice(-KONAMI_CODE.length);
      setKonamiSequence(newSequence);

      // Check if sequence matches Konami code
      if (newSequence.length === KONAMI_CODE.length) {
        const matches = newSequence.every((k, i) => k === KONAMI_CODE[i].toLowerCase());
        if (matches && !konamiUnlocked) {
          setKonamiUnlocked(true);
          console.log('🎮 KONAMI CODE ACTIVATED! 🎮');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [konamiSequence, konamiUnlocked]);

  const resetKonami = () => {
    setKonamiUnlocked(false);
    setKonamiSequence([]);
  };

  return {
    mousePosition,
    isMouseMoving,
    konamiUnlocked,
    resetKonami,
  };
};
