import React from "react";
import Layouts from "@/components/Layout";
import { ExampleChart } from "@/components/Chart";


const Dashboard: React.FC = () => {
  return (
    <>
      <Layouts>
        <div className="bg-gray-100">
          <h1 className="text-gray-500 p-5 ">Dashboard</h1>
          <div className="flex space-x-8 p-5">
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px]  rounded-lg">

            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px]  rounded-lg">

            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px]  rounded-lg">

            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px]  rounded-lg">

            </div>
          </div>

          <div className="bg-gray-100 mt-7 flex justify-center p-5">
            <ExampleChart />
          </div>
        </div>
      </Layouts>
    </>
  );
};

export default Dashboard;
