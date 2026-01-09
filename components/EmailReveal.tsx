
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Mail } from 'lucide-react';

const EmailReveal: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "koushik@example.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-rose-500">
          <Mail size={20} />
        </div>
        
        <div className="flex-1">
          <div className="text-sm text-neutral-400 font-medium mb-1">Email Address</div>
          
          <div className="h-8 flex items-center">
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.button
                  key="reveal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => setIsRevealed(true)}
                  className="text-white font-bold text-lg hover:text-rose-500 transition-colors flex items-center gap-2 group/btn"
                >
                  <span className="blur-sm select-none">koushik@example.com</span>
                  <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-400 group-hover/btn:bg-rose-500 group-hover/btn:text-white transition-colors">
                    Reveal
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <a href={`mailto:${email}`} className="text-white font-bold text-lg hover:underline decoration-rose-500 underline-offset-4">
                    {email}
                  </a>
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailReveal;
