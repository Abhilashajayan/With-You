import React, { ReactNode } from "react";
import Home from "./TabBarData";

interface LayoutProps {
  children: ReactNode;
}

const TabLayouts: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="bg-primary p-4 bg-white text-black">
          {children}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white  flex justify-center items-center">
        <Home />
      </div>
    </div>
  );
};


export default TabLayouts;
