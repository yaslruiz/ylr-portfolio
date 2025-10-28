import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, Star } from 'lucide-react';
import Masonry from 'react-masonry-css';
import './Projects.css';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'React' | 'Node' | 'Full-Stack';
  github: string;
  demo: string;
  thumbnail: string;
  featured?: boolean;
}

type FilterType = 'All' | 'React' | 'Node' | 'Full-Stack';

const PROJECTS_DATA: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-featured online shopping platform with cart, payments, and admin dashboard',
      tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Full-Stack',
      github: 'https://github.com/yourusername/ecommerce',
      demo: 'https://ecommerce-demo.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      featured: true,
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task manager with real-time updates and team features',
      tech: ['React', 'Redux', 'Tailwind CSS', 'Firebase'],
      category: 'React',
      github: 'https://github.com/yourusername/taskmanager',
      demo: 'https://taskmanager-demo.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    },
    {
      id: '3',
      title: 'RESTful API Service',
      description: 'Scalable REST API with authentication, rate limiting, and comprehensive docs',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
      category: 'Node',
      github: 'https://github.com/yourusername/api-service',
      demo: 'https://api-docs.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      featured: true,
    },
    {
      id: '4',
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with forecasts, maps, and location-based alerts',
      tech: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
      category: 'React',
      github: 'https://github.com/yourusername/weather',
      demo: 'https://weather-dashboard.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
    },
    {
      id: '5',
      title: 'Social Media Platform',
      description: 'Modern social network with posts, comments, likes, and real-time chat',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
      category: 'Full-Stack',
      github: 'https://github.com/yourusername/social',
      demo: 'https://social-demo.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    },
    {
      id: '6',
      title: 'Portfolio Generator',
      description: 'No-code portfolio builder with drag-and-drop interface and templates',
      tech: ['React', 'Framer Motion', 'Tailwind CSS', 'DnD Kit'],
      category: 'React',
      github: 'https://github.com/yourusername/portfolio-gen',
      demo: 'https://portfolio-gen.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
      featured: true,
    },
    {
      id: '7',
      title: 'GraphQL Server',
      description: 'High-performance GraphQL API with subscriptions and DataLoader optimization',
      tech: ['Node.js', 'GraphQL', 'Apollo Server', 'PostgreSQL'],
      category: 'Node',
      github: 'https://github.com/yourusername/graphql-server',
      demo: 'https://graphql-playground.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    },
    {
      id: '8',
      title: 'Analytics Dashboard',
      description: 'Real-time analytics platform with custom charts and data visualization',
      tech: ['React', 'TypeScript', 'D3.js', 'Recharts', 'WebSocket'],
      category: 'React',
      github: 'https://github.com/yourusername/analytics',
      demo: 'https://analytics-demo.vercel.app',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
];

export const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  // Memoized filtered projects for performance
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(project => project.category === selectedFilter);
  }, [selectedFilter]);

  // Tech badge colors
  const getTechColor = (tech: string): string => {
    const colors: Record<string, string> = {
      'React': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      'TypeScript': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      'Node.js': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
      'MongoDB': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      'PostgreSQL': 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      'Express': 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
      'Tailwind CSS': 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      'Firebase': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      'Redux': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      'GraphQL': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
      'Socket.io': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    };
    return colors[tech] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
  };

  const filters: FilterType[] = ['All', 'React', 'Node', 'Full-Stack'];

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      <section id="projects" className="min-h-screen py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              A collection of my recent work spanning full-stack development, frontend applications, and backend services
            </p>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter}
                  {filter !== 'All' && (
                    <span className="ml-2 text-xs opacity-70">
                      ({PROJECTS_DATA.filter((p: Project) => p.category === filter).length})
                    </span>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Masonry Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Masonry
                  breakpointCols={breakpointColumns}
                  className="masonry-grid"
                  columnClassName="masonry-grid-column"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedProject(project)}
                      className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                    >
                      {/* Featured Ribbon */}
                      {project.featured && (
                        <motion.div
                          initial={{ x: -100 }}
                          animate={{ x: 0 }}
                          className="absolute top-4 -left-8 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-1.5 text-sm font-bold shadow-lg transform -rotate-45"
                        >
                          <motion.div
                            animate={{ 
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="flex items-center gap-1"
                          >
                            <Star className="w-3 h-3 fill-current" />
                            FEATURED
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Lazy Loaded Thumbnail */}
                      <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
                        {!imageLoaded[project.id] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"
                            />
                          </div>
                        )}
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          loading="lazy"
                          onLoad={() => setImageLoaded(prev => ({ ...prev, [project.id]: true }))}
                          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                            imageLoaded[project.id] ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 text-xs font-medium rounded-full border ${getTechColor(tech)}`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-3 py-1 text-xs font-medium rounded-full border bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </Masonry>
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No projects found in this category
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Modal with iframe Preview */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    {selectedProject.featured && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        FEATURED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ml-4"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* iframe Preview */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-inner">
                  <iframe
                    src={selectedProject.demo}
                    title={selectedProject.title}
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-colors font-medium shadow-lg shadow-purple-500/30"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
