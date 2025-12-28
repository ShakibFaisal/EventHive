import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Crown,
  FileHeart,
  Flag,
  FolderKanban,
  FolderPlus,
  House,
  LogOut,
  User,
  Users,
} from "lucide-react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user, logOut: signout } = useAuth();
  const [role] = useRole();

  const isManager = role === "manager";
  const isAdmin = role === "admin";

  // --- Design Change Here: Soft Active/Inactive States ---
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-gray-100 text-gray-900 font-semibold shadow-sm" // Active: Light gray bg, dark text
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900" // Inactive: Gray text, subtle hover
    } ${isCollapsed ? "justify-center" : ""}`;

  return (
    <div
      // --- Design Change: White background, thin gray border ---
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen bg-white border-r border-gray-100 p-4 transition-all duration-300 relative flex flex-col`}
    >
      {/* Collapse Toggle Button (Minimalist Circle) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white border border-gray-200 text-gray-500 hover:text-black w-6 h-6 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all z-20"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* User Info */}
      {isCollapsed ? (
        <div className="flex justify-center mb-10 mt-2">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-gray-50"
            title={user?.displayName || "User"}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-10 mt-2 p-3 bg-gray-50/80 rounded-2xl border border-gray-100">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-gray-800 truncate">
              {user?.displayName || "User"}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              {isAdmin ? (
                <>
                  <Crown size={12} className="text-yellow-500" />
                  <span>Admin</span>
                </>
              ) : (
                <>
                  <User size={12} />
                  <span className="capitalize">{role || "User"}</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {/* User Routes */}
        <NavLink to="/" end className={linkClass} title="Dashboard">
          <span className="text-xl">
            <House size={20} />
          </span>
          {!isCollapsed && <span className="text-sm">Home</span>}
        </NavLink>
        <NavLink to="/dashboard" end className={linkClass} title="Dashboard">
          <span className="text-xl">
            <MdOutlineDashboardCustomize />
          </span>
          {!isCollapsed && <span className="text-sm">Dashboard</span>}
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass} title="Profile">
          <span className="text-xl">
            <CircleUserRound size={20} />
          </span>
          {!isCollapsed && <span className="text-sm">Profile</span>}
        </NavLink>

        <NavLink
          to="/dashboard/bookings"
          className={linkClass}
          title="Add Lesson"
        >
          <span className="text-xl">
            <FolderPlus size={20} />
          </span>
          {!isCollapsed && <span className="text-sm">Bookings</span>}
        </NavLink>

        <NavLink
          to="/dashboard/waitlist"
          className={linkClass}
          title="My Lessons"
        >
          <span className="text-xl">
            <BookOpenCheck size={20} />
          </span>
          {!isCollapsed && <span className="text-sm">Waitlist</span>}
        </NavLink>

        {/* Manager Panel */}
        {isManager && (
          <>
            <div className="my-6 px-4">
              {!isCollapsed ? (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Manager
                </p>
              ) : (
                <div className="h-px bg-gray-100 w-full mx-auto" />
              )}
            </div>

            <NavLink
              to="/dashboard/add-event"
              className={linkClass}
              title="Manage Users"
            >
              <span className="text-xl">
                <Users size={20} />
              </span>
              {!isCollapsed && <span className="text-sm">Add Event</span>}
            </NavLink>
            <NavLink
              to="/dashboard/my-events"
              className={linkClass}
              title="Manage Lessons"
            >
              <span className="text-xl">
                <FolderKanban size={20} />
              </span>
              {!isCollapsed && <span className="text-sm">My Events</span>}
            </NavLink>
          </>
        )}

        {/* Admin Panel */}
        {isAdmin && (
          <>
            <div className="my-6 px-4">
              {!isCollapsed ? (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Administrator
                </p>
              ) : (
                <div className="h-px bg-gray-100 w-full mx-auto" />
              )}
            </div>

            <NavLink
              to="/dashboard/adminstats"
              className={linkClass}
              title="Admin Home"
            >
              <span className="text-xl">
                <House size={20} />
              </span>
              {!isCollapsed && <span className="text-sm">Admin Home</span>}
            </NavLink>
            <NavLink
              to="/dashboard/manage-users"
              className={linkClass}
              title="Manage Users"
            >
              <span className="text-xl">
                <Users size={20} />
              </span>
              {!isCollapsed && <span className="text-sm">Manage Users</span>}
            </NavLink>
            <NavLink
              to="/dashboard/manage-events"
              className={linkClass}
              title="Manage Lessons"
            >
              <span className="text-xl">
                <FolderKanban size={20} />
              </span>
              {!isCollapsed && <span className="text-sm">Manage Events</span>}
            </NavLink>
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button
          onClick={signout}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 hover:text-red-600 w-full transition-all group ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Logout"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">
            <LogOut size={20} />
          </span>
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
