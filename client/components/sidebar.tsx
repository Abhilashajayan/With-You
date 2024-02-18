"use client"
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger icon for small screens */}
      <div className="md:hidden">
        <button
          className="text-gray-500 p-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          )}
        </button>
      </div>
      <div
        className={`flex-none md:w-64 bg-white border-r ${isSidebarOpen ? 'block' : 'hidden'}`}
      >
        <div className="p-4 h-screen ">
          <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>
          <ul>
            <li className="mb-2">
              <Link href="/admin/dashboard" className='text-blue-500 hover:text-blue-600'>
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/users" className='text-blue-500 hover:text-blue-600'>
                Users
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/products" className='text-blue-500 hover:text-blue-600'>
               Products
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Welcome to the Admin Dashboard</h1>
          {/* Add your main content here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
