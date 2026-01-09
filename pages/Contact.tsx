
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Send } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import WorldMap from '../components/WorldMap';
import EmailReveal from '../components/EmailReveal';
import BookingCalendar from '../components/BookingCalendar';
import SocialFeed from '../components/SocialFeed';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Hiring Opportunity',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formState.email)) newErrors.email = 'Invalid email format';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', subject: 'Hiring Opportunity', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <div className="pt-24 min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumbs />
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column: Info & Interactive Elements */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl font-black text-white mb-6">Get in Touch</h1>
              <p className="text-xl text-neutral-400 leading-relaxed">
                Whether you're hiring, have a project, or just want to say hello, I'd love to hear from you.
                <br />
                <span className="text-rose-500 text-sm font-bold mt-4 block flex items-center gap-2">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   Accepting new projects for Q3 2026
                </span>
              </p>
            </div>

            <EmailReveal />
            <WorldMap />

            <div className="pt-8 border-t border-neutral-800">
              <h3 className="text-white font-bold mb-6">Connect on Social</h3>
              <div className="flex gap-4">
                <a href="#" className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-rose-500 hover:border-rose-500 transition-all transform hover:-translate-y-1">
                  <Github size={24} />
                </a>
                <a href="#" className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-rose-500 hover:border-rose-500 transition-all transform hover:-translate-y-1">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-rose-500 hover:border-rose-500 transition-all transform hover:-translate-y-1">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block">
               <SocialFeed />
            </div>
          </motion.div>

          {/* Right Column: Enhanced Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
             <div className="bg-neutral-900 p-8 md:p-10 rounded-2xl border border-neutral-800 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

                <h2 className="text-2xl font-bold text-white mb-8 relative z-10">Send me a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Name *</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={formState.name}
                          onChange={(e) => setFormState({...formState, name: e.target.value})}
                          className={`w-full bg-neutral-950 border ${errors.name ? 'border-red-500' : 'border-neutral-800'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors`}
                          placeholder="John Doe"
                        />
                        {errors.name && <AlertCircle size={16} className="absolute right-3 top-3.5 text-red-500" />}
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Email *</label>
                      <div className="relative">
                         <input 
                           type="email" 
                           value={formState.email}
                           onChange={(e) => setFormState({...formState, email: e.target.value})}
                           className={`w-full bg-neutral-950 border ${errors.email ? 'border-red-500' : 'border-neutral-800'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors`}
                           placeholder="john@example.com"
                         />
                         {errors.email && <AlertCircle size={16} className="absolute right-3 top-3.5 text-red-500" />}
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Subject</label>
                    <select 
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                      className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors appearance-none"
                    >
                      <option>Hiring Opportunity</option>
                      <option>Freelance Project</option>
                      <option>Consulting</option>
                      <option>Just saying hi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Message *</label>
                    <div className="relative">
                        <textarea 
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                        className={`w-full bg-neutral-950 border ${errors.message ? 'border-red-500' : 'border-neutral-800'} text-white rounded-lg px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors resize-none`}
                        placeholder="Tell me about your project..."
                        ></textarea>
                        {errors.message && <AlertCircle size={16} className="absolute right-3 top-3.5 text-red-500" />}
                    </div>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'submitting' || status === 'success'}
                    type="submit"
                    className={`w-full font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                        status === 'success' 
                        ? 'bg-green-500 text-white cursor-default' 
                        : 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-600/20'
                    }`}
                  >
                    {status === 'submitting' ? (
                        <>Sending...</>
                    ) : status === 'success' ? (
                        <>Message Sent <CheckCircle size={20} /></>
                    ) : (
                        <>Send Message <Send size={18} /></>
                    )}
                  </motion.button>
                  
                  <p className="text-xs text-center text-neutral-600 mt-4">
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                  </p>
                </form>
             </div>
          </motion.div>
        </div>

        {/* Bottom Section: Calendar */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-12"
        >
           <BookingCalendar />
        </motion.div>
        
        {/* Mobile Social Feed (Visible only on small screens) */}
        <div className="lg:hidden">
             <SocialFeed />
        </div>
      </div>
    </div>
  );
};

export default Contact;
