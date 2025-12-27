import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; // or "react-router-dom" depending on your version
import {
  FaCalendarCheck,
  FaHourglassHalf,
  FaDollarSign,
  FaUserShield,
  FaTicketAlt,
  FaArrowRight
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ১. ডাটা লোড করা (সব বুকিং) - লজিক অপরিবর্তিত
  const { data: bookings = [] } = useQuery({
    queryKey: ["dashboard-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });

  // ২. ডাটা ফিল্টারিং - লজিক অপরিবর্তিত
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");
  const waitlistBookings = bookings.filter((b) => b.status === "waitlist");

  // মোট খরচ বের করা - লজিক অপরিবর্তিত
  const totalSpent = confirmedBookings.reduce(
    (sum, item) => sum + parseInt(item.price),
    0
  );

  return (
    // Background changed to match Screenshot_63 (Clean White/Gray)
    <div className="min-h-screen bg-[#F9FAFB] py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Homepage
            </h1>
            <p className="text-gray-500 mt-1 text-sm font-medium">
              Welcome back, {user?.displayName?.split(" ")[0]}! 👋
            </p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium text-gray-600">
             <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* --- Stats Cards (Re-styled to match Screenshot Clean Cards) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Bookings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <FaCalendarCheck className="text-xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bookings</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{confirmedBookings.length}</h3>
            <p className="text-sm text-gray-500 mt-1">Confirmed Events</p>
          </div>

          {/* Waitlist Count */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <FaHourglassHalf className="text-xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Waitlist</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{waitlistBookings.length}</h3>
            <p className="text-sm text-gray-500 mt-1">Pending Approval</p>
          </div>

          {/* Total Spent */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <FaDollarSign className="text-xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Spent</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">${totalSpent}</h3>
            <p className="text-sm text-gray-500 mt-1">Total Expenses</p>
          </div>

          {/* Account Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${user?.emailVerified ? 'bg-purple-50 text-purple-600' : 'bg-red-50 text-red-600'}`}>
                <FaUserShield className="text-xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</span>
            </div>
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900 capitalize">{user?.role || "User"}</h3>
                {user?.emailVerified && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
            </div>
            <p className="text-sm text-gray-500 mt-1">Account Status</p>
          </div>
        </div>

        {/* --- Quick Actions (Styled like Screenshot 62 Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/events" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 group-hover:bg-black group-hover:text-white transition-colors">
                    <FaTicketAlt />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Browse Events</h4>
                    <p className="text-xs text-gray-500">Book new tickets</p>
                </div>
            </Link>

            <Link to="/dashboard/my-bookings" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 group-hover:bg-black group-hover:text-white transition-colors">
                    <FaCalendarCheck />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">My Bookings</h4>
                    <p className="text-xs text-gray-500">View confirmed list</p>
                </div>
            </Link>

            <Link to="/dashboard/profile" className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-700 group-hover:bg-black group-hover:text-white transition-colors">
                    <FaUserShield />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">My Profile</h4>
                    <p className="text-xs text-gray-500">Update info</p>
                </div>
            </Link>
        </div>

        {/* --- Recent Activity Table (Styled like Screenshot 63 bottom section) --- */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <Link
                to="/dashboard/my-bookings"
                className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
              >
                See All Details <FaArrowRight className="text-xs"/>
            </Link>
          </div>

          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
                    <th className="px-8 py-4 font-medium">Event Name</th>
                    <th className="px-8 py-4 font-medium">Date & Time</th>
                    <th className="px-8 py-4 font-medium">Payment Status</th>
                    <th className="px-8 py-4 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {bookings.slice(0, 5).map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                      
                      {/* Event Name & Image */}
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.eventImage || "https://via.placeholder.com/150"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                          />
                          <span className="font-semibold text-gray-900">{item.eventName}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-8 py-4 text-gray-500">
                        {new Date(item.eventDate).toDateString()}
                      </td>

                      {/* Status Badge (Styled like Screenshot 63 pill) */}
                      <td className="px-8 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            item.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'confirmed' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                          {item.status}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-8 py-4 font-bold text-gray-900">
                         ${item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-gray-400 font-medium">No recent activity found</h3>
              <Link
                to="/events"
                className="mt-4 inline-block px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
              >
                Book Your First Event
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;