import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { 
  Edit, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Ticket 
} from "lucide-react"; // Make sure to install lucide-react or use react-icons

const ProfileCard = () => {
  const { user: authUser } = useAuth() || {};
  const [role, setRole] = useState("user");

  const user = {
    displayName: authUser?.displayName || "Draco Malfoy",
    email: authUser?.email || "draco.malfoy@hogwarts.edu",
    photoURL:
      authUser?.photoURL ||
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    uid: authUser?.uid || "USER_123456",
    status: "verified",
  };

  const roleTheme = {
    admin: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-100",
      ring: "ring-red-50",
    },
    "event-manager": {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      ring: "ring-blue-50",
    },
    user: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      ring: "ring-emerald-50",
    },
  };

  const currentTheme = roleTheme[role];

  // --- হ্যান্ডলার ---
  const handleRequest = () => {
    alert("Request sent to Admin successfully!");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center py-10 px-4 font-sans">
      
      {/* --- Developer Controls (Clean Style) --- */}
      <div className="mb-6 p-2 bg-white rounded-full border border-gray-200 shadow-sm flex gap-2">
        {["user", "event-manager", "admin"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all capitalize ${
              role === r
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {r.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* --- MAIN CARD --- */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        
        {/* 1. Subtle Top Banner */}
        <div className="h-32 bg-gradient-to-b from-gray-50 to-white border-b border-gray-50 relative">
             <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-wider shadow-sm">
                ID: {user.uid.slice(0, 8)}...
             </div>
        </div>

        {/* 2. Content Container */}
        <div className="px-8 pb-8 -mt-16 relative">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center text-center">
            <div className={`p-1.5 rounded-full bg-white ${currentTheme.ring} ring-4 transition-all duration-300`}>
                <img
                src={user.photoURL}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md"
                />
            </div>

            {/* Name & Role */}
            <div className="mt-4 space-y-1">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                    {user.displayName}
                    {user.status === 'verified' && <CheckCircle2 size={18} className="text-blue-500" fill="currentColor" color="white" />}
                </h2>
                <p className="text-sm font-medium text-gray-500">{user.email}</p>
                
                {/* Role Badge */}
                <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}`}>
                    {role.replace("-", " ")}
                </div>
            </div>
          </div>

          {/* 3. Stats Section (Clean Box) */}
          <div className="grid grid-cols-3 gap-4 mt-8 py-4 border-t border-b border-gray-50">
             <div className="text-center group cursor-default">
                <div className="flex items-center justify-center w-8 h-8 mx-auto bg-purple-50 text-purple-600 rounded-full mb-1 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Ticket size={14} />
                </div>
                <span className="block text-lg font-bold text-gray-900">12</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Bookings</span>
             </div>

             <div className="text-center group cursor-default">
                <div className="flex items-center justify-center w-8 h-8 mx-auto bg-blue-50 text-blue-600 rounded-full mb-1 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                     {user.status === "verified" ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                </div>
                <span className={`block text-lg font-bold capitalize ${user.status === 'verified' ? 'text-gray-900' : 'text-red-500'}`}>
                    {user.status}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status</span>
             </div>

             <div className="text-center group cursor-default">
                <div className="flex items-center justify-center w-8 h-8 mx-auto bg-orange-50 text-orange-600 rounded-full mb-1 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <Calendar size={14} />
                </div>
                <span className="block text-lg font-bold text-gray-900">3</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Events</span>
             </div>
          </div>

          {/* 4. Action Buttons */}
          <div className="mt-8 space-y-3">
            <button className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-xl shadow-lg shadow-gray-200 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Edit size={16} />
              Edit Profile Information
            </button>

            {role === "user" && (
              <button
                onClick={handleRequest}
                className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Sparkles size={16} className="text-yellow-500 group-hover:rotate-12 transition-transform" />
                Request Organizer Access
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileCard;