import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Trash2, Edit, Calendar, MapPin, Layers } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router"; // or 'react-router-dom'

const MyEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Data
  const {
    data: events = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/manager/${user?.email}`);
      return res.data;
    },
  });

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This will permanently remove the event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/events/manager/${id}`);
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
            customClass: { popup: "rounded-2xl", confirmButton: "rounded-xl" },
          });
        }
      }
    });
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            My Organized Events
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track your listed events
          </p>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
          <Layers size={24} />
        </div>
      </div>

      {/* Table Content */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Calendar size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No events created
          </h3>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            Start by creating your first event now.
          </p>
          <Link
            to="/dashboard/add-event"
            className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event, index) => (
                <tr
                  key={event._id}
                  className="group hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={event.image}
                        alt="Event"
                        className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {event.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <MapPin size={12} />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-lg">
                      {event.date}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">
                      ${event.price}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/dashboard/update-event/${event._id}`}
                        className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Edit Event"
                      >
                        <Edit size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(event._id)}
                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
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
      )}
    </div>
  );
};

export default MyEvents;
