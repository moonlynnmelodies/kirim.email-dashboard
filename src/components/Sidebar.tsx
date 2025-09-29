import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="w-64 bg-gray-800 text-white shadow-md h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Kirim.Email</h2>

      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="flex items-center p-2 hover:bg-blue-200 rounded cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            Dashboard
          </Link>
        </li>

        {/* Domain dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("domain")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-200 rounded cursor-pointer"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mr-3">
                <path fill-rule="evenodd" d="M3.757 4.5c.18.217.376.42.586.608.153-.61.354-1.175.596-1.678A5.53 5.53 0 0 0 3.757 4.5ZM8 1a6.994 6.994 0 0 0-7 7 7 7 0 1 0 7-7Zm0 1.5c-.476 0-1.091.386-1.633 1.427-.293.564-.531 1.267-.683 2.063A5.48 5.48 0 0 0 8 6.5a5.48 5.48 0 0 0 2.316-.51c-.152-.796-.39-1.499-.683-2.063C9.09 2.886 8.476 2.5 8 2.5Zm3.657 2.608a8.823 8.823 0 0 0-.596-1.678c.444.298.842.659 1.182 1.07-.18.217-.376.42-.586.608Zm-1.166 2.436A6.983 6.983 0 0 1 8 8a6.983 6.983 0 0 1-2.49-.456 10.703 10.703 0 0 0 .202 2.6c.72.231 1.49.356 2.288.356.798 0 1.568-.125 2.29-.356a10.705 10.705 0 0 0 .2-2.6Zm1.433 1.85a12.652 12.652 0 0 0 .018-2.609c.405-.276.78-.594 1.117-.947a5.48 5.48 0 0 1 .44 2.262 7.536 7.536 0 0 1-1.575 1.293Zm-2.172 2.435a9.046 9.046 0 0 1-3.504 0c.039.084.078.166.12.244C6.907 13.114 7.523 13.5 8 13.5s1.091-.386 1.633-1.427c.04-.078.08-.16.12-.244Zm1.31.74a8.5 8.5 0 0 0 .492-1.298c.457-.197.893-.43 1.307-.696a5.526 5.526 0 0 1-1.8 1.995Zm-6.123 0a8.507 8.507 0 0 1-.493-1.298 8.985 8.985 0 0 1-1.307-.696 5.526 5.526 0 0 0 1.8 1.995ZM2.5 8.1c.463.5.993.935 1.575 1.293a12.652 12.652 0 0 1-.018-2.608 7.037 7.037 0 0 1-1.117-.947 5.48 5.48 0 0 0-.44 2.262Z" clipRule="evenodd" />
              </svg>
              Domain
            </span>

            <svg
              className={`w-4 h-4 transition-transform ${
                openDropdown === "domain" ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {openDropdown === "domain" && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <Link
                  to="/domain/management"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Management
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/domain/new"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  New Domain
                </Link>
              </li> */}
            </ul>
          )}
        </li>

        {/* Mailbox dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("mailbox")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-200 rounded cursor-pointer"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
              </svg>
              Mailbox
            </span>
            
            <svg
              className={`w-4 h-4 transition-transform ${
                openDropdown === "mailbox" ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {openDropdown === "mailbox" && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <Link
                  to="/mailbox/management"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Management
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/mailbox/new"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  New Mailbox
                </Link>
              </li> */}
            </ul>
          )}
        </li>
        

        {/* Security dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("security")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-200 rounded cursor-pointer"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>

              Security & Spam
            </span>
            
            <svg
              className={`w-4 h-4 transition-transform ${
                openDropdown === "security" ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {openDropdown === "security" && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <Link
                  to="/security/management"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Management
                </Link>
              </li>
              <li>
                <Link
                  to="/security/authentication"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Authentication
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Monitoring and Reports dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("monitoringAndReports")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-200 rounded cursor-pointer"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>

              Monitoring & Reports
            </span>
            
            <svg
              className={`w-4 h-4 transition-transform ${
                openDropdown === "monitoringAndReports" ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {openDropdown === "monitoringAndReports" && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <Link
                  to="/monitoring-and-reports/management"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Management
                </Link>
              </li>
             
            </ul>
          )}
        </li>

        


        {/* Billing dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("billing")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-200 rounded cursor-pointer"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>

              Billing
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${
                openDropdown === "billing" ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {openDropdown === "billing" && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <Link
                  to="/billing/management"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Management
                </Link>
              </li>
              <li>
                <Link
                  to="/billing/invoice"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Invoice
                </Link>
              </li>
            </ul>
          )}
        </li>


        {/* Developer Menu dropdown */}
        <li>
          <button
            onClick={() => toggleDropdown("developerMenu")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-200 rounded cursor-pointer"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>

              Developer Menu
            </span>
            
            <svg
              className={`w-4 h-4 transition-transform ${
                openDropdown === "developerMenu" ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {openDropdown === "developerMenu" && (
            <ul className="ml-4 mt-1 space-y-1">
              <li>
                <Link
                  to="/developer-menu/accounts"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Accounts
                </Link>
              </li>

              <li>
                <Link
                  to="/menu/new"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                  Role-based Access Control
                </Link>
              </li>

              <li>
                <Link
                  to="/developer-menu/activity-logs"
                  className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer"
                >
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-4"></span>
                    Activity Log
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
