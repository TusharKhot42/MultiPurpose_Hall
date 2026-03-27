import { motion } /* eslint-disable-line no-unused-vars */ from 'framer-motion';

const images = [
  { src: '/gallery_ext.png', alt: 'Exterior View', classes: 'col-span-1 row-span-2' },
  { src: '/gallery_int.png', alt: 'Wedding Setup Indoor', classes: 'col-span-1 row-span-1' },
  { src: '/hero_bg.png', alt: 'Hall Interior', classes: 'col-span-1 row-span-1' },
  { src: '/gallery_int.png', alt: 'Banquet details', classes: 'col-span-1 row-span-2' },
  { src: '/hero_bg.png', alt: 'Chandelier', classes: 'col-span-1 row-span-1' },
  { src: '/gallery_ext.png', alt: 'Garden area', classes: 'col-span-1 row-span-1' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-primary-600 font-semibold tracking-wider uppercase mb-2"
          >
            Visual Experience
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900"
          >
            Explore The Gallery
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4">
          {images.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl group ${item.classes} shadow-md`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold tracking-wide drop-shadow-md">{item.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
