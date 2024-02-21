import React from "react";
import Layouts from "@/components/Layout";
import { ExampleChart } from "@/components/Chart";
import { FaMoneyBill, FaUsers, FaDollarSign, FaUser } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <>
      <Layouts>
        <div className="">
          <h1 className="text-gray-500 p-5 ">Dashboard</h1>
          <div className="flex space-x-8 p-5">
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <FaMoneyBill className="mr-2" />
              Today's Amount
            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <FaUsers className="mr-2" />
              Total Users
            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <FaDollarSign className="mr-2" />
              Total Amount
            </div>
            <div className="p-6 mt-7 border border-gray-500 w-[200px] h-[70px] rounded-lg flex items-center justify-center">
              <FaUser className="mr-2" />
              Total Users
            </div>
          </div>

          <div className=" mt-7 flex justify-center p-5">
            <ExampleChart />
          </div>
        </div>
      </Layouts>
    </>
  );
};

export default Dashboard;
