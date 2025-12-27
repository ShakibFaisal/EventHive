import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Trash2, Clock, Calendar, AlertCircle } from "lucide-react"; // Icons changed to Lucide
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Waitlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ১. ডাটা আনা (Logic Unchanged)
  const {
    data: waitlist = [],
    refetch,
    // isLoading,
  } = useQuery({
    queryKey: ["my-waitlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      // শুধু ওয়েটলিস্ট ফিল্টার করা
      return res.data.filter((booking) => booking.status === "waitlist");
    },
  });

  // ২. বুকিং ক্যানসেল ফাংশন (Logic Unchanged)
  const handleLeaveWaitlist = (id) => {
    Swal.fire({
      title: "Leave Waitlist?",
      text: "You will lose your spot in line!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red-500
      cancelButtonColor: "#6b7280", // Gray-500
      confirmButtonText: "Yes, Leave",
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "You have left the waitlist.",
              icon: "success",
              confirmButtonColor: "#10b981", // Emerald-500
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
              Waitlist Status
            </h2>
            <p className="text-sm text-gray-500 mt-1">Track your position for upcoming events</p>
        </div>
        <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
            <Clock size={24} />
        </div>
      </div>

      {/* Content Section */}
      {waitlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <AlertCircle size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No active waitlists</h3>
          <p className="text-gray-500 text-sm mt-1">You are not currently waiting for any events.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Head */}
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            
            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              {waitlist.map((item, index) => (
                <tr
                  key={item._id}
                  className="group hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  
                  <td className="px-6 py-4">
                     <div className="font-semibold text-gray-900 text-sm">
                        {item.eventName}
                     </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Calendar size={14} className="text-gray-400"/>
                        {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                      Waiting for Spot
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleLeaveWaitlist(item._id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 border border-transparent hover:border-red-100"
                      title="Leave Waitlist"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">Leave</span>
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

export default Waitlist;