import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../componets/Shared/Navbar";
import Sidebar from "../componets/Dashboard/Sidebar";
import Footer from "../componets/Shared/Footer";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5f6]">
      {/* Navbar - Top */}

      {/* Main Area - Sidebar + Content */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content */}
        <div className="flex-1 p-8 transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
