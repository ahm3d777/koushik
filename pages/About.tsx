
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Code2, Briefcase, Award, Zap, MapPin, 
  ChevronRight, Star, Coffee, Terminal, 
  Cpu, Building, User, X, ArrowRight, Play, Pause, Calendar
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

// --- Types ---
type MilestoneType = 'start' | 'job' | 'project' | 'award' | 'skill' | 'current';

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  type: MilestoneType;
  x: number; // Percentage 0-100 on horizontal track
  y: number; // Percentage 0-100 vertical variation
  details?: {
    tech?: string[];
    stats?: { label: string; value: string }[];
    image?: string;
    quote?: string;
  };
}

// --- Data ---
const MILESTONES: Milestone[] = [
  {
    id: 'start',
    year: '2016',
    title: 'The Spark',
    description: 'Wrote my first line of JavaScript. Felt like magic.',
    type: 'start',
    x: 5,
    y: 50,
    details: {
      quote: "It started with a simple alert('Hello World'), and I was hooked.",
      tech: ['HTML', 'CSS', 'Vanilla JS']
    }
  },
  {
    id: 'first-job',
    year: '2017',
    title: 'Junior Dev @ StartUp Alpha',
    description: 'First professional role. Learned git the hard way.',
    type: 'job',
    x: 18,
    y: 70,
    details: {
      stats: [{ label: 'Bugs Fixed', value: '400+' }, { label: 'Coffee', value: '∞' }],
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=500&q=80'
    }
  },
  {
    id: 'project-1',
    year: '2018',
    title: 'HealthConnect Launch',
    description: 'Built my first major React Native app.',
    type: 'project',
    x: 30,
    y: 30,
    details: {
      tech: ['React Native', 'Firebase', 'Redux'],
      stats: [{ label: 'Downloads', value: '100k+' }]
    }
  },
  {
    id: 'skill-up',
    year: '2019',
    title: 'The TypeScript Shift',
    description: 'Embraced type safety and never looked back.',
    type: 'skill',
    x: 42,
    y: 60,
    details: {
      quote: "Refactoring 50k lines of code to TS was painful, but worth every second.",
      tech: ['TypeScript', 'Jest', 'CI/CD']
    }
  },
  {
    id: 'lead-role',
    year: '2020',
    title: 'Tech Lead @ Innovate',
    description: 'Leading a team of 5. Architecture & Mentorship.',
    type: 'job',
    x: 55,
    y: 40,
    details: {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80',
      stats: [{ label: 'Team Size', value: '6' }, { label: 'Sprints', value: '52' }]
    }
  },
  {
    id: 'award',
    year: '2022',
    title: 'Hackathon Winner',
    description: 'Global FinTech Hackathon. 1st Place.',
    type: 'award',
    x: 68,
    y: 75,
    details: {
      quote: "48 hours, no sleep, one killer AI algorithm.",
      image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=500&q=80'
    }
  },
  {
    id: 'senior',
    year: '2024',
    title: 'Senior Engineer @ TechCorp',
    description: 'Architecting high-scale microservices.',
    type: 'job',
    x: 82,
    y: 35,
    details: {
      tech: ['Go', 'Kubernetes', 'System Design'],
      stats: [{ label: 'Users', value: '1M+' }]
    }
  },
  {
    id: 'now',
    year: '2026',
    title: 'You Are Here',
    description: 'Building the future of web.',
    type: 'current',
    x: 95,
    y: 50,
    details: {}
  }
];

// --- Sub Components ---

const DetailModal: React.FC<{ milestone: Milestone | null; onClose: () => void }> = ({ milestone, onClose }) => {
  if (!milestone) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        layoutId={`node-${milestone.id}`}
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden relative z-10 shadow-2xl"
      >
        {milestone.details?.image && (
          <div className="h-48 w-full overflow-hidden relative">
            <img src={milestone.details.image} alt={milestone.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
          </div>
        )}
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-rose-500 font-bold font-mono text-sm">{milestone.year}</span>
              <h3 className="text-2xl font-black text-white">{milestone.title}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <p className="text-neutral-300 leading-relaxed mb-6">{milestone.description}</p>
          
          {milestone.details?.quote && (
            <div className="mb-6 pl-4 border-l-2 border-rose-500 italic text-neutral-400 text-sm">
              "{milestone.details.quote}"
            </div>
          )}

          {milestone.details?.stats && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {milestone.details.stats.map((stat, i) => (
                <div key={i} className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] uppercase text-neutral-500 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {milestone.details?.tech && (
            <div className="flex flex-wrap gap-2">
              {milestone.details.tech.map(t => (
                <span key={t} className="px-2 py-1 bg-rose-500/10 text-rose-500 text-xs rounded border border-rose-500/20">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Parallax Transforms
  const xMovement = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const skyColor = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.6, 1], 
    ["#0f172a", "#1e1b4b", "#312e81", "#4c0519"] // Slate -> Indigo -> Purple -> Rose Dark
  );
  
  const mountainX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const cityX = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // Auto-scroll logic
  useEffect(() => {
    let animationFrame: number;
    if (isAutoPlaying) {
      const scroll = () => {
        window.scrollBy(0, 5); // Speed
        animationFrame = requestAnimationFrame(scroll);
      };
      scroll();
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isAutoPlaying]);

  // Generate SVG Path
  const generatePath = () => {
    let path = `M 0,${window.innerHeight / 2}`;
    MILESTONES.forEach((m, i) => {
      // Calculate pixel positions roughly based on percentage
      const targetX = (m.x / 100) * (window.innerWidth * 5); // Total width is roughly 5 screens
      const targetY = (m.y / 100) * window.innerHeight;
      
      // Add bezier curve
      path += ` S ${targetX - 200},${targetY} ${targetX},${targetY}`;
    });
    return path;
  };

  return (
    <div ref={containerRef} className="relative bg-neutral-950 min-h-[600vh] hidden md:block">
       {/* Fixed Viewport */}
       <div className="fixed inset-0 overflow-hidden">
          {/* Dynamic Sky */}
          <motion.div style={{ backgroundColor: skyColor }} className="absolute inset-0 transition-colors duration-1000" />
          
          {/* Stars */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          
          {/* Parallax Background Layers */}
          <motion.div style={{ x: mountainX }} className="absolute bottom-0 left-0 w-[200%] h-[60%] opacity-30 pointer-events-none">
             {/* Abstract Mountains SVG */}
             <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full fill-neutral-900">
               <path d="M0,300 L0,150 L200,50 L400,200 L600,80 L800,180 L1000,100 L1000,300 Z" />
             </svg>
          </motion.div>
          
          <motion.div style={{ x: cityX }} className="absolute bottom-0 left-0 w-[300%] h-[40%] opacity-60 pointer-events-none">
             {/* Abstract City SVG */}
             <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full fill-neutral-800">
               <path d="M0,200 L50,100 L100,200 L150,50 L200,200 L250,120 L300,200 L350,80 L400,200 L1000,200 Z" />
             </svg>
          </motion.div>

          {/* The Scrolling World */}
          <motion.div 
            style={{ x: xMovement }} 
            className="absolute top-0 left-0 h-full w-[600vw] flex items-center"
          >
             {/* The Path Line */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <path 
                  d={generatePath()} 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="4" 
                  strokeDasharray="10 10" 
                  className="animate-pulse"
                />
             </svg>

             {/* Milestones */}
             {MILESTONES.map((milestone) => (
                <div 
                  key={milestone.id}
                  className="absolute"
                  style={{ 
                    left: `${milestone.x}%`, 
                    top: `${milestone.y}%` 
                  }}
                >
                  <motion.button
                    layoutId={`node-${milestone.id}`}
                    onClick={() => setSelectedMilestone(milestone)}
                    whileHover={{ scale: 1.2 }}
                    className={`relative z-20 flex flex-col items-center group cursor-pointer`}
                  >
                     {/* Node Graphic */}
                     <div className={`
                       w-12 h-12 rounded-full border-4 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors duration-300
                       ${milestone.type === 'start' ? 'bg-white border-white text-black' : ''}
                       ${milestone.type === 'job' ? 'bg-neutral-900 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white' : ''}
                       ${milestone.type === 'project' ? 'bg-neutral-900 border-green-500 text-green-500 hover:bg-green-500 hover:text-white' : ''}
                       ${milestone.type === 'award' ? 'bg-neutral-900 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white' : ''}
                       ${milestone.type === 'skill' ? 'bg-neutral-900 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white' : ''}
                       ${milestone.type === 'current' ? 'bg-rose-600 border-rose-500 text-white animate-pulse' : ''}
                     `}>
                        {milestone.type === 'start' && <Star size={20} fill="black" />}
                        {milestone.type === 'job' && <Briefcase size={20} />}
                        {milestone.type === 'project' && <Code2 size={20} />}
                        {milestone.type === 'award' && <Award size={20} />}
                        {milestone.type === 'skill' && <Zap size={20} />}
                        {milestone.type === 'current' && <MapPin size={20} />}
                     </div>

                     {/* Label (Always visible on hover or proximity) */}
                     <div className="absolute top-full mt-4 text-center w-48 opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="text-xs font-bold font-mono text-neutral-400 mb-1">{milestone.year}</div>
                        <div className="text-sm font-bold text-white bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                          {milestone.title}
                        </div>
                     </div>
                  </motion.button>
                  
                  {/* Decorative Elements specific to nodes */}
                  {milestone.type === 'job' && (
                     <Building className="absolute -bottom-32 left-10 text-neutral-800 w-48 h-48 -z-10 opacity-50" />
                  )}
                  {milestone.type === 'skill' && (
                     <div className="absolute -top-32 -left-10 text-purple-500/20 w-32 h-32 -z-10">
                        <Cpu size={128} />
                     </div>
                  )}
                </div>
             ))}

             {/* The "Now" 3D Setup (Finale) */}
             <div className="absolute left-[92%] top-[30%] w-[500px] h-[500px]" style={{ perspective: '1000px' }}>
                <div className="relative w-full h-full transform transition-transform hover:rotate-y-12" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(10deg) rotateY(-10deg)' }}>
                   {/* Table */}
                   <div className="absolute bottom-0 w-full h-10 bg-neutral-800 rounded shadow-2xl" style={{ transform: 'translateZ(0px)' }} />
                   {/* Monitor */}
                   <div className="absolute bottom-10 left-10 w-64 h-40 bg-neutral-900 border-4 border-neutral-700 rounded-lg flex items-center justify-center overflow-hidden" style={{ transform: 'translateZ(50px)' }}>
                      <div className="w-full h-full bg-black p-2 font-mono text-[6px] text-green-500 leading-tight opacity-70">
                         {Array(20).fill("const future = await build(dreams);").map((s,i) => <div key={i}>{s}</div>)}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-transparent" />
                   </div>
                   {/* Laptop */}
                   <div className="absolute bottom-10 right-20 w-40 h-28 bg-neutral-700 rounded-t-lg transform skew-x-12" style={{ transform: 'translateZ(30px) rotateY(-20deg)' }}>
                      <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-black flex items-center justify-center">
                         <Code2 className="text-rose-500" />
                      </div>
                   </div>
                   {/* Coffee */}
                   <div className="absolute bottom-12 right-10" style={{ transform: 'translateZ(20px)' }}>
                      <Coffee className="text-white" />
                      <div className="absolute -top-4 left-1 w-1 h-4 bg-white/50 blur-sm animate-[ping_2s_infinite]" />
                   </div>
                </div>
                
                {/* Stats Board */}
                <div className="absolute top-0 right-0 p-6 bg-neutral-900/90 backdrop-blur border border-rose-500/30 rounded-xl shadow-[0_0_50px_rgba(244,63,94,0.2)]">
                   <h3 className="text-xl font-black text-white mb-4">CURRENT STATUS</h3>
                   <div className="space-y-3 font-mono text-sm">
                      <div className="flex justify-between gap-8"><span className="text-neutral-500">Exp. Level</span> <span className="text-rose-500">SENIOR</span></div>
                      <div className="flex justify-between gap-8"><span className="text-neutral-500">Projects</span> <span className="text-white">150+</span></div>
                      <div className="flex justify-between gap-8"><span className="text-neutral-500">Focus</span> <span className="text-white">Scalability</span></div>
                      <div className="h-1 w-full bg-neutral-800 mt-2 rounded-full overflow-hidden">
                         <div className="h-full bg-rose-500 w-[95%] animate-pulse" />
                      </div>
                      <div className="text-center text-[10px] text-neutral-600 mt-2">SYSTEM OPTIMIZED</div>
                   </div>
                </div>
             </div>
          </motion.div>
       </div>

       {/* HUD / Controls */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/80 backdrop-blur px-6 py-3 rounded-full border border-neutral-800">
          <Breadcrumbs />
          <div className="h-4 w-px bg-neutral-700 mx-2" />
          <div className="flex items-center gap-2 text-xs text-neutral-400">
             <span>Scroll to Explore</span>
             <ArrowRight size={14} className="animate-bounce-x" />
          </div>
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full ${isAutoPlaying ? 'bg-rose-500 text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
          >
             {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
       </div>

       {/* Mini Map */}
       <div className="fixed top-24 right-8 z-40 w-48 h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div style={{ width: scrollYProgress.get() * 100 + '%' }} className="h-full bg-rose-500" />
       </div>

       <AnimatePresence>
         {selectedMilestone && <DetailModal milestone={selectedMilestone} onClose={() => setSelectedMilestone(null)} />}
       </AnimatePresence>
    </div>
  );
};

// --- Mobile Fallback (Vertical) ---
const MobileAbout: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  return (
    <div className="pt-24 min-h-screen bg-neutral-950 pb-20">
       <div className="max-w-xl mx-auto px-6">
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
             <h1 className="text-4xl font-black text-white mb-2">My Journey</h1>
             <p className="text-neutral-400">A timeline of growth, challenges, and code.</p>
          </motion.div>

          {/* Interactive Vertical Timeline */}
          <div className="relative pl-6 space-y-10">
             {/* Timeline Line */}
             <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 via-neutral-800 to-neutral-900" />

             {MILESTONES.map((milestone, idx) => (
               <motion.div 
                 key={milestone.id}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="relative"
               >
                  {/* Timeline Node */}
                  <div className={`absolute -left-[23px] top-4 w-4 h-4 rounded-full border-2 border-neutral-950 z-10 ${
                    milestone.type === 'current' ? 'bg-rose-500 animate-pulse' : 'bg-neutral-800'
                  }`} />
                  
                  <div 
                    onClick={() => setSelectedMilestone(milestone)}
                    className="bg-neutral-900/50 backdrop-blur border border-neutral-800 p-6 rounded-xl hover:border-rose-500/50 hover:bg-neutral-900 transition-all cursor-pointer group active:scale-95 duration-200"
                  >
                     <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                             <Calendar size={14} className="text-rose-500" />
                             <span className="text-rose-500 font-bold text-xs tracking-widest">{milestone.year}</span>
                        </div>
                        {milestone.type === 'award' && <Award size={16} className="text-yellow-500" />}
                        {milestone.type === 'current' && <MapPin size={16} className="text-rose-500" />}
                     </div>
                     
                     <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-500 transition-colors">
                        {milestone.title}
                     </h3>
                     <p className="text-sm text-neutral-400 leading-relaxed mb-4">{milestone.description}</p>
                     
                     {/* Tags preview */}
                     {milestone.details?.tech && (
                         <div className="flex flex-wrap gap-2">
                             {milestone.details.tech.slice(0, 3).map((t, i) => (
                                 <span key={i} className="text-[10px] px-2 py-1 rounded bg-neutral-950 text-neutral-500 border border-neutral-800">
                                     {t}
                                 </span>
                             ))}
                         </div>
                     )}
                     
                     <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={16} className="text-rose-500" />
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>
       </div>
       <AnimatePresence>
         {selectedMilestone && <DetailModal milestone={selectedMilestone} onClose={() => setSelectedMilestone(null)} />}
       </AnimatePresence>
    </div>
  );
};

// Wrapper to switch views
const AboutPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileAbout /> : <About />;
};

export default AboutPage;
