
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import Snippets from './pages/Snippets';
import Uses from './pages/Uses';
import CommandPalette from './components/CommandPalette';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import FloatingContact from './components/FloatingContact';

// Enhanced Scroll Handler
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [konamiActive, setKonamiActive] = useState(false);

  useEffect(() => {
    // Simulate loading time (matches the counter in Preloader)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  // Konami Code Listener
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          setKonamiActive(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>
      
      {/* Konami Easter Egg Modal */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-neutral-900 p-8 rounded-2xl border border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.3)] max-w-md w-full relative overflow-hidden"
            >
              <button 
                onClick={() => setKonamiActive(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 animate-shimmer" />

              <div className="text-center">
                 <div className="mx-auto w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 border border-neutral-700">
                    <Rocket size={32} className="text-rose-500 animate-bounce" />
                 </div>
                 <h2 className="text-2xl font-black text-white mb-2">CHEAT CODE ACTIVATED!</h2>
                 <p className="text-neutral-400 mb-6">
                   You've discovered the secret developer mode. While there are no infinite lives here, you've definitely earned some cool points.
                 </p>
                 <div className="bg-neutral-950 p-4 rounded-lg font-mono text-xs text-green-400 mb-6 text-left">
  &gt; ACCESS_LEVEL: ADMIN<br/>
  &gt; UNLOCKING_HIDDEN_ASSETS...<br/>
  &gt; CONFETTI_CANNON_READY
</div>
                 <button 
                   onClick={() => setKonamiActive(false)}
                   className="w-full py-3 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition-colors"
                 >
                   Return to Reality
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <Router>
          <ScrollHandler />
          <ScrollProgress />
          <CommandPalette />
          <div className="bg-neutral-950 text-neutral-200 min-h-screen font-sans selection:bg-rose-500 selection:text-white">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/work" element={<Work />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/snippets" element={<Snippets />} />
                <Route path="/uses" element={<Uses />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <FloatingContact />
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
