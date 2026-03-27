import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } /* eslint-disable-line no-unused-vars */ from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { getWhatsAppLink } from '../utils/whatsapp';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/#pricing' },
  { name: 'Availability', path: '/#calendar' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBooking = () => {
    window.open(getWhatsAppLink(), '_blank');
  };

  const navClass = scrolled || !isHome ? 'glass py-3' : 'bg-transparent py-5';
  const textClass = scrolled || !isHome ? 'text-slate-700' : 'text-slate-100 drop-shadow-md';
  const logoTextClass = scrolled || !isHome ? 'text-primary-900' : 'text-white drop-shadow-md';
  const mobileMenuBtnClass = scrolled || !isHome ? 'text-slate-900' : 'text-white';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className={`text-2xl font-bold tracking-tighter ${logoTextClass}`}>
               Elegance<span className="text-primary-500">Hall</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                link.path.includes('#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary-500 ${textClass}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary-500 ${textClass}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <button
                onClick={handleBooking}
                className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-full font-medium transition-transform transform hover:scale-105 shadow-md"
              >
                Booking
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${mobileMenuBtnClass}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glass-dark text-white border-none"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
              {navLinks.map((link) => (
                link.path.includes('#') ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleBooking();
                }}
                className="w-full text-left px-3 py-3 mt-4 text-base font-medium bg-primary-600 hover:bg-primary-500 rounded-md transition-colors"
              >
                Booking Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
