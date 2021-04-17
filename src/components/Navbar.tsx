import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Dropdown, DropdownItem } from "@windmill/react-ui";

import api from "../utils/api";
import UserContext from "../context/UserContext";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/dashboard"
                  className="bg-purple-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/review"
                  className="text-gray-300 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Review
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  User Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-gray-300 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Points: {user?.points}
              </span>
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleDropdown}
                    type="button"
                    className="max-w-xs bg-purple-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="alt"
                    />
                  </button>
                  <Dropdown
                    align="right"
                    isOpen={dropdownOpen}
                    onClose={() => {}}
                  >
                    <Link to="/profile">
                      <DropdownItem className="justify-between">
                        <span>Profile</span>
                      </DropdownItem>
                    </Link>

                    <DropdownItem onClick={api.logout}>
                      <span>Logout</span>
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
