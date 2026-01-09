
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import SkillGraph from '../components/SkillGraph';
import SpotlightCard from '../components/SpotlightCard';
import GithubGraph from '../components/GithubGraph';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  Shield, MessageCircle, Zap, Target, 
  Github, Users, Book, Mic, 
  Coffee, Globe, Camera, Award, Download, FileText
} from 'lucide-react';

const About: React.FC = () => {
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

  const VALUES = [
    { title: 'Code Quality', desc: 'Clean, maintainable, and well-tested code is non-negotiable. I leave codebases better than I found them.', icon: <Shield size={32} /> },
    { title: 'Communication', desc: 'Technical excellence means nothing if you can\'t explain it. I bridge the gap between engineering and product.', icon: <MessageCircle size={32} /> },
    { title: 'Continuous Learning', desc: 'Technology evolves, so must we. I stay curious, humble, and constantly expand my toolkit.', icon: <Zap size={32} /> },
    { title: 'Impact Driven', desc: 'I focus on outcomes, not just output. Building features that users actually need and love.', icon: <Target size={32} /> }
  ];

  const INTERESTS = [
    { title: 'Open Source', desc: 'Contributor to React ecosystem', icon: <Github size={24} /> },
    { title: 'Mentoring', desc: 'Guiding junior developers', icon: <Users size={24} /> },
    { title: 'Technical Writing', desc: 'Publishing on Dev.to & Medium', icon: <Book size={24} /> },
    { title: 'Public Speaking', desc: 'Tech conferences & meetups', icon: <Mic size={24} /> }
  ];

  const FACTS = [
    { label: 'Coffee / Year', value: '3,200+', icon: <Coffee size={20} className="text-rose-500" /> },
    { label: 'Countries Visited', value: '12', icon: <Globe size={20} className="text-blue-500" /> },
    { label: 'Favorite Hobby', value: 'Photography', icon: <Camera size={20} className="text-purple-500" /> },
    { label: 'Books Read / Year', value: '24', icon: <Book size={20} className="text-yellow-500" /> }
  ];

  return (
    <div className="pt-24 min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs />
      </div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-12 mb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Image Container */}
            <div className="relative group max-w-md mx-auto">
               {/* Decorative Border */}
               <div className="absolute -inset-1 bg-gradient-to-tr from-neutral-800 via-rose-900/50 to-neutral-800 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
               
               <div className="relative rounded-lg overflow-hidden bg-neutral-900 ring-1 ring-white/10 aspect-[4/5]">
                 {/* Image */}
                 <img 
                   src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                   alt="Koushik Profile" 
                   className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-700 ease-out"
                 />
                 
                 {/* Quote Overlay */}
                 <div className="absolute bottom-6 left-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-px w-12 bg-rose-500 mb-4"></div>
                    <p className="text-white/90 font-serif italic text-lg leading-relaxed drop-shadow-lg">
                      "Surrender is an outcome far worse than defeat."
                    </p>
                 </div>

                 {/* Dark Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
                KOUSHIK
              </h1>
              <h2 className="text-xl text-rose-500 font-medium tracking-wide">SOFTWARE ENGINEER & ARCHITECT</h2>
            </div>

            <div className="space-y-6 text-neutral-400 leading-relaxed text-lg">
              <p>
                My journey into software development started with a simple curiosity: how do things work? 
                I wrote my first line of code 10 years ago, and I immediately fell in love with the power to create.
              </p>
              <p>
                Over the past decade, I've had the privilege of working with scrappy startups and established enterprises. 
                I've worn every hat imaginable, from fixing CSS bugs at 2 AM to architecting systems that serve millions.
              </p>
              <p>
                I believe that great software is about more than elegant code. It's about empathy for the user, 
                clear communication, and building things that actually matter.
              </p>
            </div>
            
            <div className="pt-6 grid grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 border border-neutral-800 bg-neutral-900/50 rounded-lg hover:border-rose-500/50 transition-colors group"
              >
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-rose-500 transition-colors">10+</div>
                <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Years Experience</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 border border-neutral-800 bg-neutral-900/50 rounded-lg hover:border-rose-500/50 transition-colors group"
              >
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-rose-500 transition-colors">150+</div>
                <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Projects Delivered</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* VALUES SECTION */}
      <section className="py-20 bg-neutral-900 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-black text-white mb-4">What Drives Me</h2>
            <p className="text-neutral-400">The core philosophy behind every line of code.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALUES.map((val, idx) => (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <SpotlightCard className="h-full p-8 group">
                  <div className="mb-6 text-rose-500 bg-rose-500/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{val.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SKILL GRAPH */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-black text-white mb-4">Technical Ecosystem</h2>
            <p className="text-neutral-400">An interactive map of my skills and their relationships.</p>
          </motion.div>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl">
              <SkillGraph />
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white mb-16 text-center"
          >
            Professional Journey
          </motion.h2>
          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-12 border-l border-neutral-800 group"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-neutral-900 transition-colors duration-300 ${index === 0 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-neutral-600 group-hover:bg-rose-400'}`} />
                
                <div className="mb-2 flex flex-col md:flex-row md:items-center justify-between">
                  <h3 className="text-2xl font-bold text-white group-hover:text-rose-500 transition-colors">{exp.role}</h3>
                  <span className="text-rose-500 font-mono text-sm bg-rose-500/10 px-3 py-1 rounded border border-rose-500/20">{exp.period}</span>
                </div>
                
                <div className="text-lg text-neutral-300 font-medium mb-4">{exp.company}</div>
                <p className="text-neutral-400 mb-6 leading-relaxed">{exp.description}</p>
                
                <ul className="space-y-3">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND CODE & FUN FACTS */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Beyond Code */}
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={containerVariants}
            >
              <h2 className="text-3xl font-black text-white mb-8">Beyond Code</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {INTERESTS.map((interest, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-rose-500/50 transition-colors group">
                    <div className="text-neutral-400 group-hover:text-rose-500 transition-colors mb-4">{interest.icon}</div>
                    <h3 className="text-white font-bold mb-2">{interest.title}</h3>
                    <p className="text-sm text-neutral-500">{interest.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Added Github Graph here as an interactive element */}
              <GithubGraph />
            </motion.div>

            {/* Fun Facts */}
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={containerVariants}
            >
              <h2 className="text-3xl font-black text-white mb-8">Getting to Know Me</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {FACTS.map((fact, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="flex items-center p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center mr-4 shadow-inner">
                      {fact.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">{fact.value}</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider font-bold">{fact.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MEDIA KIT CTA */}
      <section className="py-20 bg-neutral-900 border-t border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-600/5" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-3xl font-black text-white mb-6">For Recruiters & Press</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Need a bio, high-res headshots, or my full resume? I've packaged everything into a neat little bundle for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-950 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                <Download size={20} /> Download Resume
             </button>
             <button className="flex items-center justify-center gap-2 px-8 py-4 bg-neutral-800 text-white rounded-full font-bold border border-neutral-700 hover:bg-neutral-700 transition-colors">
                <FileText size={20} /> Get Media Kit
             </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
