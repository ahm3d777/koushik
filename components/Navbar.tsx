
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="group relative cursor-pointer block">
          <span className="text-2xl font-black text-white tracking-tighter">
            KOUSHI<span className="text-rose-500 group-hover:text-white transition-colors">K</span>
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mr-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Available</span>
          </div>

          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:text-rose-500 ${
                  isActive ? 'text-rose-500' : 'text-neutral-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="px-6 py-2 bg-neutral-100 text-neutral-950 rounded-full text-sm font-bold hover:bg-rose-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Hire Me
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-neutral-950 border-b border-neutral-800 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Available for work</span>
              </div>

              {NAVIGATION_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? 'text-rose-500' : 'text-neutral-300'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
