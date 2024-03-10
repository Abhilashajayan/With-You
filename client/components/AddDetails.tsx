import React, { useState } from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "./ui/DatePicker";
import { Button } from "@/components/ui/button";
import { editUserProfile } from "@/axios/axiosConfig";
import { useAppSelector } from "@/features/hooks";
import { useAppDispatch } from "@/features/hooks";
import { updateProfile } from "@/features/auth/authSlice";

const AddDetails: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const dispatch = useAppDispatch();
  const user:any = useAppSelector((state) => state.auth.user);
  const [formData, setFormData]:any = useState({
    job: "",
    location: "",
    dob: "",
    gender: "",
    interest:[],
    phone: "",
    profilePicture: ""
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: URL.createObjectURL(file),
        uploadPic: file,
      });
    }

  }
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
  
      const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
      
      setFormData({
        ...formData,
        dob: formattedDate,
      });
    } else {
      console.log("No date selected");
    }
  };
  
console.log(formData);
  const handleNext = () => {
      setCurrentStep(currentStep + 1);
  };


  const handleSubmit = async () => {
   
      try {
        const userId = user.id;
        console.log(formData,"the form data");
        const result = await editUserProfile(userId, formData);
        dispatch(updateProfile(result.dataUser));
      } catch (error) {
        console.error("Error during form submission:", error);
      }
  };

  return (
    <>
      <div className="fixed bg-cover top-0 container right-0 left-0 w-screen h-full flex flex-col justify-center items-center">
    
        <div className="flex flex-col items-center">
          <div className="overlay z-50   relative  mb-4">
          <img
              className="w-44 h-44 mb-3 rounded-full shadow-lg  transition duration-300 ease-in-out transform group-hover:scale-110"
              src={
                formData.profilePicture ||"https://wallpapers.com/images/hd/iron-man-abstract-art-huwkamij9o3d3mt6.webp"
              }
              alt="Bonnie image"
            />
          
          </div>
          <input
              type="file"
              accept="image/*"
              name="profilePicture"
              id="file_input"
              onChange={handleFileChange}
            />
          {currentStep === 1 && (
            <>
              <Input
                type="Job"
                className="mt-2"
                value={formData.job}
                placeholder="Job Title"
                onChange={(e) => handleInputChange("job", e.target.value)}
              />
              <Input
                type="location"
                className="mt-2"
                value={formData.location}
                placeholder="Location"
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
              <a className="mt-2 w-full ">
              <DatePickerDemo onDateSelect={handleDateSelect}  />
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
              <Button className="mt-2 w-full bg-red-500" onClick={handleSubmit}>
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
