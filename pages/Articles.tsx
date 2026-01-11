import React, { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  Float, 
  Sparkles, 
  AccumulativeShadows, 
  RandomizedLight,
  Environment,
  Center,
  useCursor,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, Tag, X, FlaskConical, Beaker, BookOpen } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { ARTICLES } from '../constants';
import { Article } from '../types';

// --- Utils ---
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Frontend': return '#3b82f6'; // Blue
    case 'Backend': return '#a855f7'; // Purple
    case 'Tutorial': return '#10b981'; // Emerald
    case 'System Design': return '#f43f5e'; // Rose
    default: return '#f59e0b'; // Amber
  }
};

const getLiquidHeight = (readTime: string) => {
  // Extract number from "6 min read" -> 6. Max height 1.5 units.
  const mins = parseInt(readTime) || 5;
  // Map 2min - 15min to 0.3 - 1.4 height
  return Math.min(Math.max((mins / 15) * 1.4, 0.3), 1.4);
};

// --- 3D Components ---

const SpecimenLabel = ({ text, position }: { text: string, position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Label Tag */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.8, 0.6]} />
        <meshBasicMaterial color="#1a1a1a" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.75, 0.55]} />
        <meshBasicMaterial color="black" side={THREE.DoubleSide} />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {text}
      </Text>
    </group>
  );
};

const SpecimenVial: React.FC<{ article: Article, position: [number, number, number], onClick: (a: Article) => void }> = ({ article, position, onClick }) => {
  const [hovered, setHover] = useState(false);
  const liquidHeight = useMemo(() => getLiquidHeight(article.readTime), [article.readTime]);
  const color = useMemo(() => getCategoryColor(article.category), [article.category]);
  const meshRef = useRef<THREE.Group>(null);
  
  useCursor(hovered);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation offset by position to desync
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
      
      // Hover emphasis
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position} 
      onClick={(e) => { e.stopPropagation(); onClick(article); }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Glass Container */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshPhysicalMaterial 
          roughness={0.1} 
          transmission={0.95} 
          thickness={0.5} 
          transparent 
          opacity={0.3}
          color="#ffffff"
        />
      </mesh>

      {/* Cork / Cap */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.2, 32]} />
        <meshStandardMaterial color="#262626" roughness={0.8} />
      </mesh>

      {/* Liquid */}
      <group position={[0, -1 + liquidHeight / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.42, 0.42, liquidHeight, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 0.8 : 0.4}
            transparent 
            opacity={0.9} 
          />
        </mesh>
        
        {/* Bubbles */}
        <Sparkles 
          count={10} 
          scale={[0.3, liquidHeight, 0.3]} 
          size={2} 
          speed={0.4} 
          opacity={0.7} 
          color="#ffffff" 
        />
      </group>

      {/* Category Ring */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Floating Label (Visible on Hover) */}
      <group position={[0, 1.8, 0]} scale={hovered ? 1 : 0}>
         <SpecimenLabel text={article.title} position={[0, 0, 0]} />
      </group>
    </group>
  );
};

const LaboratoryShelf = ({ onSelect }: { onSelect: (a: Article) => void }) => {
  return (
    <group rotation={[0, -Math.PI / 4, 0]}>
       {/* Shelf Structure */}
       <mesh position={[0, -1.2, 0]} receiveShadow>
          <boxGeometry args={[10, 0.2, 4]} />
          <meshStandardMaterial color="#171717" roughness={0.8} metalness={0.5} />
       </mesh>
       <mesh position={[0, -1.2, -2]} receiveShadow>
          <boxGeometry args={[10, 4, 0.2]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.8} />
       </mesh>

       {/* Articles Row */}
       {ARTICLES.map((article, i) => {
         // Grid logic
         const rowSize = 3;
         const x = (i % rowSize - 1) * 2.5;
         const z = Math.floor(i / rowSize) * 1.5;
         
         return (
            <SpecimenVial 
              key={article.id} 
              article={article} 
              position={[x, 0.2, z - 0.5]} 
              onClick={onSelect}
            />
         );
       })}

       {/* Ambient Lab Lighting */}
       <Environment preset="city" />
       <AccumulativeShadows position={[0, -1.19, 0]} frames={100} alphaTest={0.85} scale={20}>
         <RandomizedLight amount={8} radius={4} ambient={0.5} intensity={1} position={[5, 5, -10]} bias={0.001} />
       </AccumulativeShadows>
    </group>
  );
};

// --- Mobile 2D Components ---

const MobileSpecimen: React.FC<{ article: Article, onClick: (a: Article) => void }> = ({ article, onClick }) => {
  const color = getCategoryColor(article.category);
  const liquidHeight = Math.min(parseInt(article.readTime) * 10, 90) + '%'; // 10% to 90%

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      onClick={() => onClick(article)}
      className="flex items-center gap-6 mb-8 cursor-pointer group"
    >
      {/* 2D Vial Graphic */}
      <div className="relative w-12 h-32 bg-neutral-900/50 border border-neutral-700 rounded-b-2xl rounded-t-md overflow-hidden shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow">
        {/* Cap */}
        <div className="absolute top-0 w-full h-2 bg-neutral-600 z-10" />
        {/* Liquid */}
        <motion.div 
           className="absolute bottom-0 w-full opacity-80 backdrop-blur-sm"
           style={{ backgroundColor: color, height: liquidHeight }}
           initial={{ height: 0 }}
           whileInView={{ height: liquidHeight }}
           transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Bubbles */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
             {[1,2,3].map(i => (
               <div key={i} className="absolute bg-white/30 rounded-full w-1 h-1 animate-[ping_2s_infinite]" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, animationDelay: `${i*0.5}s` }} />
             ))}
          </div>
          {/* Surface Line */}
          <div className="absolute top-0 w-full h-1 bg-white/20" />
        </motion.div>
        
        {/* Reflections */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="flex-1 border-b border-neutral-800 pb-8 group-hover:border-rose-500/30 transition-colors">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{article.category}</span>
           <span className="w-1 h-1 rounded-full bg-neutral-600" />
           <span className="text-[10px] text-neutral-500">{article.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-rose-500 transition-colors">{article.title}</h3>
        <p className="text-neutral-400 text-sm line-clamp-2">{article.excerpt}</p>
      </div>
    </motion.div>
  );
};

// --- Article Reader Modal ---

const ArticleReader = ({ article, onClose }: { article: Article | null, onClose: () => void }) => {
  if (!article) return null;
  const color = getCategoryColor(article.category);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      <motion.div 
         layoutId={`article-${article.id}`}
         className="relative w-full h-full md:max-w-4xl md:h-[90vh] bg-neutral-950 md:rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
      >
         {/* Header */}
         <div className="relative h-48 md:h-64 bg-neutral-900 overflow-hidden shrink-0">
             <div className="absolute inset-0 opacity-20" style={{ backgroundColor: color }}>
                {/* Abstract Pattern */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" fillOpacity="0.5" />
                </svg>
             </div>
             
             <button 
               onClick={onClose}
               className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors z-20"
             >
               <X size={20} />
             </button>

             <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                   <span className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs font-bold text-white uppercase tracking-wider backdrop-blur">
                      {article.category}
                   </span>
                   <span className="text-neutral-300 text-xs flex items-center gap-1">
                      <Clock size={12} /> {article.readTime}
                   </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                   {article.title}
                </h2>
             </div>
         </div>

         {/* Content Placeholder */}
         <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-neutral-950">
            <p className="text-lg text-neutral-300 font-medium leading-relaxed mb-8 border-l-4 border-rose-500 pl-4">
               {article.excerpt}
            </p>

            <div className="space-y-6 text-neutral-400 leading-relaxed font-light">
               <p>
                  <span className="text-rose-500 font-mono text-sm">[SYSTEM NOTE: Full article content requires database connection.]</span>
                  <br/><br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               </p>
               <h3 className="text-xl font-bold text-white mt-8 mb-4">The Core Concept</h3>
               <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>
               <div className="my-8 p-6 bg-neutral-900 rounded-lg border border-neutral-800 font-mono text-sm text-neutral-300 overflow-x-auto">
                  <span className="text-rose-500">const</span> <span className="text-blue-400">future</span> = <span className="text-rose-500">await</span> build(<span className="text-green-400">"better_web"</span>);
               </div>
               <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
               </p>
            </div>
         </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---

const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 overflow-hidden">
      
      {/* Header Overlay (Fixed for 3D, Static for 2D) */}
      <div className={`absolute top-0 left-0 right-0 z-10 px-6 pt-24 pointer-events-none ${isMobile ? 'relative mb-8' : ''}`}>
         <div className="max-w-7xl mx-auto pointer-events-auto">
            <Breadcrumbs />
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
               <h1 className="text-5xl md:text-7xl font-black text-white mb-2 flex items-center gap-4">
                  The Lab <FlaskConical className="text-rose-500" size={48} />
               </h1>
               <p className="text-neutral-400 max-w-xl">
                  {isMobile 
                    ? "A collection of experiments and observations." 
                    : "Interactive Knowledge Storage. Select a specimen to analyze."}
               </p>
            </motion.div>
         </div>
      </div>

      {isMobile ? (
        // Mobile View (2D Shelf)
        <div className="px-6 max-w-7xl mx-auto pb-20">
           {ARTICLES.map((article) => (
              <MobileSpecimen key={article.id} article={article} onClick={setSelectedArticle} />
           ))}
        </div>
      ) : (
        // Desktop View (3D Isometric)
        <div className="absolute inset-0 top-0 h-screen w-full">
           <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 10, 10], zoom: 50 }} orthographic>
              <Suspense fallback={null}>
                 <color attach="background" args={['#0a0a0a']} />
                 <group position={[0, -2, 0]}>
                    <Center>
                       <LaboratoryShelf onSelect={setSelectedArticle} />
                    </Center>
                 </group>
                 <OrbitControls 
                    enableZoom={false} 
                    minPolarAngle={Math.PI / 4} 
                    maxPolarAngle={Math.PI / 2.5}
                    minAzimuthAngle={-Math.PI / 3}
                    maxAzimuthAngle={Math.PI / 6}
                 />
              </Suspense>
           </Canvas>
           
           {/* Hint */}
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500 text-xs uppercase tracking-widest animate-pulse pointer-events-none">
              Rotate to Inspect • Click to Read
           </div>
        </div>
      )}

      {/* Reader Modal */}
      <AnimatePresence>
         {selectedArticle && (
            <ArticleReader article={selectedArticle} onClose={() => setSelectedArticle(null)} />
         )}
      </AnimatePresence>
    </div>
  );
};

export default Articles;