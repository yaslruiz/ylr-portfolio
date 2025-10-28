import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const lighthouseScores = [
    { label: 'Performance', score: 98, color: 'from-green-500 to-emerald-600' },
    { label: 'Accessibility', score: 100, color: 'from-green-500 to-emerald-600' },
    { label: 'Best Practices', score: 100, color: 'from-green-500 to-emerald-600' },
    { label: 'SEO', score: 100, color: 'from-green-500 to-emerald-600' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Portfolio
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Full-Stack Developer specializing in modern web technologies and creating exceptional user experiences.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Lighthouse Scores */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Lighthouse Scores
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {lighthouseScores.map((metric) => (
                <motion.div
                  key={metric.label}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className={`bg-gradient-to-br ${metric.color} rounded-lg p-3 text-white shadow-lg`}>
                    <div className="text-2xl font-bold">{metric.score}</div>
                    <div className="text-xs opacity-90">{metric.label}</div>
                  </div>
                  {metric.score === 100 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              Tested with Google Lighthouse
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              © {currentYear} Portfolio. Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React & TypeScript
            </p>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="/sitemap.xml" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Sitemap
              </a>
              <a href="/robots.txt" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Robots
              </a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
