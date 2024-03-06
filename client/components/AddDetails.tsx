import React, { useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "./ui/DatePicker";
import { Button } from "@/components/ui/button";

const AddDetails: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    job: "",
    place: "",
    dateOfBirth: "",
    gender: "",
    interest: "",
    phone: "",
  });

  const handleInputChange = (type: string, value: string) => {
    setFormData({
      ...formData,
      [type]: value,
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; 
      const year = selectedDate.getFullYear();
  
      console.log(`Selected date: ${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`);
    } else {
      console.log("No date selected");
    }
  };
  
console.log(formData);
  const handleNext = () => {
      setCurrentStep(currentStep + 1);
  };

  const validateFormData = (): boolean => {
    return (
      formData.job.trim() !== "" &&
      formData.place.trim() !== "" &&
      formData.dateOfBirth.trim() !== "" &&
      formData.gender.trim() !== "" &&
      formData.interest.trim() !== "" &&
      formData.phone.trim() !== ""
    );
  };

  return (
    <>
      <div className="fixed bg-cover top-0 container right-0 left-0 w-screen h-full flex flex-col justify-center items-center">
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

          {currentStep === 1 && (
            <>
              <Input
                type="Job"
                value={formData.job}
                placeholder="Job Title"
                onChange={(e) => handleInputChange("job", e.target.value)}
              />
              <Input
                type="Place"
                className="mt-2"
                value={formData.place}
                placeholder="Location"
                onChange={(e) => handleInputChange("place", e.target.value)}
              />
              <a className="mt-2">
              <DatePickerDemo onDateSelect={handleDateSelect} />
              </a>
              <Button className="mt-2 w-full bg-red-500" onClick={handleNext}>
                Next
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <label htmlFor="genderSelect" className="mt-2">
                Gender
              </label>
              <select
                id="genderSelect"
                className="w-full p-2 border rounded"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <Input
                type="Interest"
                className="mt-2 w-full"
                value={formData.interest}
                placeholder="Interest"
                onChange={(e) => handleInputChange("interest", e.target.value)}
              />
              <Input
                type="Phone"
                className="mt-2"
                value={formData.phone}
                placeholder="Phone Number"
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              <Button className="mt-2 w-full bg-red-500" onClick={handleNext}>
                Submit
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddDetails;
