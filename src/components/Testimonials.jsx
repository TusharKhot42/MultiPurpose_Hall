import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Mitchell',
    event: 'Wedding Reception',
    rating: 5,
    text: "Absolutely stunning venue! The lighting and decor exceeded our expectations. The team made our special day completely stress-free and spectacular."
  },
  {
    name: 'David Sharma',
    event: 'Corporate Gala',
    rating: 5,
    text: "We hosted our annual tech gala here. The A/V setup was flawless, and the ambiance provided by the premium hall perfectly matched our brand's luxury identity."
  },
  {
    name: 'Priya & Rahul',
    event: 'Engagement Ceremony',
    rating: 5,
    text: "From the first WhatsApp inquiry to the day of the event, the service was impeccable. The majestic arches and grand setting made our photos look truly royal."
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-medium mb-4"
          >
            <Star className="w-4 h-4 fill-primary-500" />
            <span>Client Stories</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900"
          >
            Loved by Hundreds
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-100 group-hover:text-primary-200 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>
              
              <p className="text-slate-600 text-lg mb-8 leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div>
                <h4 className="font-bold text-slate-900 text-lg">{review.name}</h4>
                <p className="text-primary-600 text-sm font-medium">{review.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
