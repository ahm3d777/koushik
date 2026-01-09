
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GeometricSculpture: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = (mouseXVal / width - 0.5) * 2; // -1 to 1
    const yPct = (mouseYVal / height - 0.5) * 2; // -1 to 1
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(mouseY, [-1, 1], [20, -20]);
  const rotateY = useTransform(mouseX, [-1, 1], [-20, 20]);

  return (
    <div 
      className="relative w-full max-w-md aspect-square flex items-center justify-center group cursor-pointer mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-64 h-64"
      >
        {/* Central Core - Glowing Rose Orb */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotateZ: [0, 360]
          }}
          transition={{ 
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-rose-900 blur-md opacity-80 shadow-[0_0_50px_rgba(244,63,94,0.6)]"
          style={{ transform: "translateZ(-50px)" }}
        />

        {/* Silver Ring 1 (Vertical) */}
        <motion.div 
          animate={{ rotateY: 360, rotateX: 45 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 m-auto w-56 h-56 rounded-full border-2 border-neutral-400/30 border-t-white/80 border-b-white/80 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Silver Ring 2 (Horizontal) */}
        <motion.div 
          animate={{ rotateX: 360, rotateY: 45 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 m-auto w-48 h-48 rounded-full border border-rose-400/30 border-l-rose-300 border-r-rose-300"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Floating Geometric Shapes */}
        {/* Pyramid/Triangle Top */}
        <motion.div 
          animate={{ y: [-10, 10, -10], rotateZ: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-rose-500/80 backdrop-blur-sm drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]"
          style={{ transform: "translateZ(60px)" }}
        />

        {/* Cube Bottom Right */}
        <motion.div 
          animate={{ 
            rotateX: [0, 180, 360], 
            rotateY: [0, 180, 360],
            y: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tr from-neutral-800/80 to-neutral-700/80 backdrop-blur-md border border-white/10 rounded-xl shadow-xl"
          style={{ transform: "translateZ(80px)" }}
        />

        {/* Glass Card Left */}
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotateZ: [-10, 0, -10]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -left-12 w-24 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl"
          style={{ transform: "translateZ(40px)" }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent rounded-lg" />
            <div className="absolute bottom-2 left-2 w-8 h-1 bg-rose-500/50 rounded-full" />
            <div className="absolute bottom-4 left-2 w-12 h-1 bg-neutral-500/50 rounded-full" />
        </motion.div>

        {/* Floating Sphere Top Left */}
        <motion.div 
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-400 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          style={{ transform: "translateZ(20px)" }}
        />

        {/* Abstract Lines Ring */}
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full overflow-visible opacity-40">
                <motion.circle 
                    cx="50%" cy="50%" r="42%" 
                    fill="none" stroke="url(#grad1)" strokeWidth="1" 
                    strokeDasharray="4,6"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                />
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#a3a3a3" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default GeometricSculpture;
