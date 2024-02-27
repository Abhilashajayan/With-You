import React, { ReactNode } from "react";
import Home from "./TabBarData";


interface LayoutProps {
  children: ReactNode;
}

const TabLayouts: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex  items-center justify-center">
      <div className="bg-primary p-4  w-full md:w-auto bg-white text-black">
          {children}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white flex justify-center items-center">
        <Home />
      </div>
    </div>
  );
};

export default TabLayouts;
