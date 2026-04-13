import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { logout } from '../../store/slices/authSlice';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // safely extract timestamp inside map
        createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'Just now'
      }));
      setBookings(bookingsData);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, { status: newStatus });
    } catch (err) {
      console.error("Error updating status: ", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900">Hall Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 mt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Recent Inquiries</h2>
          <p className="text-slate-500">Manage your hall bookings and leads.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold border-b border-slate-200">Date Received</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Customer Name</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Phone</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Event Date</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Package</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Status</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">No bookings found yet.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-slate-500">{booking.createdAt}</td>
                      <td className="p-4 font-medium text-slate-900">{booking.name}</td>
                      <td className="p-4 text-slate-600">{booking.phone}</td>
                      <td className="p-4">
                        <div className="text-slate-900 font-medium">{booking.eventDate}</div>
                        {booking.startTime && booking.endTime && (
                          <div className="text-xs text-slate-500 mt-1">
                            {booking.startTime} - {booking.endTime}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-slate-600">
                        <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-sm font-medium">
                          {booking.package}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-sm font-semibold ${
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <select 
                          value={booking.status || 'Pending'}
                          onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                          className="bg-white border border-slate-200 text-slate-700 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-primary-500 min-w-[120px]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
