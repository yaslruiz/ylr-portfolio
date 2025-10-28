import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Users, 
  Code, 
  Award,
  ChevronDown,
  ExternalLink,
  MapPin
} from 'lucide-react';

interface KPI {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}

interface Experience {
  id: string;
  company: string;
  logo: string;
  role: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  kpis: KPI[];
  technologies: string[];
  website?: string;
}

export const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const experiences: Experience[] = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      logo: 'https://ui-avatars.com/api/?name=TechCorp&background=8b5cf6&color=fff&size=128',
      role: 'Senior Full-Stack Developer',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Leading development of scalable microservices architecture and mentoring junior developers.',
      responsibilities: [
        'Architected and implemented microservices infrastructure serving 2M+ daily users',
        'Led team of 5 developers in agile sprint planning and code reviews',
        'Optimized database queries reducing response time by 65%',
        'Implemented CI/CD pipelines with automated testing and deployment',
        'Mentored junior developers through pair programming and technical workshops'
      ],
      kpis: [
        { value: 42, suffix: '%', label: 'Load Time Reduction', icon: TrendingUp },
        { value: 2, suffix: 'M+', label: 'Daily Active Users', icon: Users },
        { value: 99.9, suffix: '%', label: 'Uptime Achieved', icon: Award },
        { value: 15, suffix: '+', label: 'Features Shipped', icon: Code }
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript'],
      website: 'https://techcorp.example.com'
    },
    {
      id: '2',
      company: 'StartupHub Inc',
      logo: 'https://ui-avatars.com/api/?name=StartupHub&background=3b82f6&color=fff&size=128',
      role: 'Frontend Developer',
      location: 'Remote',
      period: '2020 - 2022',
      startDate: '2020-03',
      endDate: '2022-01',
      description: 'Built responsive web applications and improved user experience across multiple products.',
      responsibilities: [
        'Developed 10+ responsive web applications using React and TypeScript',
        'Collaborated with UX designers to implement pixel-perfect designs',
        'Reduced bundle size by 40% through code splitting and lazy loading',
        'Implemented real-time features using WebSockets and Redux',
        'Created reusable component library used across 5 different projects'
      ],
      kpis: [
        { value: 40, suffix: '%', label: 'Bundle Size Reduced', icon: TrendingUp },
        { value: 10, suffix: '+', label: 'Apps Developed', icon: Code },
        { value: 85, suffix: '%', label: 'Test Coverage', icon: Award },
        { value: 5, suffix: 'K+', label: 'Components Created', icon: Users }
      ],
      technologies: ['React', 'Redux', 'TypeScript', 'Tailwind CSS', 'Jest', 'Figma'],
      website: 'https://startuphub.example.com'
    },
    {
      id: '3',
      company: 'Digital Agency Co',
      logo: 'https://ui-avatars.com/api/?name=Digital+Agency&background=10b981&color=fff&size=128',
      role: 'Junior Web Developer',
      location: 'New York, NY',
      period: '2018 - 2020',
      startDate: '2018-06',
      endDate: '2020-03',
      description: 'Developed client websites and learned modern web development practices.',
      responsibilities: [
        'Built 20+ client websites using HTML, CSS, JavaScript, and WordPress',
        'Implemented SEO best practices improving organic traffic by 150%',
        'Collaborated with design team to create responsive layouts',
        'Maintained and updated existing client websites',
        'Participated in daily standups and sprint retrospectives'
      ],
      kpis: [
        { value: 20, suffix: '+', label: 'Websites Built', icon: Code },
        { value: 150, suffix: '%', label: 'Traffic Increase', icon: TrendingUp },
        { value: 95, suffix: '%', label: 'Client Satisfaction', icon: Award },
        { value: 50, suffix: '+', label: 'Projects Delivered', icon: Briefcase }
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP', 'MySQL'],
      website: 'https://digitalagency.example.com'
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="experience" className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Work Experience
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            My professional journey building scalable applications and leading development teams
          </p>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 origin-left"
              />

              {/* Timeline Items */}
              <div className="flex justify-between items-start relative">
                {experiences.map((exp, index) => (
                  <TimelineItem
                    key={exp.id}
                    experience={exp}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Accordion */}
          <div className="md:hidden space-y-4">
            {experiences.map((exp, index) => (
              <AccordionItem
                key={exp.id}
                experience={exp}
                index={index}
                isActive={activeIndex === index}
                onToggle={() => toggleAccordion(index)}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Desktop Timeline Item Component
const TimelineItem = ({ 
  experience, 
  index, 
  inView 
}: { 
  experience: Experience; 
  index: number; 
  inView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex-1 relative"
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
        className="absolute top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-purple-600 rounded-full z-10"
      />

      {/* Card */}
      <div className="px-4 pt-48">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-200 dark:border-gray-700"
        >
          {/* Company Logo & Header */}
          <div className="flex items-start gap-4 mb-4">
            <img
              src={experience.logo}
              alt={experience.company}
              className="w-16 h-16 rounded-xl object-cover shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {experience.role}
              </h3>
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold mb-1">
                <Briefcase className="w-4 h-4" />
                {experience.company}
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {experience.period}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {experience.description}
          </p>

          {/* KPIs with Count-up Animation */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {experience.kpis.map((kpi, kpiIndex) => (
              <KPICard key={kpiIndex} kpi={kpi} delay={index * 0.2 + kpiIndex * 0.1} />
            ))}
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Responsibilities */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              View Responsibilities
            </summary>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {experience.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </details>

          {/* Website Link */}
          {experience.website && (
            <a
              href={experience.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Company
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Mobile Accordion Item Component
const AccordionItem = ({
  experience,
  index,
  isActive,
  onToggle,
  inView
}: {
  experience: Experience;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  inView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-start gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <img
          src={experience.logo}
          alt={experience.company}
          className="w-12 h-12 rounded-lg object-cover shadow-md flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm mb-2">
            <Briefcase className="w-4 h-4" />
            {experience.company}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {experience.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {experience.location}
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {experience.description}
              </p>

              {/* KPIs */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {experience.kpis.map((kpi, kpiIndex) => (
                  <KPICard key={kpiIndex} kpi={kpi} delay={kpiIndex * 0.1} />
                ))}
              </div>

              {/* Responsibilities */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {experience.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Website Link */}
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Company Website
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// KPI Card with Count-up Animation
const KPICard = ({ kpi, delay }: { kpi: KPI; delay: number }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const Icon = kpi.icon;

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = kpi.value / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      countRef.current += increment;
      if (countRef.current >= kpi.value) {
        setCount(kpi.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(countRef.current * 10) / 10);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, kpi.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {kpi.label}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {count.toLocaleString()}
        <span className="text-purple-600 dark:text-purple-400">{kpi.suffix}</span>
      </div>
    </motion.div>
  );
};
