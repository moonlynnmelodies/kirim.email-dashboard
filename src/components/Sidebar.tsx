// import { Link } from "react-router-dom";
// import React from "react";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-4">
//       <h2 className="text-xl font-bold mb-6">Kirim.Email</h2>
//       <nav className="flex flex-col gap-4">
//         <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
//         <Link to="/domain" className="hover:text-gray-300">Domain</Link>
//         <Link to="/mailbox" className="hover:text-gray-300">Mailbox</Link>
//         <Link to="/profile" className="hover:text-gray-300">Profile</Link>
//         <Link to="/settings" className="hover:text-gray-300">Settings</Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white shadow-md h-screen p-4">
    <h2 className="text-xl font-bold mb-6">Kirim.Email</h2>

      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="block p-2 hover:bg-blue-200 rounded">
            Dashboard
          </Link>
        </li>

        {/* Domain dropdown */}
        <li>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left p-2 hover:bg-blue-200 rounded"
          >
            Domain
          </button>
          {isOpen && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <Link
                  to="/domain"
                  className="block p-2 hover:bg-blue-100 rounded"
                >
                  Domain List
                </Link>
              </li>
              <li>
                <Link
                  to="/domain/new"
                  className="block p-2 hover:bg-blue-100 rounded"
                >
                  New Domain
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/mailbox" className="block p-2 hover:bg-blue-200 rounded">
            Mailbox
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
