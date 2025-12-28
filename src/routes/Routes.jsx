import { createBrowserRouter } from "react-router";

import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import EventDetails from "../pages/events/EventDetails";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import ProfileCard from "../pages/User/ProfileCard";
import Waitlist from "../pages/User/Waitlist";
import Contact from "../pages/Home/Contact";
import About from "../pages/Home/About";
import AddEvent from "../pages/Manager/AddEvent";
import Bookings from "../pages/User/Bookings";
import ManageEvents from "../pages/Admin/ManageEvents";
import AdminStats from "../pages/Admin/AdminStats";
import ManageUsers from "../pages/Admin/ManageUsers";
import AdminAllEvents from "../pages/Admin/AdminAllEvents";
import AllEvents from "../pages/events/AllEvents";
import MyEvents from "../pages/Manager/MyEvents";
import Login from "../pages/auth/Login";
import PaymentSuccess from "../pages/events/paymentsuccess";

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
      {
        path: "payment-success",
        element: <PaymentSuccess />,
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
        path: "add-event",
        element: <AddEvent />,
      },

      {
        path: "my-events",
        element: <MyEvents />,
      },

      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "allevents",
        element: <AdminAllEvents />,
      },
      {
        path: "manage-events",
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
