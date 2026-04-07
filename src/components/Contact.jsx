import { motion } /* eslint-disable-line no-unused-vars */ from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { getWhatsAppLink } from '../utils/whatsapp';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    details: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    // Remove any spaces or special characters for validation
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    const message = `Hello, I have a booking enquiry:\n\n*Name:* ${formData.name}\n*Contact Number:* ${formData.phone}\n*Event Details:* ${formData.details}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-primary-600 font-semibold tracking-wider uppercase mb-2">Get In Touch</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Let's Plan Your Perfect Event</h2>
              <p className="text-slate-600 text-lg">
                Contact our expert planners today to discuss your vision, check availability, or schedule a personal tour of Elegance Hall.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Our Location</h4>
                  <p className="text-slate-600">123 Luxury Avenue, Metropolis, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Phone Number</h4>
                  <p className="text-slate-600">+91 76662 02907</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-primary-100 p-3 rounded-full text-primary-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Email Address</h4>
                  <p className="text-slate-600">contact@elegancehall.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="glass-dark p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Booking Enquiry</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Contact Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} pattern="\d{10}" maxLength="10" title="Please enter exactly 10 digits" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="10-digit mobile number" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Event Details</label>
                <textarea rows="4" name="details" value={formData.details} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Date, guest count, event type..." required></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-lg mt-4">
                Chat on WhatsApp
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
