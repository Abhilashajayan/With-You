'use client'

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";

 const banUser = async (userId : string) => {
    try {
       
        // if (response.status === 200) {
        // return response?.data?.updated
        // }
      } catch (error) {
        // const axiosError = error ;
        // if (axiosError.response) {
        //   const errorMessage = axiosError.response.data;
        //   return errorMessage;
        }
      }


type BanUserProps = {
    userId:string;
    status?:string;
}
const Banuser = ({userId , status } : BanUserProps) => {

// const router = useRouter();

    const handleBanUser = async() => {
      const response  :any=  await banUser(userId);
      if (response ) {
        window.location.reload();
      }
    }
const colorClass = status === "banned" ? "text-green-600" : "text-red-600";

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>

         {
            <span className={`text-sm ml-2 mt-1 ${colorClass}`} >{status === "active" ? "Ban user" : "Unblock user"}</span>
        } 
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            {/* <AlertDialogDescription>
              This user will be prohibited from all further and ongoing
              services.
            </AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-white bg-red-500" onClick={handleBanUser}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Banuser;