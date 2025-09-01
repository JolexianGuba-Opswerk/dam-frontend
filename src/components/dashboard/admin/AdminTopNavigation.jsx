import { NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCubes,
  FaHistory,
  FaList,
  FaUsers,
} from "react-icons/fa";
import { useState } from "react";
import LogoutModal from "../../modal/ConfirmLogout.jsx";

const TopNavigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-800">
              DevAssets
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="assets"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              <FaCubes className="mr-2" />
              Assets
            </NavLink>

            <NavLink
              to="employees"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              <FaUsers className="mr-2" />
              Employees
            </NavLink>

            <NavLink
              to="asset-history"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              <FaHistory className="mr-2" />
              Asset History
            </NavLink>

            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              <FaUserCircle className="mr-2" />
              Profile
            </NavLink>

            <button
              onClick={() => setIsModalOpen(true)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-900`}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </nav>
          <LogoutModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {/* Mobile menu button (can expand later for responsiveness) */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
