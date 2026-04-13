import { useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { Search, Calendar, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function CheckStatus() {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const q = query(
        collection(db, 'bookings'), 
        where('phone', '==', phone.trim())
      );
      
      const querySnapshot = await getDocs(q);
      const bookings = [];
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() });
      });

      // Sort by createdAt descending conceptually since Firestore 
      // where + orderby requires index creation which we want to avoid for now.
      bookings.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });

      setResults(bookings);
    } catch (error) {
      console.error("Error searching bookings: ", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const StatusIcon = ({ status }) => {
    if (status === 'Confirmed') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'Rejected') return <XCircle className="w-5 h-5 text-red-500" />;
    return <Clock className="w-5 h-5 text-yellow-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Check Booking Status
          </motion.h1>
          <p className="text-slate-600 text-lg">
            Enter the phone number you used for your inquiry to see its current status.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="search"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-lg"
                  required
                />
              </div>
            </div>
            <div className="flex items-end">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors disabled:opacity-70 h-[60px]"
              >
                {isLoading ? 'Searching...' : 'Check Status'}
              </button>
            </div>
          </form>
        </motion.div>

        {hasSearched && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {results && results.length > 0 ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Your Recent Inquiries</h3>
                {results.map((booking) => (
                  <div key={booking.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-primary-500" />
                          <span className="font-bold text-lg text-slate-900">{booking.package}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                          <Calendar className="w-5 h-5 opacity-70" />
                          <span className="font-medium">Event Date: {booking.eventDate}</span>
                        </div>
                        {booking.startTime && booking.endTime && (
                          <div className="flex items-center gap-3 text-slate-600">
                            <Clock className="w-5 h-5 opacity-70" />
                            <span className="font-medium">Time: {booking.startTime} - {booking.endTime}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col md:items-end gap-2">
                        <span className="text-sm text-slate-500">Status</span>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
                          booking.status === 'Confirmed' ? 'bg-green-50 text-green-700' :
                          booking.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}>
                          <StatusIcon status={booking.status} />
                          {booking.status || 'Pending'}
                        </div>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white rounded-2xl p-12 border border-slate-200">
                <div className="inline-flex rounded-full bg-slate-50 p-4 mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No bookings found</h3>
                <p className="text-slate-500">We couldn't find any inquiries with that phone number. Please ensure it matches exactly the number provided during booking.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
