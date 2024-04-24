import React from "react";
import Skeleton from "react-loading-skeleton";

const ChatWindowSkeleton = () => {
  return (
    <div className="flex-1 bg-white p-6 md:w-2/3">
      <div className="md:flex md:flex-col md:w-2/3 md:h-full">
        <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton circle width={40} height={40} />
            <Skeleton width={100} height={20} style={{ marginLeft: "10px" }} />
          </div>
          <div className="flex items-center">
            <Skeleton circle width={40} height={40} style={{ marginRight: "10px" }} />
            <Skeleton circle width={40} height={40} style={{ marginRight: "10px" }} />
            <Skeleton circle width={40} height={40} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto mt-5 pb-16">
          {[...Array(5)].map((_, index) => (
            <div key={index} className={index % 2 === 0 ? "text-right mb-2" : "text-left mb-2"}>
              <div className={index % 2 === 0 ? "bg-pink-100 text-black rounded-lg py-2 px-4 inline-block" : "bg-red-100 text-black rounded-lg py-2 px-4 inline-block"}>
                <Skeleton width={100} height={20} />
                <Skeleton width={150} height={15} style={{ marginTop: "5px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:ml-1/3 md:overflow-y-auto sm:ml-0 md:w-full">
        <div className="fixed bottom-0 md:right-0 md:w-2/3 bg-white md:mb-[50px] border-gray-300 p-4 flex items-center">
          <div className="relative flex-1">
            <input type="text" placeholder="Your Message" className="w-full p-2 pl-12 border border-gray-200 rounded-lg focus:outline-none" />
          </div>
          <button className="px-4 py-2 border-red-500 border text-white rounded-lg ml-2">
            <Skeleton width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowSkeleton;
