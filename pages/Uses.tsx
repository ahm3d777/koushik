
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Cpu, Armchair, Laptop, PenTool, Terminal } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SpotlightCard from '../components/SpotlightCard';
import { GEAR } from '../constants';

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  switch (category) {
    case 'Hardware': return <Cpu size={20} />;
    case 'Software': return <Terminal size={20} />;
    case 'Desk': return <Armchair size={20} />;
    default: return <Monitor size={20} />;
  }
};

const Uses: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">/Uses</h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            A curated list of the hardware, software, and tools I use to build software. 
            Inspired by <a href="https://uses.tech" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">uses.tech</a>.
          </p>
        </motion.div>

        <div className="space-y-12">
          {GEAR.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-neutral-900 rounded-lg text-rose-500">
                  <CategoryIcon category={category.category} />
                </span>
                <h2 className="text-2xl font-bold text-white">{category.category}</h2>
              </div>

              <div className="grid gap-4">
                {category.items.map((item, i) => (
                  <SpotlightCard key={i} className="bg-neutral-900/50">
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-neutral-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uses;
