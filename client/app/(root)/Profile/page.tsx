"use client";
import React from "react";
import TabLayouts from "@/components/TabLayout";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";

function Page() {
  return (
    <TabLayouts>
      <div className="overflow-hidden fixed bg-cover top-0 right-0 left-0 w-screen h-full">
        <div className="rounded-b-full shadow backdrop-blur-xl md:shadow-lg h-2/3 w-full flex">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex space-x-10 justify-center items-center">
              <button className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center ring-2 ring-gray-300">
                <AddAPhotoIcon />
              </button>
              <img
                className="w-32 h-32 p-2 rounded-full ring-4 ring-red-500 dark:ring-gray-500 mb-4"
                src="https://source.unsplash.com/200x300/?portrait&1"
                alt="Profile Avatar"
              />
              <button className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center ring-2 ring-gray-300">
                <EditOutlinedIcon />
              </button>
            </div>

            <h2 className="text-xl font-semibold flex items-center mb-2">
              John Doe
              <span className="ml-2 text-sm text-gray-500">28</span>
              <VerifiedRoundedIcon className="text-blue-800 ml-1" />
            </h2>

            <div className="text-sm text-gray-500 mb-4">
              <div className="flex items-center justify-center mb-2">
                <div className="flex items-center rounded-full border p-1 border-gray-300">
                  <MaleOutlinedIcon className="mr-1 text-red-500" />
                </div>
                <span className="ml-2">Male</span>
              </div>

              <div className="flex p-5 justify-center">
                <div className="mr-6 border-r pr-6">
                  <div className="flex items-center">
                    <span className="mr-2">Work</span>
                  </div>
                  <span className="font-bold">Developer</span>
                </div>
                <div className="mr-6 border-r pr-6">
                  <div className="flex items-center">
                    <span className="mr-2">Age</span>
                  </div>
                  <span className="font-bold">29</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="mr-2">Location</span>
                  </div>
                  <span className="font-bold">India</span>
                </div>
              </div>
              <div className="p-5 space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                  Coding
                </span>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                  football
                </span>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                  dance
                </span>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                  singer
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
            hello
        </div>
      </div>
    </TabLayouts>
  );
}

export default Page;
