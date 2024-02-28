import React from "react";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "./ui/DatePicker";
import { Button } from "@/components/ui/button"

const AddDetails: React.FC = () => {
  return (
    <>
      <div className="fixed bg-cover top-0 container right-0 left-0 w-screen h-full flex flex-col justify-center items-center">
        <div className="p-10">
          <h1 className="text-xl font-bold">Profile Details</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="overlay z-50 relative mb-4">
            <img
              className="w-44 h-44 mb-3 mb-10 rounded-full shadow-lg transition duration-300 ease-in-out transform group-hover:scale-110"
              src={
                "https://wallpapers.com/images/hd/iron-man-abstract-art-huwkamij9o3d3mt6.webp"
              }
              alt="Bonnie image"
            />
            <label htmlFor="fileInput" className="absolute mb-10 bottom-0 right-0">
              <AddAPhotoOutlinedIcon
                className="text-4xl text-white bg-gray-700 rounded-full p-1 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
            />
          </div>

          <Input type="Job" placeholder="Job Title" />
          <Input type="Place" className="mt-2" placeholder="Location" />
          <a className="mt-2">
          <DatePickerDemo  />
       
          </a>
          <Button className="mt-2 w-full bg-red-500">Confirm</Button>
        </div>
      </div>
    </>
  );
};

export default AddDetails;
