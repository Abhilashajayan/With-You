import React from "react";
import { FaUserAlt, FaEnvelopeOpen } from "react-icons/fa";
import { IconBaseProps } from "react-icons/lib";

const Navbar: React.FC = () => {
  const iconSize: IconBaseProps["size"] = 24;

  return (
    <nav className="bg-white p-4 flex">
      <div className="flex items-center justify-between w-full">
        <div className="items-end space-x-4 flex justify-end w-full">
          <a href="/" className="text-black mr-4">
            <FaEnvelopeOpen size={iconSize} />
          </a>
          <a href="/" className="text-black">
            <FaUserAlt size={iconSize} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
