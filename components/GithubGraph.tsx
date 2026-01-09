
import React from 'react';
import { motion } from 'framer-motion';

const GithubGraph: React.FC = () => {
  // Generate mock data for 52 weeks * 7 days
  const weeks = 52;
  const days = 7;
  
  // Deterministic random for consistent rendering or true random
  const getContributionLevel = () => {
    const rand = Math.random();
    if (rand > 0.85) return 4;
    if (rand > 0.65) return 3;
    if (rand > 0.45) return 2;
    if (rand > 0.25) return 1;
    return 0;
  };

  // Memoize data to prevent re-render flickering if parent updates
  const contributionData = React.useMemo(() => 
    Array.from({ length: weeks }, () => 
      Array.from({ length: days }, () => getContributionLevel())
    ), []);

  const colors = [
    'bg-neutral-900',      // Level 0
    'bg-rose-900/40',      // Level 1
    'bg-rose-700/60',      // Level 2
    'bg-rose-600/80',      // Level 3
    'bg-rose-500',         // Level 4
  ];

  return (
    <div className="w-full bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-white font-bold text-sm uppercase tracking-wider">Contribution Activity</h3>
         <div className="text-xs text-neutral-500">Last Year</div>
      </div>
      
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <div className="min-w-[700px]">
          <div className="flex gap-1">
            {contributionData.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-1">
                {week.map((level, dIndex) => (
                  <motion.div
                    key={`${wIndex}-${dIndex}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: wIndex * 0.01 + dIndex * 0.005 }}
                    className={`w-3 h-3 rounded-sm ${colors[level]} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                    title={`${level === 0 ? 'No' : Math.floor(Math.random() * 10) + 1} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-neutral-600 mt-2 font-mono uppercase tracking-widest w-full px-2">
             <span>Jan</span>
             <span>Apr</span>
             <span>Jul</span>
             <span>Oct</span>
             <span>Dec</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500 justify-end">
         <span>Less</span>
         <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-neutral-900"></div>
            <div className="w-3 h-3 rounded-sm bg-rose-900/40"></div>
            <div className="w-3 h-3 rounded-sm bg-rose-700/60"></div>
            <div className="w-3 h-3 rounded-sm bg-rose-600/80"></div>
            <div className="w-3 h-3 rounded-sm bg-rose-500"></div>
         </div>
         <span>More</span>
      </div>
    </div>
  );
};

export default GithubGraph;
