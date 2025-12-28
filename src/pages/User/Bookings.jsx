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

  // =======================
  // CANCEL BOOKING
  // =======================
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Refund will be calculated based on event date.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/bookings/${id}`);

          if (res.data.success) {
            refetch();

            Swal.fire({
              title: "Booking Cancelled ✅",
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
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Cancellation Failed",
            text:
              error.response?.data?.message ||
              "Something went wrong during cancellation.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Delete error:", error);
        console.error("Error response:", error.response?.data);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || error.message || "Failed to cancel booking.",
          icon: "error",
          customClass: { popup: "rounded-2xl", confirmButton: "rounded-xl" },
        });
      }
    }
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
    <div className="w-full bg-white rounded-2xl border shadow-md overflow-hidden">
      
      {/* HEADER */}
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            My Confirmed Tickets
          </h2>
          <p className="text-sm text-gray-500">
            Cancel tickets with refund policy
          </p>
        </div>
        <Ticket size={26} className="text-emerald-600" />
      </div>

      {/* EMPTY */}
      {bookings.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No confirmed bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-xs uppercase text-gray-400">#</th>
                <th className="px-6 py-3 text-xs uppercase text-gray-400">
                  Event
                </th>
                <th className="px-6 py-3 text-xs uppercase text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-xs uppercase text-gray-400">
                  Price
                </th>
                <th className="px-6 py-3 text-xs uppercase text-gray-400 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {bookings.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        alt="event"
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-semibold">{item.eventName}</p>
                        <p className="text-xs text-gray-500 flex gap-1">
                          <MapPin size={12} />
                          {item.location || "Online"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg w-fit">
                      <CalendarDays size={14} />
                      {new Date(item.eventDate).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-bold">
                    ${item.price}
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
