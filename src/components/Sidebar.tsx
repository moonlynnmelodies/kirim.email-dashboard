import { Link } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Kirim.Email</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/mailbox" className="hover:text-gray-300">Mailbox</Link>
        <Link to="/profile" className="hover:text-gray-300">Profile</Link>
        <Link to="/settings" className="hover:text-gray-300">Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
