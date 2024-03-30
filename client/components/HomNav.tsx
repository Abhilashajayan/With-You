import React from 'react';
import FilterIcons from './icons/FilterIcon';
import BackIcon from './icons/BackIcons';

const HomeNavbar = () => {
  return (
    <nav className=" relative top-0 w-full  ">
      <div className="container mx-auto relative z-10">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <BackIcon />
          </div>
          <div className="text-center">
            <span className="font-bold text-gray-800 text-xl">Discover</span>
            <span className="text-sm text-gray-400 block">india</span>
          </div>
          <div className="flex items-center">
            <FilterIcons />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
