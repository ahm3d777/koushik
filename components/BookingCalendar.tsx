
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  // Mock dates for next 5 days
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      fullDate: d,
      available: i !== 2 // Mock unavailable day
    };
  });

  const timeSlots = ['09:00 AM', '10:00 AM', '02:00 PM', '04:30 PM'];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
               <Calendar className="text-rose-500" size={24} />
               Schedule a Call
            </h2>
            <p className="text-neutral-400 text-sm mt-1">Book a 30-minute discovery chat.</p>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                <ChevronLeft size={16} />
             </button>
             <button className="p-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                <ChevronRight size={16} />
             </button>
          </div>
       </div>

       {/* Date Selection */}
       <div className="grid grid-cols-5 gap-2 md:gap-4 mb-8">
          {dates.map((d, i) => (
             <button
               key={i}
               disabled={!d.available}
               onClick={() => setSelectedDate(i)}
               className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all duration-300 ${
                 !d.available 
                    ? 'opacity-30 border-neutral-800 cursor-not-allowed bg-neutral-900' 
                    : selectedDate === i 
                       ? 'border-rose-500 bg-rose-500/10 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]' 
                       : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-600 hover:bg-neutral-900'
               }`}
             >
                <span className="text-xs font-bold uppercase mb-1">{d.day}</span>
                <span className="text-xl font-black">{d.date}</span>
             </button>
          ))}
       </div>

       {/* Time Slots (Conditionally Rendered) */}
       {selectedDate !== null && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-neutral-800 pt-6"
          >
             <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Clock size={14} className="text-rose-500" />
                Available Times (UTC+6)
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((time, i) => (
                   <button 
                     key={i}
                     className="py-2 px-4 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-300 hover:border-rose-500 hover:text-white transition-colors text-center focus:ring-1 focus:ring-rose-500 focus:text-white"
                   >
                     {time}
                   </button>
                ))}
             </div>
          </motion.div>
       )}
    </div>
  );
};

export default BookingCalendar;
