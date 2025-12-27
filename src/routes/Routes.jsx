import { createBrowserRouter } from "react-router";

import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import EventDetails from "../pages/events/EventDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import ProfileCard from "../pages/User/ProfileCard";
import Waitlist from "../pages/User/Waitlist";
import Contact from "../pages/Home/Contact";
import About from "../pages/Home/About";
import AddEvent from "../pages/Manager/AddEvent";
import Bookings from "../pages/User/Bookings";
import AllEvents from "../pages/Admin/AllEvents";
import ManageEvents from "../pages/Admin/ManageEvents";
import AdminStats from "../pages/Admin/AdminStats";
import ManageUsers from "../pages/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <AllEvents />,
      },
      {
        path: "event/:id",
        element: <EventDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "profile",
        element: <ProfileCard />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "waitlist",
        element: <Waitlist />,
      },
      {
        path: "addevent",
        element: <AddEvent />,
      },
      {
        path: "ManageUsers",
        element: <ManageUsers />,
      },
      {
        path: "allevents",
        element: <AllEvents />,
      },
      {
        path: "manageevents",
        element: <ManageEvents />,
      },
      {
        path: "adminstats",
        element: <AdminStats />,
      },
    ],
  },
]);

export default router;
