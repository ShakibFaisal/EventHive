import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Loading from "../../componets/Shared/Loading";
import ErrorMessage from "../../componets/Shared/ErrorMessage";
import useAuth from "../../hooks/useAuth";

const PaymentSuccess = () => {
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    // Wait for Firebase auth to finish loading
    if (authLoading) {
      return;
    }

    // If no user after auth loads, show error
    if (!user) {
      setError(
        "You must be logged in to verify payment. Please login and try again."
      );
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(location.search);
    const sessionId =
      params.get("session_id") ||
      params.get("sessionId") ||
      params.get("session");

    if (!sessionId) {
      setError("No session id provided in the URL.");
      setLoading(false);
      return;
    }

    // Wait for Firebase token to be fetched before making API call
    const verifyPayment = async () => {
      try {
        // Get fresh token
        const token = await user.getIdToken(true);
        console.log("Token obtained:", token ? "Yes" : "No");
        console.log("Verifying payment with session ID:", sessionId);

        const res = await axiosSecure.post("/bookings/session-status", {
          sessionId,
        });
        console.log("Payment verification response:", res.data);

        if (res.data?.success) {
          setBooking(res.data.booking || null);
          setInfoMessage(res.data.message || "Payment verified");
        } else {
          setError(res.data?.message || "Payment not completed");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        console.error("Error response:", err.response);
        setError(err.response?.data?.message || err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    // Small delay to ensure token is set in axios interceptor
    const timer = setTimeout(() => {
      verifyPayment();
    }, 500);

    return () => clearTimeout(timer);
  }, [location.search, axiosSecure, authLoading, user]);

  // Show loading while auth is loading OR while verifying payment
  if (authLoading || loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage
        message={typeof error === "string" ? error : "Payment error"}
      />
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-[100px]">
      <div className="bg-white border rounded-2xl p-8 shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>
        {infoMessage && <p className="mb-4 text-gray-600">{infoMessage}</p>}

        {booking ? (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Event</span>
              <span>{booking.eventName || booking.event}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Date</span>
              <span>{booking.eventDate || booking.date || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Booked For</span>
              <span>
                {booking.userName || booking.user || booking.userEmail}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              <span>{booking.userEmail || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Transaction ID</span>
              <span className="font-mono text-sm">{booking.transactionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Amount</span>
              <span>৳ {booking.price}</span>
            </div>

            <div className="pt-6 flex gap-3">
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
              <Link to="/dashboard/bookings" className="btn btn-primary">
                View My Bookings
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-700">
              Payment verified, but no booking record was returned.
            </p>
            <div className="pt-6 flex gap-3">
              <Link to="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
