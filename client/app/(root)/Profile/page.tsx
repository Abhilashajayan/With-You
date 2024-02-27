"use client";
import React from "react";
import TabLayouts from "@/components/TabLayout";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

function page() {
  return (
    <TabLayouts>
      <div className=" overflow-hidden fixed bg-cover top-0 right-0 left-0 w-screen h-full">
        <div className="rounded-b-full shadow md:shadow-lg   h-2/3 w-full flex bg-white">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <img
              className="w-32 h-32 p-2 rounded-full ring-4 ring-red-500 dark:ring-gray-500"
              src="https://source.unsplash.com/200x300/?portrait&1"
              alt="Profile Avatar"
            />

            <h2 className="mt-4 text-xl font-semibold flex items-center">
              John Doe
              <VerifiedRoundedIcon className="text-blue-800 ml-1" />
            </h2>

            <div className="flex mt-4 space-x-4">
              <div className="flex flex-col items-center">
                <button className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center ring-2 ring-gray-300">
                  <AddAPhotoIcon />
                </button>
                <span className="mt-1 text-xs text-gray-500">Change Photo</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center ring-2 ring-gray-300">
                  <EditOutlinedIcon />
                </button>
                <span className="mt-1 text-xs text-gray-500">Edit Profile</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center ring-2 ring-gray-300">
                  <DeleteOutlineOutlinedIcon />
                </button>
                <span className="mt-1 text-xs text-gray-500">
                  Delete Profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabLayouts>
  );
}

export default page;
