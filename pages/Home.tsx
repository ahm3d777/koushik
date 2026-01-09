
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Terminal, Layers, Download, Calendar } from 'lucide-react';
import CinematicProjectCard from '../components/CinematicProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import ParticlesBackground from '../components/ParticlesBackground';
import SpotlightCard from '../components/SpotlightCard';
import GeometricSculpture from '../components/GeometricSculpture';
import LiveCodeDemo from '../components/LiveCodeDemo';
import SectionMinimap, { Section } from '../components/SectionMinimap';
import { PROJECTS, TESTIMONIALS, ARTICLES } from '../constants';
import { Project } from '../types';

const Home: React.FC = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const latestArticles = ARTICLES.slice(0, 2);

  useEffect(() => {
    // Fade out the scroll indicator after 3 seconds (plus delay for initial load animation)
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 4000); // 1s intro delay + 3s visibility
    return () => clearTimeout(timer);
  }, []);

  const handleScrollClick = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections: Section[] = [
    { id: 'hero', label: 'Intro' },
    { id: 'stats', label: 'Impact' },
    { id: 'demo', label: 'Code' },
    { id: 'work', label: 'Work' },
    { id: 'articles', label: 'Writing' },
    { id: 'skills', label: 'Skills' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'cta', label: 'Contact' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SectionMinimap sections={sections} />
      
      {/* Expanded Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1]" />
        
        {/* Particle System */}
        <div className="absolute inset-0 z-[2]">
            <ParticlesBackground />
        </div>

        {/* Blobs - adjusted for mobile */}
        <div className="absolute top-1/4 -left-20 w-48 h-48 md:w-72 md:h-72 bg-rose-500/20 rounded-full blur-[80px] md:blur-[100px] animate-blob z-[3]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-[80px] md:blur-[100px] animate-blob animation-delay-2000 z-[3]" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-rose-500 font-medium tracking-[0.2em] uppercase text-xs md:text-sm mb-4"
              >
                Senior Software Engineer
              </motion.h2>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-none mb-4 tracking-tighter">
                KOUSHIK
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-3xl text-neutral-400 font-light leading-tight"
              >
                Building scalable solutions that move <span className="text-white font-semibold">businesses forward</span>.
              </motion.p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-neutral-400 text-base md:text-lg max-w-lg leading-relaxed mx-auto lg:mx-0"
            >
              I craft high-performance web applications, architect robust backend systems, 
              and lead engineering teams. With 10+ years in the industry, I specialize in 
              turning complex problems into elegant solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col md:flex-row flex-wrap gap-4 justify-center lg:justify-start"
            >
              <NavLink
                to="/work"
                className="group relative px-8 py-4 bg-rose-600 text-white rounded-full font-bold overflow-hidden shadow-lg shadow-rose-500/25 w-full md:w-auto"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center">
                  Explore My Work <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </NavLink>
              <div className="flex gap-4 w-full md:w-auto">
                <NavLink
                  to="/contact"
                  className="flex-1 px-8 py-4 border border-neutral-700 text-white rounded-full font-bold hover:bg-neutral-900 transition-colors text-center"
                >
                  Let's Connect
                </NavLink>
                <button className="px-6 py-4 border border-neutral-700 rounded-full text-neutral-400 hover:text-white hover:border-white transition-colors flex items-center justify-center" title="Download CV">
                  <Download size={20} />
                </button>
              </div>
            </motion.div>
            
            {/* Command Palette Hint */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="hidden md:flex items-center gap-2 text-sm text-neutral-500"
            >
              <span>Press</span>
              <kbd className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-xs font-mono">⌘ K</kbd>
              <span>to navigate</span>
            </motion.div>
          </div>

          {/* Abstract Visual - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="hidden lg:flex items-center justify-center relative"
          >
             <GeometricSculpture />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                opacity: { duration: 0.8 },
                y: { duration: 0.8 }
              }}
              onClick={handleScrollClick}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-3 group"
            >
              {/* Mouse Icon */}
              <div className="w-[30px] h-[50px] rounded-full border-2 border-neutral-400/50 flex justify-center pt-2 group-hover:border-rose-500 transition-colors duration-300 bg-neutral-950/20 backdrop-blur-sm">
                <motion.div 
                  animate={{ 
                    y: [0, 15],
                    opacity: [1, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeOut" 
                  }}
                  className="w-1 h-2 bg-rose-500 rounded-full"
                />
              </div>
              {/* Text */}
              <span className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300 font-medium">
                Scroll to explore
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* STATS STRIP */}
      <div id="stats" ref={nextSectionRef} className="border-y border-neutral-800 bg-neutral-900/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8"
          >
            {[
              { val: '10+', label: 'Years Experience' },
              { val: '150+', label: 'Projects Completed' },
              { val: '500k+', label: 'Lines of Code' },
              { val: '25+', label: 'Technologies' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.val}</div>
                <div className="text-xs text-neutral-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* LIVE CODE DEMO */}
      <section id="demo" className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Clean Code. <br/><span className="text-rose-500">Elegant Solutions.</span></h2>
              <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed">
                I believe that code should be as readable as prose. My development philosophy centers on creating 
                maintainable, self-documenting systems that scale effortlessly. 
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Type-safe architectures with TypeScript',
                  'Component-driven development',
                  'Performance-first mindset',
                  'Automated testing & CI/CD'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-neutral-300">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <NavLink to="/work" className="text-rose-500 font-bold hover:text-white transition-colors flex items-center">
                 View Technical Case Studies <ArrowRight size={18} className="ml-2" />
              </NavLink>
           </motion.div>
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
           >
              <LiveCodeDemo />
           </motion.div>
        </div>
      </section>

      {/* FEATURED WORK - CINEMATIC CARDS */}
      <section id="work" className="py-16 md:py-24 bg-neutral-950 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Featured Work</h2>
              <p className="text-neutral-400 max-w-xl">
                A selection of projects that demonstrate ability to solve complex problems at scale.
              </p>
            </div>
            <NavLink to="/work" className="hidden md:flex items-center text-rose-500 font-bold hover:text-white transition-colors">
              View All Projects <ArrowRight size={20} className="ml-2" />
            </NavLink>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <CinematicProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject} 
              />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <NavLink to="/work" className="inline-flex items-center text-rose-500 font-bold">
              View All Projects <ArrowRight size={20} className="ml-2" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section id="articles" className="py-16 md:py-24 bg-neutral-900 border-t border-neutral-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Latest Insights</h2>
              <p className="text-neutral-400">Thoughts on engineering, design, and product.</p>
            </div>
            <NavLink to="/articles" className="hidden md:flex items-center text-rose-500 font-bold hover:text-white transition-colors">
              Read All Articles <ArrowRight size={20} className="ml-2" />
            </NavLink>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {latestArticles.map((article) => (
              <SpotlightCard key={article.id} className="group">
                <div className="p-8 cursor-pointer">
                  <div className="flex justify-between items-center mb-4 text-xs text-neutral-500">
                    <span className="text-rose-500 font-bold">{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-rose-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-neutral-400 mb-6 line-clamp-2">{article.excerpt}</p>
                  <span className="flex items-center text-sm font-bold text-white">
                    Read More <ArrowRight size={16} className="ml-2" />
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <NavLink to="/articles" className="inline-flex items-center text-rose-500 font-bold hover:text-white transition-colors">
              Read All Articles <ArrowRight size={20} className="ml-2" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* SKILLS SNAPSHOT */}
      <section id="skills" className="py-16 md:py-24 bg-neutral-950 border-t border-neutral-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Technical Expertise</h2>
            <p className="text-neutral-400">The tools I wield to build excellence.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Code size={24} />,
                title: 'Frontend Development',
                desc: 'Building responsive, accessible, and performant user interfaces.',
                tech: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux']
              },
              {
                icon: <Terminal size={24} />,
                title: 'Backend Engineering',
                desc: 'Designing scalable APIs and robust server-side architectures.',
                tech: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis']
              },
              {
                icon: <Layers size={24} />,
                title: 'Cloud & DevOps',
                desc: 'Deploying and managing infrastructure for high availability.',
                tech: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']
              }
            ].map((skill, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="h-full"
              >
                <SpotlightCard className="h-full p-8 group transition-colors">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{skill.title}</h3>
                  <p className="text-neutral-400 text-sm mb-6">{skill.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.tech.map(s => (
                      <span key={s} className="px-2 py-1 bg-neutral-900 text-xs text-neutral-300 rounded border border-neutral-800">{s}</span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-16 md:py-24 bg-neutral-900 border-t border-neutral-800 relative overflow-hidden scroll-mt-20">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-900/5 to-transparent" />
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-white mb-16 text-center"
            >
              Kind Words
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {TESTIMONIALS.map((t) => (
                <motion.div key={t.id} variants={itemVariants} className="bg-neutral-950 p-8 rounded-xl border border-neutral-800 relative hover:border-neutral-700 transition-colors">
                  <div className="text-rose-500 text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
                  <p className="text-neutral-300 mb-6 relative z-10 italic leading-relaxed">
                    {t.text}
                  </p>
                  <div className="flex items-center">
                    <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full mr-4 grayscale" />
                    <div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                      <div className="text-neutral-500 text-xs">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
         </div>
      </section>

      {/* CTA SECTION */}
      <section id="cta" className="py-24 md:py-32 bg-neutral-950 relative border-t border-neutral-800 scroll-mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Ready to Build Something <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Exceptional?</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Whether you need a technical partner for your next big idea or an experienced leader for your engineering team, I'm just a message away.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <NavLink
              to="/contact"
              className="w-full md:w-auto px-10 py-5 bg-rose-600 text-white rounded-full font-bold text-lg hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20 transform hover:-translate-y-1"
            >
              Start a Conversation
            </NavLink>
            <div className="flex items-center gap-4 text-neutral-400">
              <span className="h-px w-10 bg-neutral-700"></span>
              <span>or</span>
              <span className="h-px w-10 bg-neutral-700"></span>
            </div>
            <button className="w-full md:w-auto px-10 py-5 border border-neutral-600 text-white rounded-full font-bold text-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 transform hover:-translate-y-1">
              <Calendar size={20} /> Schedule a Call
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
