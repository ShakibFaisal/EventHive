import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  Edit,
  Sparkles,
  CheckCircle2,
  XCircle,
  Calendar,
  Ticket,
  ShieldCheck,
  UserCheck,
  Users,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ProfileCard = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const axiosSecure = UseAxiosSecure();

  // 1. Fetch User Data with Loading State
  const {
    data: userData,
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile", authUser?.email],
    enabled: !!authUser?.email && !authLoading, // Auth ready হওয়ার পর কল হবে
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${authUser?.email}`);
      console.log("DB User Data:", res.data); // 🔍 Check Console for this
      return res.data;
    },
  });

  // 2. Loading Spinner (খুবই জরুরি)
  // ডাটা না আসা পর্যন্ত লোডিং দেখাবে, তাই ভুল ভাল রোল দেখাবে না
  // if (authLoading || dataLoading) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center bg-[#F9FAFB]">
  //       <Loader2 className="animate-spin text-gray-400 w-10 h-10" />
  //     </div>
  //   );
  // }

  // 3. User Object Creation (Safe Merge)
  const user = {
    displayName: userData?.name || authUser?.displayName || "User",
    email: userData?.email || authUser?.email,
    photoURL: userData?.image || authUser?.photoURL,
    uid: userData?._id || authUser?.uid,
    role: userData?.role || "user",
    status: userData?.status || "verified",
    totalBookings: userData?.totalBookings || 0,
    totalEvents: userData?.totalEvents || 0,
  };

  // 4. Role Theme Configuration
  const roleTheme = {
    admin: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      ring: "ring-purple-50",
      label: "Admin",
      icon: ShieldCheck,
    },
    manager: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      ring: "ring-blue-50",
      label: "Organizer", // Label change for manager
      icon: UserCheck,
    },
    user: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      ring: "ring-emerald-50",
      label: "User",
      icon: Users,
    },
  };

  // Fallback to 'user' theme if role doesn't match
  const currentTheme = roleTheme[user.role] || roleTheme.user;
  const RoleIcon = currentTheme.icon;

  const handleRequest = async () => {
    try {
      const res = await axiosSecure.patch(
        `/users/request-manager/${user.email}`
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Success",
          text: "Request sent successfully!",
          icon: "success",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center py-10 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden relative">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-b from-gray-50 to-white border-b border-gray-50 relative">
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider shadow-sm font-mono">
            ID: {user.uid?.slice(-6) || "N/A"}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 -mt-16 relative">
          <div className="flex flex-col items-center text-center">
            {/* Avatar Ring Color based on Role */}
            <div
              className={`p-1.5 rounded-full bg-white ${currentTheme.ring} ring-4 transition-all duration-300`}
            >
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md"
              />
            </div>

            <div className="mt-4 space-y-1">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                {user.displayName}
                {/* Role Icon next to Name */}
                {user.role === "admin" && (
                  <ShieldCheck size={18} className="text-purple-500" />
                )}
                {user.role === "manager" && (
                  <CheckCircle2 size={18} className="text-blue-500" />
                )}
              </h2>
              <p className="text-sm font-medium text-gray-500">{user.email}</p>

              {/* DYNAMIC ROLE BADGE */}
              <div
                className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}`}
              >
                <RoleIcon size={12} />
                {currentTheme.label} {/* Dynamic Label */}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 py-4 border-t border-b border-gray-50">
            {/* Stats Items... (Same as before) */}
            <div className="text-center">
              <span className="block text-lg font-bold text-gray-900">0</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Bookings
              </span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-gray-900 capitalize">
                {user.status}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Status
              </span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-gray-900">0</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                Events
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
              <Edit size={16} /> Edit Profile
            </button>

            {/* HIDE BUTTON IF NOT USER */}
            {user.role === "user" && (
              <button
                onClick={handleRequest}
                disabled={user.status === "requested"}
                className={`w-full py-3 px-4 border text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2
                    ${
                      user.status === "requested"
                        ? "bg-gray-50 text-gray-400"
                        : "bg-white hover:bg-gray-50 text-gray-700"
                    }`}
              >
                {user.status === "requested"
                  ? "Request Pending..."
                  : "Request Manager Access"}
              </button>
            )}

            {/* Show message for Manager/Admin */}
            {user.role !== "user" && (
              <div
                className={`w-full py-3 px-4 text-sm font-bold rounded-xl flex items-center justify-center gap-2 border ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}`}
              >
                <currentTheme.icon size={16} />
                You are currently an {currentTheme.label}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
