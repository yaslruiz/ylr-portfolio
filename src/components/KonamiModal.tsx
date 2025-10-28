import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

interface KonamiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KonamiModal = ({ isOpen, onClose }: KonamiModalProps) => {
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const fullText = `
> SYSTEM ACCESS GRANTED
> Initializing Matrix Protocol...
> Loading neural pathways...
> Decrypting reality.exe...
> 
> ████████╗██╗  ██╗███████╗    ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
> ╚══██╔══╝██║  ██║██╔════╝    ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
>    ██║   ███████║█████╗      ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
>    ██║   ██╔══██║██╔══╝      ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
>    ██║   ██║  ██║███████╗    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
>    ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
>
> CONGRATULATIONS, NEO.
> You've discovered the hidden path.
> 
> [✓] Reality.dll loaded successfully
> [✓] Perception filters disabled
> [✓] Developer mode: ACTIVATED
> 
> "There is no spoon. Only code."
> 
> Press ESC to return to the Matrix...
  `.trim();

  useEffect(() => {
    if (!isOpen) {
      setTerminalText('');
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTerminalText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isOpen, fullText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-black border-2 border-green-500 rounded-lg shadow-2xl z-[101] overflow-hidden"
            style={{
              boxShadow: '0 0 50px rgba(34, 197, 94, 0.5), inset 0 0 50px rgba(34, 197, 94, 0.1)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-green-500/50 bg-green-950/20">
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-green-500" />
                <span className="text-green-500 font-mono font-bold">MATRIX_TERMINAL.exe</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Terminal Content */}
            <div className="p-6 h-[calc(100%-4rem)] overflow-auto font-mono text-sm md:text-base">
              <pre className="text-green-500 whitespace-pre-wrap leading-relaxed">
                {terminalText}
                {showCursor && <span className="animate-pulse">█</span>}
              </pre>
            </div>

            {/* Scanline effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.1) 2px, rgba(34, 197, 94, 0.1) 4px)',
              }}
            />

            {/* CRT flicker */}
            <motion.div
              animate={{
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 bg-green-500 pointer-events-none"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
