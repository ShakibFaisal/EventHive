import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Trash2, Ticket, MapPin, CalendarDays } from "lucide-react"; // Using Lucide for cleaner look
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Bookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ১. ডাটা আনা (Logic Unchanged)
  const {
    data: bookings = [],
    refetch,
    // isLoading, // Not used in UI but kept for logic consistency
  } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      // শুধু কনফার্মড বুকিং ফিল্টার করা
      return res.data.filter((booking) => booking.status === "confirmed");
    },
  });

  // ২. বুকিং ক্যানসেল ফাংশন (Logic Unchanged)
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Ticket?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Updated to match red-500
      cancelButtonColor: "#6b7280", // Updated to match gray-500
      confirmButtonText: "Yes, Cancel it!",
      customClass: {
        popup: 'rounded-2xl', // Rounder sweet alert
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Cancelled!",
              text: "Your ticket has been cancelled.",
              icon: "success",
              confirmButtonColor: "#10b981",
              customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl' }
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            My Confirmed Tickets
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage your upcoming event bookings</p>
        </div>
        <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
            <Ticket size={24} />
        </div>
      </div>

      {/* Content Section */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Ticket size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No tickets found</h3>
          <p className="text-gray-500 text-sm mt-1">You haven't booked any confirmed events yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Head */}
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            
            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              {bookings.map((item, index) => (
                <tr
                  key={item._id}
                  className="group hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                            src={item.eventImage} 
                            alt="Event" 
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {item.eventName}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <MapPin size={12} />
                          {item.location || "Online"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-lg w-fit">
                        <CalendarDays size={14} className="text-gray-400"/>
                        {new Date(item.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">
                        ${item.price}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-all active:scale-95"
                      title="Cancel Booking"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;