import React from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../componets/Shared/Loading";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();

  const { data: event = [], isLoading } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
  });

  // check if current user already has a confirmed booking for this event
  const { data: myBookings = [], refetch: refetchBookings } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    staleTime: 0, // Always refetch to get latest booking status
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data || [];
    },
  });

  const isBooked = !!myBookings.find(
    (b) => String(b.eventId) === String(event?._id) && b.status === "confirmed"
  );

  if (isLoading) return <Loading />;

  console.log(event);

  const handlebook = async () => {
    // ১. চেক করুন ইউজার আছে কিনা
    if (!user) {
      navigate("/login", { state: location.pathname });
      return;
    }

    // Already booked check
    if (isBooked) {
      Swal.fire({
        title: "Already Booked!",
        text: "You have already booked this event.",
        icon: "info",
      });
      return;
    }

    // ২. কনফার্মেশন মডাল ওপেন করা
    Swal.fire({
      title: "Are you sure?",
      text: `You have to pay ৳ ${event.price} for booking this event.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pay Now",
    }).then(async (result) => {
      // ৩. ইউজার যদি "Pay Now" তে ক্লিক করে
      if (result.isConfirmed) {
        try {
          // পেমেন্ট প্রসেস হওয়ার সময় লোডিং দেখানোর জন্য
          Swal.fire({
            title: "Processing...",
            text: "Redirecting to payment gateway...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          // পেমেন্ট ইনফো রেডি করা
          const paymentInfo = {
            eventId: event?._id,
            eventName: event?.title,
            eventDate: event?.date,
            userEmail: user?.email,
            userName: user?.displayName,
            image: event?.image, // event er image pathano better
            price: event?.price,
          };

          // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
          const { data } = await axiosSecure.post(
            `/bookings/create-checkout-session`,
            paymentInfo
          );

          // ৪. পেমেন্ট লিংকে রিডাইরেক্ট করা
          if (data?.url) {
            window.location.href = data.url;
          }
        } catch (error) {
          console.error("Payment Error:", error);
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.error ||
              "Something went wrong initiating payment.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-[100px]">
      {/* Event Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {/* Left Side */}
        <div className="md:col-span-2 space-y-4">
          <span className="badge badge-outline badge-lg">{event.category}</span>

          <h1 className="text-3xl font-bold">{event.title}</h1>

          <p className="text-gray-600 leading-relaxed">{event.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <p>📍 {event.location}</p>
            <p>📅 {new Date(event.date).toDateString()}</p>
            <p>🎟 Available Seats: {event.availableSeats}</p>
          </div>
        </div>

        {/* Booking Card */}
        <div className="border rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Event Info</h2>

          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span className="font-semibold">৳ {event.price}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Total Seats</span>
            <span>{event.totalSeats}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Available</span>
            <span className="text-green-600 font-medium">
              {event.availableSeats}
            </span>
          </div>

          <button
            onClick={handlebook}
            disabled={isBooked || event.availableSeats <= 0}
            className={`btn btn-block rounded-full transition-all ${
              isBooked || event.availableSeats <= 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isBooked
              ? "Already Booked"
              : event.availableSeats <= 0
              ? "Sold Out"
              : "Book Now"}
          </button>
        </div>
      </div>

      {/* Organizer */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Organizer</h2>

        <div className="flex items-center gap-4">
          <img
            src={event.organizerPhoto}
            alt={event.organizerName}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div>
            <p className="font-medium">{event.organizerName}</p>
            <p className="text-sm text-gray-500">{event.organizerEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
