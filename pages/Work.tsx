
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { PROJECTS } from '../constants';

const Work: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  
  const categories = ['All', 'Web', 'Mobile', 'Backend', 'Enterprise'];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="pt-24 min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">My Work</h1>
          <p className="text-xl text-neutral-400 max-w-2xl mb-12">
            150+ Projects. Millions of Users. From startups to enterprises, here's a selection of projects where I've made an impact.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-12 sticky top-24 z-30 bg-neutral-950/90 backdrop-blur py-4 border-b border-neutral-800"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-white text-black scale-105' 
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-neutral-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
