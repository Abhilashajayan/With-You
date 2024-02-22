import React from "react";
import { FaUserAlt, FaEnvelopeOpen } from "react-icons/fa";
import { IconBaseProps } from "react-icons/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const Navbar: React.FC = () => {
  const iconSize: IconBaseProps["size"] = 15;

  return (
    <nav className="bg-white p-4 flex">
      <div className="flex items-center justify-between w-full">
        <div className="items-end space-x-4 flex justify-end w-full">
          <a href="/" className="text-black mb-2 mr-4">
            <FaEnvelopeOpen  className="text-gray-400 " size={iconSize} />
          </a>
          <Avatar>
             <AvatarImage className="w-10 h-10" src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
             </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
