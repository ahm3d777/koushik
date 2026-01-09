
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Code2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { SNIPPETS } from '../constants';

const SnippetCard: React.FC<{ snippet: typeof SNIPPETS[0] }> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
          <span className="text-sm font-bold text-neutral-300">{snippet.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-500 uppercase">{snippet.language}</span>
          <button 
            onClick={handleCopy}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-all"
            title="Copy code"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
      <div className="p-4 bg-black/50 overflow-x-auto">
        <pre className="font-mono text-xs md:text-sm text-neutral-300">
          <code>{snippet.code}</code>
        </pre>
      </div>
      <div className="p-4 bg-neutral-900 border-t border-neutral-800">
        <p className="text-sm text-neutral-500">{snippet.description}</p>
      </div>
    </div>
  );
};

const Snippets: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
             <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500 border border-rose-500/20">
                <Code2 size={32} />
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-white">Code Gallery</h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl">
            A collection of reusable components, hooks, and utility functions that I use across my projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {SNIPPETS.map((snippet, index) => (
            <motion.div
              key={snippet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <SnippetCard snippet={snippet} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Snippets;
