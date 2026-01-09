
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SpotlightCard from '../components/SpotlightCard';
import { ARTICLES } from '../constants';

const Articles: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Writing</h1>
          <p className="text-xl text-neutral-400 max-w-2xl mb-12">
            Thoughts on software engineering, system architecture, and the future of web development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full">
                <div className="p-8 flex flex-col h-full hover:bg-neutral-900/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                      <Tag size={12} />
                      {article.category}
                    </span>
                    <span className="flex items-center text-xs text-neutral-500 gap-1.5">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-rose-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed mb-8 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm text-neutral-500">{article.date}</span>
                    <span className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={16} className="ml-2 text-rose-500" />
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
