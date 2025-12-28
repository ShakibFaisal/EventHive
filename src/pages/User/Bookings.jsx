import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Trash2, Ticket, MapPin, CalendarDays } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";


const Bookings = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  // =======================
  // FETCH CONFIRMED BOOKINGS
  // =======================
  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user.email}`);
      return res.data.filter((b) => b.status === "confirmed");
    },
  });

  // ২. বুকিং ক্যানসেল ফাংশন
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Refund will be calculated based on event date.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel it!",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/bookings/${id}`);
          if (res.data.success || res.data.message) {
            refetch();

            Swal.fire({
              title: "Cancelled!",
              text: res.data.message || "Your ticket has been cancelled.",
              icon: "success",
              html: `
                <div style="text-align:left;font-size:14px">
                  <p><b>Total Paid:</b> $${res.data.totalPaid}</p>
                  <p><b>Refund Amount:</b> $${res.data.refundAmount}</p>
                  ${
                    res.data.deductionAmount > 0
                      ? `<p style="color:red"><b>Deduction:</b> $${res.data.deductionAmount} (40%)</p>`
                      : ""
                  }
                  <hr/>
                  <p>${res.data.message}</p>
                </div>
              `,
              confirmButtonColor: "#10b981",
              customClass: {
                popup: "rounded-2xl",
                confirmButton: "rounded-xl",
              },
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to cancel booking.",
            icon: "error",
            customClass: { popup: "rounded-2xl", confirmButton: "rounded-xl" },
          });
        }
      }
    });
  };

  // =======================
  // LOADING
  // =======================
  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            My Confirmed Tickets
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your upcoming event bookings
          </p>
        </div>
        <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
          <Ticket size={24} />
        </div>
        <Ticket size={26} className="text-emerald-600" />
      </div>

      {/* EMPTY */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Ticket size={32} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No tickets found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            You haven't booked any confirmed events yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Head */}
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
                  Action
                </th>
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
                    {(index + 1).toString().padStart(2, "0")}
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
                        <p className="font-semibold">{item.eventName}</p>
                        <p className="text-xs text-gray-500 flex gap-1">
                          <MapPin size={12} />
                          {item.location || "Online"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-lg w-fit">
                      <CalendarDays size={14} className="text-gray-400" />
                      {new Date(item.eventDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                      Cancel
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
