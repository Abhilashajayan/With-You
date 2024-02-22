import React, { ReactNode } from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layouts: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="bg-primary flex-1 p-4 bg-white text-black">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layouts;
