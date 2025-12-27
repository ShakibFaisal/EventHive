import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Trash2, Calendar, Search, User, Globe } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllEvents = () => {
  const axiosSecure = useAxiosSecure();

  // 1. Fetch All Events
  const { data: events = [], refetch, isLoading } = useQuery({
    queryKey: ["all-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events"); 
      return res.data;
    },
  });

  // 2. Delete Handler (Admin Power)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Event?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/events/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Event has been removed from the platform.",
              icon: "success",
              confirmButtonColor: "#000",
              customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl' }
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            All Events List
          </h2>
          <p className="text-sm text-gray-500 mt-1">Total {events.length} events active on platform</p>
        </div>
        
        {/* Fake Search Bar for UI */}
        <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Search events..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-black transition-all w-full sm:w-64"
            />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Info</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Organizer</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price/Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event, index) => (
              <tr key={event._id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {(index + 1).toString().padStart(2, '0')}
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={event.image} 
                      alt="" 
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                    />
                    <span className="font-semibold text-gray-900 text-sm">{event.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={14} className="text-gray-400" />
                        {event.organizerName || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-400 ml-5.5">{event.organizer}</div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">${event.price}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Calendar size={10} /> {event.date}
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Event"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEvents;