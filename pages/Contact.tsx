
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, Calendar, Send, X, CheckCircle2, Sparkles } from 'lucide-react';

// --- Types ---
type ContactMethod = 'email' | 'linkedin' | 'github' | 'calendar' | null;

// --- Components ---

const ParticleField = () => {
  // Create fixed array of particles for rose-colored "fireflies"
  const particles = Array.from({ length: 30 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -100],
            opacity: [0, 0.6, 0],
            scale: [0, Math.random() * 1.5 + 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 3, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-rose-500 rounded-full blur-[1px] shadow-[0_0_10px_rgba(244,63,94,0.8)]"
        />
      ))}
    </div>
  );
};

const HoloPanel = ({ 
  icon: Icon, 
  label, 
  subLabel, 
  position, 
  isActive, 
  isDimmed, 
  onClick,
  delay
}: { 
  icon: any, 
  label: string, 
  subLabel: string, 
  position: string, 
  isActive: boolean, 
  isDimmed: boolean, 
  onClick: () => void,
  delay: number
}) => {
  
  // Position Logic
  const posStyles = {
    top: 'top-10 left-1/2 -translate-x-1/2 -translate-y-[180%]',
    left: 'top-1/2 left-10 -translate-y-1/2 -translate-x-[120%] lg:-translate-x-[150%]',
    right: 'top-1/2 right-10 -translate-y-1/2 translate-x-[120%] lg:translate-x-[150%]',
    bottom: 'bottom-10 left-1/2 -translate-x-1/2 translate-y-[180%]',
  }[position] || '';

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : 1, 
        scale: isDimmed ? 0.8 : 1,
        y: isActive ? -10 : 0
      }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      transition={{ delay: delay, duration: 0.5 }}
      onClick={onClick}
      className={`absolute ${posStyles} group cursor-pointer z-20 outline-none w-32 md:w-auto`}
    >
      <div className={`relative p-4 md:p-6 bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 ${isActive ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]' : 'hover:bg-white/5 hover:border-white/30'}`}>
        
        {/* Holographic Scanline */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20 pointer-events-none">
            <div className="w-full h-[200%] bg-gradient-to-b from-transparent via-rose-500/30 to-transparent animate-shimmer" style={{ backgroundSize: '100% 50%' }} />
        </div>

        <div className="flex flex-col items-center gap-2 md:gap-3">
          <div className={`p-2 md:p-3 rounded-xl transition-colors ${isActive ? 'bg-rose-500 text-white' : 'bg-neutral-800 text-neutral-400 group-hover:text-white'}`}>
            <Icon size={20} className="md:w-6 md:h-6" />
          </div>
          <div className="text-center">
             <div className={`font-bold text-xs md:text-sm tracking-wider uppercase ${isActive ? 'text-rose-400' : 'text-white'}`}>{label}</div>
             <div className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">{subLabel}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const ContactFormModal = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
    const [status, setStatus] = useState('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onSuccess();
            }, 500);
        }, 1500);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg bg-neutral-900/90 border border-rose-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(244,63,94,0.2)] overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                
                <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
                    <X size={20} />
                </button>

                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                    <Mail className="text-rose-500" />
                    Transmit Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                           type="text" 
                           placeholder="Identify Yourself (Name)" 
                           required
                           className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <input 
                           type="email" 
                           placeholder="Return Frequency (Email)" 
                           required
                           className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <textarea 
                           rows={4}
                           placeholder="Transmission Content..." 
                           required
                           className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all resize-none"
                           value={formData.message}
                           onChange={e => setFormData({...formData, message: e.target.value})}
                        />
                    </div>
                    
                    <button 
                        type="button" // Change to submit in real app
                        onClick={handleSubmit}
                        disabled={status !== 'idle'}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                         {status === 'idle' && (
                             <>Establish Uplink <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                         )}
                         {status === 'sending' && (
                             <><Sparkles className="animate-spin" size={18} /> Encrypting & Sending...</>
                         )}
                         {status === 'success' && (
                             <>Message Sent <CheckCircle2 size={18} /></>
                         )}
                         
                         {/* Button shine effect */}
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

// --- Main Page Component ---

const Contact: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<ContactMethod>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3D Parallax logic (disabled on mobile)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-1, 1], [5, -5]);
  const rotateY = useTransform(x, [-1, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; // Disable parallax on mobile
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleSuccess = () => {
      setShowEmailForm(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000); // Reset after animation
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center perspective-[1000px] pt-20"
    >
      {/* 1. Ambient Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-neutral-950 to-neutral-950" />
      <ParticleField />
      
      {/* 2. Success Explosion Overlay */}
      <AnimatePresence>
        {isSuccess && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[100] flex items-center justify-center bg-rose-500/20 backdrop-blur-sm"
            >
                <div className="absolute inset-0 bg-white mix-blend-overlay opacity-50 animate-pulse" />
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center relative z-10"
                >
                     <div className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                        CONNECTION<br/>ESTABLISHED
                     </div>
                     <div className="mt-4 text-xl text-rose-300 font-mono tracking-[0.5em] animate-pulse">
                        TRANSMISSION COMPLETE
                     </div>
                </motion.div>
                {/* Expanding Rings */}
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        className="absolute border border-white/50 rounded-full"
                        initial={{ width: '10px', height: '10px', opacity: 1 }}
                        animate={{ width: '150vmax', height: '150vmax', opacity: 0 }}
                        transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                    />
                ))}
            </motion.div>
        )}
      </AnimatePresence>

      {/* 3. The 3D Chamber Content */}
      <motion.div 
        style={!isMobile ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
        className="relative w-full max-w-5xl h-[600px] md:h-[700px] flex items-center justify-center transform-gpu"
      >
         
         {/* Center Core: Avatar */}
         <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative z-30"
         >
             {/* Glowing Aura Rings */}
             <div className="absolute inset-0 -m-4 md:-m-8 border border-rose-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="absolute inset-0 -m-4 md:-m-8 border border-rose-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] scale-110" />
             
             {/* Core Glow */}
             <div className="absolute inset-0 bg-rose-500 blur-[60px] opacity-40 animate-pulse" />

             {/* Avatar Image */}
             <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 relative z-10 shadow-[0_0_30px_rgba(244,63,94,0.5)] bg-black">
                <img 
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=400&q=80" 
                    alt="Koushik" 
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
             </div>
             
             {/* Status Badge */}
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                 <div className="px-4 py-1 bg-black/80 backdrop-blur border border-rose-500/30 rounded-full text-[10px] font-bold text-rose-500 uppercase tracking-widest whitespace-nowrap shadow-lg">
                    System Online
                 </div>
                 <div className="h-6 w-px bg-gradient-to-b from-rose-500/50 to-transparent" />
             </div>
         </motion.div>

         {/* Floating Panels */}
         <HoloPanel 
            icon={Mail} 
            label="Email" 
            subLabel="Direct Uplink" 
            position="top" 
            isActive={activeMethod === 'email'} 
            isDimmed={activeMethod !== null && activeMethod !== 'email'}
            onClick={() => {
                setActiveMethod('email');
                setShowEmailForm(true);
            }}
            delay={0.2}
         />
         
         <HoloPanel 
            icon={Linkedin} 
            label="LinkedIn" 
            subLabel="Professional Net" 
            position="left" 
            isActive={activeMethod === 'linkedin'}
            isDimmed={activeMethod !== null && activeMethod !== 'linkedin'}
            onClick={() => setActiveMethod('linkedin')}
            delay={0.3}
         />

         <HoloPanel 
            icon={Github} 
            label="GitHub" 
            subLabel="Code Repository" 
            position="right" 
            isActive={activeMethod === 'github'}
            isDimmed={activeMethod !== null && activeMethod !== 'github'}
            onClick={() => setActiveMethod('github')}
            delay={0.4}
         />

         <HoloPanel 
            icon={Calendar} 
            label="Schedule" 
            subLabel="Sync Timeline" 
            position="bottom" 
            isActive={activeMethod === 'calendar'}
            isDimmed={activeMethod !== null && activeMethod !== 'calendar'}
            onClick={() => setActiveMethod('calendar')}
            delay={0.5}
         />

      </motion.div>

      {/* 4. Form Modal Overlay */}
      <AnimatePresence>
          {showEmailForm && (
              <ContactFormModal 
                  onClose={() => {
                      setShowEmailForm(false);
                      setActiveMethod(null);
                  }} 
                  onSuccess={handleSuccess} 
              />
          )}
      </AnimatePresence>

      {/* 5. Mobile Instruction Hint */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-neutral-600 text-xs uppercase tracking-widest opacity-50 pointer-events-none animate-pulse">
        Select a node to initiate contact
      </div>
    </div>
  );
};

export default Contact;
