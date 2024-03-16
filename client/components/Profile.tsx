"use client";
import React, { useState, useEffect } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import { useAppSelector } from "@/features/hooks";
import { FormData } from "@/types/formData";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteCookie } from "@/features/authCookies";
import { setLogout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/features/hooks";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { DialogDemo } from "./editProfiles";

const ProfileComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userData, setUserData]: any = useState({});
  // const params = useParams<{ tag: string; userId: string }>();
  const user: any = useAppSelector((state) => state.auth.user);
  console.log(user, "the data");
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      setUserData(user as FormData);
    }
    const dobString = user?.dob;
    const dobDate = new Date(dobString);
    const today = new Date();
    let ageDiff = today.getFullYear() - dobDate.getFullYear();
    if (
      today.getMonth() < dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() &&
        today.getDate() < dobDate.getDate())
    ) {
      ageDiff--;
    }

    setAge(ageDiff);
  }, [user]);



  const handleLogout = async () => {
    await deleteCookie();
    dispatch(setLogout());
    router.push("/signup");
    toast({
      variant: "destructive",
      description: "Logouted Successfully",
    });
  };

  return (
    <div className="overflow-hidden fixed bg-cover top-0 right-0 left-0 w-screen h-full">
      <div className="rounded-b-full shadow backdrop-blur-xl md:shadow-lg h-2/3 w-full flex">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="flex space-x-10 justify-between items-center absolute top-2 right-2 left-2">
            <a className="hover:animate-spin p-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </a>
            <button
              className="w-10 h-10 text-red-500 p-5 flex items-center justify-center "
              onClick={handleLogout}
            >
              <LogoutIcon />
            </button>
          </div>
          <div className="flex space-x-10 justify-center items-center">
            <button className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center ring-2 ring-gray-300">
              <AddAPhotoIcon />
            </button>
            <img
              className="w-32 h-32 p-2 rounded-full ring-4 ring-red-500 dark:ring-gray-500 mb-4"
              src={userData?.profilePicture}
              alt="Profile Avatar"
            />
            <a
              className="w-10 h-10 text-red-500 rounded-full flex items-center justify-center ring-2 ring-gray-300"
              
            >
              <DialogDemo />
             
            </a>
          </div>

          <h2 className="text-xl font-semibold flex items-center mb-2">
            {userData?.username}
            <span className="ml-2 text-sm text-gray-500">{age}</span>
            <VerifiedRoundedIcon className="text-blue-800 ml-1" />
          </h2>

          <div className="text-sm text-gray-500 mb-4">
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center rounded-full border p-1 border-gray-300">
                {userData?.gender == "Male" ? (
                  <MaleOutlinedIcon className="mr-1 text-red-500" />
                ) : (
                  <FemaleOutlinedIcon className="mr-1 text-red-500" />
                )}
              </div>
              <span className="ml-2">{userData?.gender}</span>
            </div>

            <div className="flex p-5 justify-center">
              <div className="mr-6 border-r pr-6">
                <div className="flex items-center">
                  <span className="mr-2">Work</span>
                </div>
                <span className="font-bold">{userData?.job}</span>
              </div>
              <div className="mr-6 border-r pr-6">
                <div className="flex items-center">
                  <span className="mr-2">Age</span>
                </div>
                <span className="font-bold">{age}</span>
              </div>
              <div>
                <div className="flex items-center">
                  <span className="mr-2">Location</span>
                </div>
                <span className="font-bold">{userData?.location}</span>
              </div>
            </div>
            <div className="p-5 space-x-2 justify-center flex">
              {Array.isArray(userData?.interest)
                ? userData.interest.map((interest: string, index: number) =>
                    interest
                      .split(",")
                      .map((individualInterest, innerIndex) => (
                        <span
                          key={`${index}-${innerIndex}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full ring-1 ring-blue-300 text-red-500 text-black text-xs font-semibold"
                        >
                          {individualInterest.trim()}
                        </span>
                      ))
                  )
                : typeof userData?.interest === "string" &&
                  userData.interest
                    .split(",")
                    .map((interest: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-black text-xs font-semibold"
                      >
                        {interest.trim()}
                      </span>
                    ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-6">
        <div
          className="grid grid-cols-2 gap-4  lg:grid-cols-3 md:grid-cols-3 overflow-y-auto"
          style={{ maxHeight: "400px" }}
        >
          <div>
            <img
              className="object-cover w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="object-cover object-center w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="object-cover w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="object-cover object-center w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="object-cover w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="object-cover object-center w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="object-cover w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt="gallery-photo"
            />
          </div>
          <div>
            <img
              className="object-cover object-center w-full h-40 max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              alt="gallery-photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
