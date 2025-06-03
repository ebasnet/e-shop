import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, ShoppingCart, Package, DollarSign, Menu } from "lucide-react";

// Monthly data for the chart
const data = [
  { name: "Jan", users: 20, orders: 30, revenue: 24000, deliveries: 28 },
  { name: "Feb", users: 30, orders: 25, revenue: 22000, deliveries: 23 },
  { name: "Mar", users: 20, orders: 35, revenue: 23000, deliveries: 20 },
  { name: "Apr", users: 28, orders: 20, revenue: 20000, deliveries: 22 },
  { name: "May", users: 19, orders: 40, revenue: 21810, deliveries: 25 },
  { name: "Jun", users: 29, orders: 38, revenue: 25000, deliveries: 21 },
  { name: "Jul", users: 39, orders: 43, revenue: 21000, deliveries: 23 },
];

// Dummy orders list
const dummyOrders = [
  {
    id: 101,
    customer: "Eliza Basnet",
    date: "2025-05-01",
    amount: 1200,
    status: "Delivered",
  },
  {
    id: 102,
    customer: "Ram Gurung",
    date: "2025-05-03",
    amount: 2300,
    status: "Pending",
  },
  {
    id: 103,
    customer: "Anita Rai",
    date: "2025-05-05",
    amount: 3400,
    status: "Delivered",
  },
  {
    id: 104,
    customer: "Bibek Thapa",
    date: "2025-05-07",
    amount: 1800,
    status: "Cancelled",
  },
  {
    id: 105,
    customer: "Kiran Lama",
    date: "2025-05-09",
    amount: 2500,
    status: "Delivered",
  },
];

export default function Admin() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="p-8 min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative">
        {/* Hamburger menu top-left */}
        <div className="relative">
          <button
            className="p-2 rounded-md hover:bg-gray-200 focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={28} />
          </button>

          {/* Dropdown menu on click */}
          {menuOpen && (
            <div
              className="absolute left-0 top-full mt-2 bg-white border rounded shadow-md w-48 z-50"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin/profile");
                }}
              >
                My Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/admin/orders")}
              >
                Orders
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/admin/items")}
              >
                Add Items
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("e-shop/admin/adminitems")}
              >
                Items
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Go to Settings")}
              >
                Settings
              </button>
              <hr className="my-1 border-gray-300" />
            </div>
          )}
        </div>

        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Dummy spacer for symmetry */}
        <div style={{ width: 40 }}></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 bg-white rounded-lg shadow flex items-center gap-4">
          <Users size={36} className="text-blue-600" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">1,250</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow flex items-center gap-4">
          <ShoppingCart size={36} className="text-green-600" />
          <div>
            <p className="text-gray-500">Orders</p>
            <p className="text-2xl font-semibold">3,400</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow flex items-center gap-4">
          <DollarSign size={36} className="text-yellow-500" />
          <div>
            <p className="text-gray-500">Revenue (NPR)</p>
            <p className="text-2xl font-semibold">Rs.56,789</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow flex items-center gap-4">
          <Package size={36} className="text-purple-600" />
          <div>
            <p className="text-gray-500">Deliveries</p>
            <p className="text-2xl font-semibold">2,980</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorOrders)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
