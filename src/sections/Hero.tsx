import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import Globe from 'react-globe.gl';

export const Hero = () => {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  
  const subtitles = [
    'Performance Architect',
    'UI/UX Visionary',
    'Open-Source Trailblazer'
  ];

  const tagline = "Full-Stack React Engineer | Pixel-Perfect Innovator";
  const typedText = useTypewriter(tagline, 50);

  // Work cities for globe
  const cities = [
    { lat: 40.7128, lng: -74.0060, name: 'New York', color: '#8b5cf6' },
    { lat: 51.5074, lng: -0.1278, name: 'London', color: '#06b6d4' },
    { lat: 35.6762, lng: 139.6503, name: 'Tokyo', color: '#ec4899' },
    { lat: -33.8688, lng: 151.2093, name: 'Sydney', color: '#8b5cf6' },
  ];

  // Rotating subtitles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  // Parallax mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Globe auto-rotation
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animated-gradient {
          background: linear-gradient(-45deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        
        .glitch-text {
          font-family: 'Space Grotesk', sans-serif;
          position: relative;
        }
        
        .glitch-text:hover::before,
        .glitch-text:hover::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text:hover::before {
          animation: glitch-1 0.3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, -2px);
          opacity: 0.8;
        }
        
        .glitch-text:hover::after {
          animation: glitch-2 0.3s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(2px, 2px);
          opacity: 0.8;
        }
        
        @keyframes glitch-1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
          50% { clip-path: polygon(0 15%, 100% 15%, 100% 60%, 0 60%); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
          50% { clip-path: polygon(0 40%, 100% 40%, 100% 85%, 0 85%); }
        }
        
        .typewriter::after {
          content: '|';
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        {/* Globe Background */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundColor="rgba(0,0,0,0)"
            pointsData={cities}
            pointAltitude={0.01}
            pointColor="color"
            pointRadius={0.5}
            pointLabel="name"
            atmosphereColor="#8b5cf6"
            atmosphereAltitude={0.15}
            width={typeof window !== 'undefined' ? window.innerWidth : 1200}
            height={typeof window !== 'undefined' ? window.innerHeight : 800}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: mousePosition.x * 0.5,
              rotateX: mousePosition.y * 0.1,
              rotateY: mousePosition.x * 0.1,
            }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
            className="text-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Name with Glitch Effect */}
            <motion.h1
              className="glitch-text text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 text-white drop-shadow-2xl"
              data-text="Your Name"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your Name
            </motion.h1>

            {/* Typewriter Tagline */}
            <motion.p
              className="typewriter text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 font-light tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {typedText}
            </motion.p>

            {/* Rotating Subtitles */}
            <motion.div
              className="h-16 mb-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {subtitles.map((subtitle, index) => (
                <motion.p
                  key={subtitle}
                  className="text-2xl sm:text-3xl md:text-4xl font-semibold absolute"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentSubtitle === index ? 1 : 0,
                    y: currentSubtitle === index ? 0 : 20,
                    scale: currentSubtitle === index ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {subtitle}
                </motion.p>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all shadow-lg hover:shadow-2xl border border-white/20"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-8 h-8 text-white/70" />
              </motion.div>
              <p className="text-white/60 text-sm mt-2">Scroll to explore</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
