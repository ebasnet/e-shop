// components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "My Profile", path: "/admin/profile" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Add Item", path: "/admin/add-item" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin
      </div>
      <nav className="mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="block px-6 py-3 hover:bg-gray-700"
            activeClassName="bg-gray-700"
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
