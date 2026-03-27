import { motion } /* eslint-disable-line no-unused-vars */ from 'framer-motion';
import { getWhatsAppLink } from '../utils/whatsapp';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function Hero() {
  const handleBookingClick = () => {
    window.open(getWhatsAppLink(), '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={`${import.meta.env.BASE_URL}elegant_hero.jpg`}
          alt="Elegance Hall Interior"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
        {/* Subtle animated gradient glow */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,theme(colors.primary.500)_0%,transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="text-left w-full lg:w-3/5">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-300 font-medium mb-8 shadow-2xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>Premium Event Destination</span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Unforgettable <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200 drop-shadow-lg">
              Moments
            </span> <br /> 
            Deserve Grand Settings.
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Host your weddings, corporate events, and milestone celebrations in our state-of-the-art multipurpose hall, where elegance meets exceptional service.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button 
              onClick={handleBookingClick}
              className="group relative px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white text-lg font-bold rounded-full shadow-xl shadow-primary-600/30 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <Calendar className="w-5 h-5" />
                Book Your Date
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <Link
              to="/gallery"
              className="group px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-lg font-bold rounded-full backdrop-blur-md transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Explore the Hall
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards right side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden lg:block w-2/5 p-8 bg-gradient-to-br from-red-950/60 to-orange-950/40 border border-orange-500/20 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
           <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  { title: "Capacity up to 1000", desc: "Spacious enough for grand celebrations." },
                  { title: "Premium Catering", desc: "Culinary excellence tailored to you." },
                  { title: "State-of-the-Art A/V", desc: "Immersive sound and lighting." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2.5 shadow-[0_0_8px_rgba(251,146,60,0.8)] flex-shrink-0"></div>
                     <div>
                       <h4 className="text-lg font-semibold text-white leading-tight">{item.title}</h4>
                       <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                     </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm font-medium text-slate-300">Trusted by over <span className="text-primary-400 font-bold text-lg">500+</span> happy clients</p>
              </div>
           </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
