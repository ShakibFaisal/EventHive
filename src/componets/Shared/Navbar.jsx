import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import Logo from "./logo";

const Navbar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHomePage && !isScrolled;

  const handleSignOut = () => {
    signout()
      .then(() => {
        navigate("login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-2 rounded-full transition-all duration-300 text-[15px] font-semibold ${
              isActive
                ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold shadow-lg"
                : isTransparent
                ? "text-white hover:bg-white/10"
                : "hover:bg-gray-100 text-base-content/80"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `px-6 py-2 rounded-full transition-all duration-300 text-[15px] font-semibold ${
              isActive
                ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold shadow-lg"
                : isTransparent
                ? "text-white hover:bg-white/10"
                : "hover:bg-gray-100 text-base-content/80"
            }`
          }
        >
          All Events
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-6 py-2 rounded-full transition-all duration-300 text-[15px] font-semibold ${
              isActive
                ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold shadow-lg"
                : isTransparent
                ? "text-white hover:bg-white/10"
                : "hover:bg-gray-100 text-base-content/80"
            }`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-6 py-2 rounded-full transition-all duration-300 text-[15px] font-semibold ${
              isActive
                ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-bold shadow-lg"
                : isTransparent
                ? "text-white hover:bg-white/10"
                : "hover:bg-gray-100 text-base-content/80"
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link to="/">
          <Logo />
        </Link>

        <div
          className={`hidden lg:flex rounded-full px-2 py-0 transition-all duration-500 ${
            isTransparent
              ? "bg-transparent shadow-none"
              : "bg-white/80 backdrop-blur-md shadow-lg border border-white/20"
          }`}
        >
          <ul className="menu menu-horizontal px-1 gap-2">{navOptions}</ul>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost btn-circle avatar ${
                  isTransparent ? "border-white/30" : "border border-base-200"
                }`}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-200"
              >
                <li>
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                    <span className="badge bg-gradient-to-r from-lime-400 to-emerald-400 text-black border-none badge-sm font-semibold">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
                    isActive
                      ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-black"
                      : isTransparent
                      ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                end
                className={({ isActive }) =>
                  `px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
                    isActive
                      ? "bg-gradient-to-r from-lime-400 to-emerald-400 text-black"
                      : isTransparent
                      ? "bg-white text-black hover:bg-gray-100"
                      : "bg-gradient-to-r from-lime-400 to-emerald-500 text-black hover:from-lime-500 hover:to-emerald-600 shadow-lg"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost btn-circle ${
              isTransparent ? "text-white" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-xl bg-base-100 rounded-box w-52 gap-2"
          >
            {navOptions}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
