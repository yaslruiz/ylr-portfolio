import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Rocket, Code, Award, Briefcase, GraduationCap, Heart } from 'lucide-react';

export const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [timelineRef, timelineInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [currentFact, setCurrentFact] = useState(0);

  // Timeline data
  const timeline = [
    {
      year: '2023 - Present',
      title: 'Senior Full-Stack Engineer',
      description: 'Leading development of scalable React applications with focus on performance optimization and user experience.',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
    },
    {
      year: '2021 - 2023',
      title: 'Full-Stack Developer',
      description: 'Built and maintained multiple production applications using React, Node.js, and modern cloud infrastructure.',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      year: '2020 - 2021',
      title: 'Frontend Developer',
      description: 'Crafted pixel-perfect user interfaces and implemented complex animations with Framer Motion.',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
    },
    {
      year: '2020',
      title: 'Started Journey',
      description: 'Began professional development career with a passion for creating beautiful web experiences.',
      icon: GraduationCap,
      color: 'from-orange-500 to-red-500',
    },
  ];

  // Fun facts carousel
  const funFacts = [
    '🚀 Shipped 50+ React apps',
    '⚡ 99% Lighthouse scores',
    '🎨 Pixel-perfect obsessed',
    '☕ Coffee-driven coder',
    '🌍 Remote work advocate',
    '💡 Open-source contributor',
  ];

  // Rotate fun facts every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [funFacts.length]);

  // Polaroid tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <style>{`
        .timeline-line {
          position: absolute;
          left: 19px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4, #ec4899);
          transform-origin: top;
        }
        
        .polaroid {
          background: white;
          padding: 16px;
          padding-bottom: 60px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform-style: preserve-3d;
        }
        
        .polaroid-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>

      <section id="about" className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              About Me
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
              My journey in tech and what drives me
            </p>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
              {/* Left: Timeline */}
              <motion.div
                ref={timelineRef}
                initial={{ opacity: 0, x: -50 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Animated Timeline Line */}
                <motion.div
                  className="timeline-line"
                  initial={{ scaleY: 0 }}
                  animate={timelineInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Timeline Items */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className="relative pl-12"
                    >
                      {/* Timeline Dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={timelineInView ? { scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
                        className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 flex items-center justify-center shadow-lg"
                      >
                        <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </motion.div>

                      {/* Card */}
                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r ${item.color}">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Polaroid & Fun Facts */}
              <div className="space-y-8">
                {/* Polaroid Photo */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex justify-center"
                >
                  <motion.div
                    className="polaroid"
                    style={{
                      rotateX,
                      rotateY,
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="polaroid-image flex items-center justify-center text-white text-6xl font-bold">
                      👨‍💻
                    </div>
                    <p className="text-center mt-4 font-handwriting text-gray-700 text-lg">
                      Building the future, one line at a time
                    </p>
                  </motion.div>
                </motion.div>

                {/* Fun Facts Carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-8 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-6 h-6 text-white" />
                    <h3 className="text-2xl font-bold text-white">Fun Facts</h3>
                  </div>

                  {/* Rotating Facts */}
                  <div className="relative h-20 flex items-center justify-center overflow-hidden">
                    {funFacts.map((fact, index) => (
                      <motion.div
                        key={fact}
                        className="absolute text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: currentFact === index ? 1 : 0,
                          y: currentFact === index ? 0 : 20,
                          scale: currentFact === index ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-2xl md:text-3xl font-bold text-white">
                          {fact}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {funFacts.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentFact(index)}
                        className="w-2 h-2 rounded-full transition-all"
                        animate={{
                          scale: currentFact === index ? 1.5 : 1,
                          backgroundColor: currentFact === index ? '#ffffff' : 'rgba(255,255,255,0.4)',
                        }}
                        whileHover={{ scale: 1.3 }}
                        aria-label={`Go to fact ${index + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Brief Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">What I Do</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    I specialize in building high-performance web applications with React, TypeScript, and modern 
                    frameworks. My focus is on creating seamless user experiences with pixel-perfect designs and 
                    blazing-fast performance.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
