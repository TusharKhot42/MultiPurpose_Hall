import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function BookingModal({ isOpen, onClose, packageName, initialDate = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventDate: initialDate,
    startTime: '',
    endTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Update initialDate if it changes while modal is closed
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, eventDate: initialDate }));
    }
  }, [isOpen, initialDate]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        package: packageName,
        status: 'Pending',
        createdAt: serverTimestamp()
      });

      // 2. Redirect to WhatsApp
      const whatsappNumber = '917666202907'; // Ensure you update with the actual number
      let textMessage = `Hi, my name is ${formData.name}. I'm interested in booking the "${packageName}" for an upcoming event on ${formData.eventDate}.`;
      
      if (formData.startTime && formData.endTime) {
        textMessage += `\nTiming Required: From ${formData.startTime} to ${formData.endTime}.`;
      }
      
      if (formData.message) {
        textMessage += `\n\nAdditional Details: ${formData.message}`;
      }
      
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`, '_blank');
      
      // Cleanup
      onClose();
      setFormData({ name: '', phone: '', eventDate: '', startTime: '', endTime: '', message: '' });
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Book {packageName}</h3>
          <p className="text-slate-500 mb-6 font-medium">Please fill out your details below.</p>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                placeholder="+91..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Event Date</label>
              <input 
                type="date" 
                name="eventDate" 
                required
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Start Time</label>
                <input 
                  type="time" 
                  name="startTime" 
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">End Time</label>
                <input 
                  type="time" 
                  name="endTime" 
                  required
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Message (Optional)</label>
              <textarea 
                name="message" 
                rows="2"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
                placeholder="Any specific requests or questions?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : 'Submit & Continue to WhatsApp'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
