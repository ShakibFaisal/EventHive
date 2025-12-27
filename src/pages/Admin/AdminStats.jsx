import { useQuery } from "@tanstack/react-query";
import {
  Users,
  DollarSign,
  Calendar,
  Ticket,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Stats Data (Real API Call)
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // --- MOCK DATA FOR CHARTS (Backend থেকে এই ফরম্যাটে ডাটা আসবে) ---
  const chartData = [
    { name: "Jan", revenue: 4000, bookings: 240 },
    { name: "Feb", revenue: 3000, bookings: 139 },
    { name: "Mar", revenue: 2000, bookings: 980 },
    { name: "Apr", revenue: 2780, bookings: 390 },
    { name: "May", revenue: 1890, bookings: 480 },
    { name: "Jun", revenue: 2390, bookings: 380 },
    { name: "Jul", revenue: 3490, bookings: 430 },
  ];

  // --- STATS CARDS CONFIGURATION ---
  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.revenue || "12,450"}`,
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "text-blue-600",
      bg: "bg-blue-50",
      ring: "ring-blue-50",
    },
    {
      title: "Total Users",
      value: stats.users || "2,340",
      change: "+8.2%",
      isPositive: true,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      ring: "ring-purple-50",
    },
    {
      title: "Events Active",
      value: stats.events || "145",
      change: "-2.4%",
      isPositive: false,
      icon: Calendar,
      color: "text-orange-600",
      bg: "bg-orange-50",
      ring: "ring-orange-50",
    },
    {
      title: "Total Bookings",
      value: stats.bookings || "8,930",
      change: "+18.2%",
      isPositive: true,
      icon: Ticket,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      ring: "ring-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 shadow-sm">
          <Calendar size={16} />
          <span>Last 30 Days</span>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span
                className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
                  stat.isPositive
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight size={12} className="mr-1" />
                ) : (
                  <ArrowDownRight size={12} className="mr-1" />
                )}
                {stat.change}
              </span>
              <span className="text-xs text-gray-400">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart (Area) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <DollarSign size={18} className="text-blue-500" /> Revenue
              Analytics
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart (Bar) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Ticket size={18} className="text-emerald-500" /> Booking Trends
            </h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="bookings"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
