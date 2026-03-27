import { motion } /* eslint-disable-line no-unused-vars */ from 'framer-motion';
import { Users, Layout, MapPin, Coffee, Volume2, ShieldCheck } from 'lucide-react';

const features = [
  { icon: <Users size={24} />, title: "Capacity", description: "Host up to 1000 guests comfortably in our grand hall." },
  { icon: <Layout size={24} />, title: "Flexible Layouts", description: "Customizable floor plans for banquets, theatre, or exhibitions." },
  { icon: <Coffee size={24} />, title: "Premium Catering", description: "In-house culinary experts providing diverse gourmet menus." },
  { icon: <Volume2 size={24} />, title: "A/V Equipment", description: "State-of-the-art acoustics and high-resolution displays." },
  { icon: <MapPin size={24} />, title: "Prime Location", description: "Easily accessible with ample VIP and valet parking." },
  { icon: <ShieldCheck size={24} />, title: "Security", description: "24/7 surveillance and trained personnel for peace of mind." },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-primary-600 font-semibold tracking-wider uppercase mb-2"
          >
            About Elegance Hall
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            The Perfect Canvas For Your Vision
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Elegance Hall is a modern masterpiece designed to accommodate your grandest events. From intimate gatherings to lavish celebrations, our versatile spaces and dedicated team ensure your event is executed flawlessly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
