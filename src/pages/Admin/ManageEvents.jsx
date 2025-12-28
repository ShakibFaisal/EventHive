import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Check, X, ShieldCheck, AlertCircle, Trash2 } from "lucide-react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ManageEvents = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: events = [], refetch } = useQuery({
    queryKey: ["manage-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = (event) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This will permanently remove the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/events/admin-manager/${event._id}`
          );
          if (res.data._id || res.data) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Event has been removed.",
              icon: "success",
              confirmButtonColor: "#000",
              customClass: {
                popup: "rounded-2xl",
                confirmButton: "rounded-xl",
              },
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to delete event.",
            icon: "error",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-xl",
            },
          });
        }
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
          <p className="text-sm text-gray-500 mt-1">
            Approve or reject organizer submissions
          </p>
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
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Event photo
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Event Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Organizer
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr
                key={event._id}
                className="group hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={event.image}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover shadow-sm"
                    />
                    <span className="font-semibold text-gray-900 text-sm">
                      {event.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {event.title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {event.organizerName}
                </td>

                <td className="px-6 py-4 text-right">
                  {/* Action Buttons only if pending (Optional Logic) */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(event)}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-100"
                      title="Delete Event"
                    >
                      <Trash2 size={16} />
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
