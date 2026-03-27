import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    // Weekend logic for demo: mock weekends as booked.
    const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = dateObj.getDay();
    const isBooked = dayOfWeek === 0 || dayOfWeek === 6; // Sun = 0, Sat = 6

    if (!isBooked) {
      const formattedDate = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      const message = `Hi, I'd like to check availability and book the hall for ${formattedDate}.`;
      // Use whatsapp.js utility logic or raw link
      window.open(`https://wa.me/919420448135?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const renderDays = () => {
    const days = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Empty cells before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-4 border border-transparent"></div>);
    }

    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayOfWeek = dateObj.getDay();
      
      // Mock logic: Weekends booked, weekdays available
      const isBooked = dayOfWeek === 0 || dayOfWeek === 6;
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      let statusClass = "bg-white hover:border-primary-400 hover:shadow-md cursor-pointer text-slate-800";
      let statusText = "Available";
      
      if (isPast) {
        statusClass = "bg-slate-50 text-slate-400 cursor-not-allowed";
        statusText = "";
      } else if (isBooked) {
        statusClass = "bg-red-50 text-red-800 cursor-not-allowed opacity-70";
        statusText = "Booked";
      }

      days.push(
        <motion.div
          key={day}
          whileHover={!isBooked && !isPast ? { y: -2 } : {}}
          onClick={() => (!isBooked && !isPast ? handleDateClick(day) : null)}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border border-slate-100 transition-all ${statusClass}`}
        >
          <span className={`text-lg sm:text-2xl font-bold ${isPast ? 'text-slate-400' : 'text-slate-700'}`}>{day}</span>
          {!isPast && (
            <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1 ${
              isBooked ? 'text-red-500/80' : 'text-primary-500'
            }`}>
              {statusText}
            </span>
          )}
        </motion.div>
      );
    }
    return days;
  };

  return (
    <section className="py-24 bg-white" id="calendar">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-medium mb-4"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Plan Ahead</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Check Live Availability
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Discover our open dates. Click on any available date to instantly request a booking via WhatsApp.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-6 sm:p-10"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-3">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevMonth}
                className="p-3 rounded-full bg-slate-50 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-3 rounded-full bg-slate-50 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                aria-label="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {renderDays()}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 bg-slate-50 py-3 px-6 rounded-full inline-flex w-full sm:w-auto mx-auto border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
              <span>Available Date</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span>Booked</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
