import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Check, X, ShieldCheck, AlertCircle } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageEvents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], refetch } = useQuery({
    queryKey: ["manage-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // Handle Approve
  const handleApprove = (event) => {
    axiosSecure.patch(`/events/approve/${event._id}`).then((res) => {
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                title: "Approved!",
                text: `${event.name} is now live.`,
                icon: "success",
                confirmButtonColor: "#10b981", // Emerald Green
                customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl' }
            });
        }
    })
  };

  // Handle Reject
  const handleReject = (event) => {
    Swal.fire({
        title: "Reject Event?",
        text: "This event will be marked as rejected.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Reject",
        customClass: {
            popup: 'rounded-2xl', 
            confirmButton: 'rounded-xl', 
            cancelButton: 'rounded-xl'
        }
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/events/reject/${event._id}`).then((res) => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire({
                        title: "Rejected",
                        icon: "info",
                        confirmButtonColor: "#000",
                        customClass: { popup: 'rounded-2xl', confirmButton: 'rounded-xl' }
                    });
                }
            })
        }
      });
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Manage Event Requests
          </h2>
          <p className="text-sm text-gray-500 mt-1">Approve or reject organizer submissions</p>
        </div>
        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
          <ShieldCheck size={24} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Event Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Organizer</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr key={event._id} className="group hover:bg-gray-50/50 transition-colors">
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={event.image} alt="" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                    <span className="font-semibold text-gray-900 text-sm">{event.name}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                    {event.organizer}
                </td>

                <td className="px-6 py-4">
                  {event.status === "active" ? (
                     <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Check size={10} /> Approved
                     </span>
                  ) : event.status === "rejected" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                        <X size={10} /> Rejected
                     </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-600 border border-yellow-100">
                        <AlertCircle size={10} /> Pending
                     </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                    {/* Action Buttons only if pending (Optional Logic) */}
                    <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={() => handleApprove(event)}
                            disabled={event.status === 'active' || event.status === 'rejected'}
                            className="p-2 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title="Approve"
                        >
                            <Check size={16} />
                        </button>
                        <button
                            onClick={() => handleReject(event)}
                            disabled={event.status === 'active' || event.status === 'rejected'}
                            className="p-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title="Reject"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;