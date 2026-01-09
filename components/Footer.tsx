
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Twitter, ArrowUp, Mail, Eye } from 'lucide-react';

const Footer: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(14023);

  // Simulate live visitor count increase
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increment every few seconds
      if (Math.random() > 0.7) {
        setVisitorCount(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white">KOUSHIK</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Senior Software Engineer building scalable solutions that matter. 
              Focused on performance, accessibility, and clean architecture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-rose-500 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-rose-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-rose-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><NavLink to="/about" className="hover:text-rose-500 transition-colors">About Me</NavLink></li>
              <li><NavLink to="/work" className="hover:text-rose-500 transition-colors">Portfolio</NavLink></li>
              <li><NavLink to="/articles" className="hover:text-rose-500 transition-colors">Articles</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-rose-500 transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><NavLink to="/snippets" className="hover:text-rose-500 transition-colors">Code Snippets</NavLink></li>
              <li><NavLink to="/uses" className="hover:text-rose-500 transition-colors">/Uses & Gear</NavLink></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Media Kit</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold mb-6">Stay in Touch</h4>
            <div className="flex items-center space-x-2 mb-6">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-neutral-800 border border-neutral-700 text-white px-4 py-2 text-sm rounded-l-md w-full focus:outline-none focus:border-rose-500"
              />
              <button className="bg-rose-500 text-white px-3 py-2 rounded-r-md hover:bg-rose-600 transition-colors">
                <Mail size={16} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-950/50 p-2 rounded border border-neutral-800 w-fit">
              <Eye size={12} className="text-rose-500" />
              <span>{visitorCount.toLocaleString()} Visits</span>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <div className="mb-4 md:mb-0">
            &copy; 2026 Koushik. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span>Made with React & Tailwind</span>
            <button 
              onClick={scrollToTop} 
              className="flex items-center space-x-1 text-white hover:text-rose-500 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
