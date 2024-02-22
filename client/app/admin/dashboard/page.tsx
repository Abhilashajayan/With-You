import React from "react";
import Layouts from "@/components/Layout";
import { ExampleChart } from "@/components/Chart";
import { FaMoneyBill, FaUsers, FaDollarSign, FaUser } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <>
      <Layouts>
        <div className="">
          <h1 className="text-gray-500 p-5">Dashboard</h1>
          <div className="flex space-x-8 p-5">
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <div className="bg-green-500 w-[30px] h-[30px] flex items-center justify-center rounded-full mr-2">
                <a href="" className="text-white">
                  <FaMoneyBill />
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Today's Amount</p>
                <p className="text-md font-bold">500</p>
              </div>
            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <div className="bg-green-500 w-[30px] h-[30px] flex items-center justify-center rounded-full mr-2">
                <FaUsers className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-md font-bold">1000</p>
              </div>
            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <div className="bg-green-500 w-[30px] h-[30px] flex items-center justify-center rounded-full mr-2">
                <FaDollarSign className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-md font-bold">2000</p>
              </div>
            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <div className="bg-green-500 w-[30px] h-[30px] flex items-center justify-center rounded-full mr-2">
                <FaUser className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-md font-bold">500</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex justify-center p-5">
            <ExampleChart />
          </div>
        </div>
      </Layouts>
    </>
  );
};

export default Dashboard;
