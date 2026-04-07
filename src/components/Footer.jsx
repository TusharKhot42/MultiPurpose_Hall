export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Elegance<span className="text-primary-500">Hall</span></h3>
            <p className="text-sm text-slate-400 max-w-xs">
              The premier destination for weddings, corporate events, and grand celebrations. Premium facilities tailored to your needs.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#gallery" className="hover:text-primary-400 transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <address className="not-italic text-sm space-y-2 text-slate-400">
              <p>123 Luxury Avenue, Metropolis</p>
              <p>Email: tusharkhot42@gmail.com</p>
              <p>Phone: +91 76662 02907</p>
            </address>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Elegance Hall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
