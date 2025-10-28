import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { KonamiModal } from './components/KonamiModal';
import { HoverEffects } from './components/HoverEffects';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { useMicroInteractions } from './hooks/useMicroInteractions';

function App() {
  const { konamiUnlocked, resetKonami } = useMicroInteractions();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Mouse Trail Particles - Disabled temporarily */}
        {/* <MouseTrail /> */}
        
        {/* Hover Effects Handler */}
        <HoverEffects />
        
        {/* Konami Code Easter Egg */}
        <KonamiModal isOpen={konamiUnlocked} onClose={resetKonami} />
        
        <Navbar />
        <ThemeToggle />
        
        <main className="flex-1">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
