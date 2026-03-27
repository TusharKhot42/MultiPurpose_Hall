import { motion } from 'framer-motion';
import { getWhatsAppLink } from '../utils/whatsapp';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Empty Hall',
    price: 'Custom',
    description: 'Perfect for those who have their own decorators and caterers. Just the magnificent space.',
    features: ['Access to main hall for 12 hours', 'Basic house lighting', 'Cleaning staff', 'On-site manager', 'Ample parking for guests'],
    highlight: false
  },
  {
    name: 'Wedding Package',
    price: 'Premium',
    description: 'A complete end-to-end solution for your special day. Elegance and peace of mind.',
    features: ['Everything in Empty Hall', 'Premium floral decorations', 'Bridal suite access', 'State-of-the-art A/V system', 'Premium seating & tables'],
    highlight: true
  },
  {
    name: 'Corporate Event',
    price: 'Professional',
    description: 'Tailored for seminars, product launches, and company annual gatherings.',
    features: ['Everything in Empty Hall', 'High-speed dedicated Wi-Fi', 'HD Projector & multiple screens', 'Podium with mics', 'Coffee break arrangements'],
    highlight: false
  }
];

export default function Pricing() {
  const handleBooking = (pkgName) => {
    const defaultMessage = `Hi, I'm interested in booking the "${pkgName}" for an upcoming event. Could you provide more details?`;
    const phone = '919876543210'; // using a stub or you can extract from whatsapp utils if needed. 
    // wait, getWhatsAppLink provides a generic one. Let's just use it and append text if possible, but actually getWhatsAppLink in utils might not accept params.
    window.open(`https://wa.me/919420448135?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  return (
    <section className="py-24 bg-slate-50" id="pricing">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Packages & Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Whether you need a blank canvas or a fully managed luxury experience, we have the perfect package for your event.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`relative rounded-3xl p-8 shadow-xl ${
                pkg.highlight 
                  ? 'bg-gradient-to-br from-red-950/90 to-orange-900/90 text-white transform md:-translate-y-4 border border-orange-500/30' 
                  : 'bg-white text-slate-900 border border-slate-100'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${pkg.highlight ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
              <div className={`text-3xl font-black mb-4 ${pkg.highlight ? 'text-orange-300' : 'text-primary-600'}`}>{pkg.price}</div>
              <p className={`mb-8 ${pkg.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{pkg.description}</p>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 rounded-full p-1 ${pkg.highlight ? 'bg-orange-500/20 text-orange-300' : 'bg-primary-50 text-primary-500'}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className={pkg.highlight ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleBooking(pkg.name)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  pkg.highlight 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-primary-50 hover:bg-primary-100 text-primary-700'
                }`}
              >
                Inquire Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
