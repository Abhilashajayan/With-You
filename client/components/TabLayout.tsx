import React, { ReactNode } from "react";
import Home from "./TabBarData";

interface LayoutProps {
  children: ReactNode;
}

const TabLayouts: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex-1 bg-primary p-4 bg-white text-black">
        {children}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-center items-center">
        <Home />
      </div>
    </div>
  );
};

export default TabLayouts;
