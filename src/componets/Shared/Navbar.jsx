import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout()
      .then(() => {
        navigate('login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-2 rounded-full transition-all duration-300 font-medium ${
              isActive
                ? 'bg-primary text-primary-content font-bold'
                : 'hover:bg-primary hover:text-primary-content text-base-content/80'
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
            `px-6 py-2 rounded-full transition-all duration-300 font-medium ${
              isActive
                ? 'bg-primary text-primary-content font-bold'
                : 'hover:bg-primary hover:text-primary-content text-base-content/80'
            }`
          }
        >
          All Events
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl">
      <div className="navbar bg-white/80 backdrop-blur-md rounded-full shadow-lg px-6 border border-white/20">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden"
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
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 gap-2"
            >
              {navOptions}
            </ul>
          </div>
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tighter text-secondary px-4"
          >
            EventHive
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {/* ahsan */}
          <div className='mr-6'>
            <ThemeToggle></ThemeToggle>
          </div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-base-200"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={
                      user?.photoURL ||
                      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-200"
              >
                <li>
                  <Link to="/dashboard/user-home" className="justify-between">
                    Dashboard
                    <span className="badge badge-primary badge-sm">New</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-primary hover:text-primary-content text-base-content/80"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm rounded-full text-primary-content px-6 font-bold h-10 min-h-[2.5rem]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
