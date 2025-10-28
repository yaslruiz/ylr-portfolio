import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';
import { 
  SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiMongodb, 
  SiPostgresql, SiDocker, SiGit, SiAmazon, SiFigma,
  SiFramer, SiRedux, SiGraphql, SiJest, SiVite
} from 'react-icons/si';

interface SkillData {
  skill: string;
  proficiency: number;
  color: string;
  codeSnippet: string;
  description: string;
}

export const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const particleIdRef = useState(() => ({ current: 0 }))[0];

  const skillsData: SkillData[] = [
    {
      skill: 'React',
      proficiency: 95,
      color: '#61dafb',
      description: 'Advanced React patterns, hooks, and performance optimization',
      codeSnippet: `// Custom Hook Example
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debounced;
};`,
    },
    {
      skill: 'TypeScript',
      proficiency: 90,
      color: '#3178c6',
      description: 'Type-safe development with advanced generics and utility types',
      codeSnippet: `// Advanced TypeScript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

interface User {
  name: string;
  profile: { age: number };
}

const user: DeepPartial<User> = {
  profile: {} // Valid!
};`,
    },
    {
      skill: 'Node.js',
      proficiency: 85,
      color: '#339933',
      description: 'Building scalable backend services and RESTful APIs',
      codeSnippet: `// Express Middleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next))
    .catch(next);

app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));`,
    },
    {
      skill: 'CSS/Tailwind',
      proficiency: 92,
      color: '#06b6d4',
      description: 'Pixel-perfect designs with modern CSS and Tailwind',
      codeSnippet: `// Tailwind Custom Plugin
module.exports = {
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-glow': {
          'text-shadow': '0 0 20px currentColor',
        },
      });
    },
  ],
};`,
    },
    {
      skill: 'Performance',
      proficiency: 88,
      color: '#ff6b6b',
      description: 'Web vitals optimization and bundle size reduction',
      codeSnippet: `// React.memo with comparison
const MemoComponent = React.memo(
  ({ data }) => <div>{data.name}</div>,
  (prev, next) => 
    prev.data.id === next.data.id
);

// Code splitting
const LazyComponent = lazy(() => 
  import('./HeavyComponent')
);`,
    },
  ];

  const tools = [
    { icon: SiReact, name: 'React', color: '#61dafb' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178c6' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06b6d4' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47a248' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169e1' },
    { icon: SiDocker, name: 'Docker', color: '#2496ed' },
    { icon: SiGit, name: 'Git', color: '#f05032' },
    { icon: SiAmazon, name: 'AWS', color: '#ff9900' },
    { icon: SiFigma, name: 'Figma', color: '#f24e1e' },
    { icon: SiFramer, name: 'Framer', color: '#0055ff' },
    { icon: SiRedux, name: 'Redux', color: '#764abc' },
    { icon: SiGraphql, name: 'GraphQL', color: '#e10098' },
    { icon: SiJest, name: 'Jest', color: '#c21325' },
    { icon: SiVite, name: 'Vite', color: '#646cff' },
  ];

  const createParticles = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newParticles = Array.from({ length: 8 }, () => ({
      id: ++particleIdRef.current,
      x,
      y,
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  return (
    <>
      <style>{`
        @keyframes sparkle {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #fff, transparent);
          border-radius: 50%;
          pointer-events: none;
          animation: sparkle 1s ease-out forwards;
        }
        
        .tool-icon {
          transition: all 0.3s ease;
        }
        
        .tool-icon:hover {
          filter: drop-shadow(0 0 20px currentColor);
        }
        
        .code-snippet {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .recharts-radar-polygon {
          transition: all 0.3s ease;
        }

        /* Prevent chart flickering */
        .recharts-surface {
          will-change: auto;
        }

        .recharts-polar-angle-axis-tick text,
        .recharts-polar-angle-axis-tick line {
          transition: none !important;
          cursor: pointer !important;
          pointer-events: auto !important;
        }

        .recharts-polar-angle-axis-tick:hover text {
          fill: #8b5cf6 !important;
          font-weight: 700 !important;
        }

        /* Disable any default hover effects */
        .recharts-polar-angle-axis-tick text:hover,
        .recharts-polar-angle-axis-tick line:hover {
          animation: none !important;
          transition: none !important;
        }

        /* Stabilize radar chart */
        .recharts-radar {
          pointer-events: none;
        }

        .recharts-radar-dot {
          pointer-events: auto;
        }

        .chart-container {
          position: relative;
          isolation: isolate;
        }

        /* Tech Stack Container - Prevent clipping of scaled elements */
        .tech-stack-container {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
      `}</style>

      <section id="skills" className="min-h-screen py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Skills & Expertise
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
              Click on any skill in the radar chart to see code examples
            </p>

            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="max-w-3xl mx-auto mb-16 relative"
              onMouseMove={createParticles}
            >
              {/* Chart Container with stabilization */}
              <div className="chart-container" style={{ willChange: 'auto', contain: 'layout style paint' }}>
                {/* Particles */}
                {particles.map((particle) => (
                  <div
                    key={particle.id}
                    className="particle"
                    style={{
                      left: particle.x,
                      top: particle.y,
                      '--tx': `${(Math.random() - 0.5) * 100}px`,
                      '--ty': `${(Math.random() - 0.5) * 100}px`,
                    } as React.CSSProperties}
                  />
                ))}

                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart 
                    data={skillsData}
                    onClick={(data) => {
                      if (data && data.activeLabel) {
                        const skill = skillsData.find(s => s.skill === data.activeLabel);
                        if (skill) setSelectedSkill(skill);
                      }
                    }}
                  >
                    <PolarGrid stroke="#8b5cf6" strokeOpacity={0.3} />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={false}
                      axisLine={false}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
                    <Radar
                      name="Proficiency"
                      dataKey="proficiency"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>

                {/* Custom Skill Labels */}
                <div className="absolute inset-0 pointer-events-none">
                  {skillsData.map((skill, index) => {
                    const angle = (index * 360) / skillsData.length - 90; // Start from top
                    const radius = 220; // Distance from center
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                      <div
                        key={skill.skill}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer select-none"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                        }}
                        onClick={() => setSelectedSkill(skill)}
                      >
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 whitespace-nowrap">
                          {skill.skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                💡 Click on any skill name to view code examples
              </p>
            </motion.div>

            {/* Toolbelt */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Tech Stack & Tools
              </h3>
              
              <div className="relative overflow-hidden">
                <div className="flex gap-12 overflow-x-auto pb-16 px-12 scrollbar-hide tech-stack-container">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.05, type: 'spring', stiffness: 200 }}
                      whileHover={{ 
                        y: -10, 
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      className="flex-shrink-0 flex flex-col items-center gap-3 group"
                    >
                      <div
                        className="tool-icon w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg"
                        style={{ color: tool.color }}
                      >
                        <tool.icon className="w-10 h-10" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Scroll Hint */}
                <div className="absolute right-0 top-12 bottom-12 w-20 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Modal for Code Snippets */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
              >
                {/* Header */}
                <div
                  className="p-6 border-b border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: `${selectedSkill.color}15` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedSkill.skill}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedSkill.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedSkill(null)}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  {/* Proficiency Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Proficiency
                      </span>
                      <span className="text-sm font-bold" style={{ color: selectedSkill.color }}>
                        {selectedSkill.proficiency}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.proficiency}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedSkill.color }}
                      />
                    </div>
                  </div>
                </div>

                {/* Code Snippet */}
                <div className="p-6 overflow-y-auto max-h-96">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Code Example
                  </h4>
                  <pre className="code-snippet bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                    <code>{selectedSkill.codeSnippet}</code>
                  </pre>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};
