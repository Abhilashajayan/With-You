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
import { banUser } from "@/axios/axiosConfig";
import { useRouter } from "next/navigation";



type BanUserProps = {
    userId:string;
    status?:boolean;
}
const Banuser = ({userId , status } : BanUserProps) => {
    const handleBanUser = async() => {
      const response  :any=  await banUser(userId);
      if (response ) {
        window.location.reload();
      }
    }
const colorClass = status == true ? "text-green-600" : "text-red-600";

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>

         {
            <span className={`text-sm ml-2 mt-1 ${colorClass}`} >{status == true ? "Unblock User" : "BlockUser"}</span>
        } 
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This user will be prohibited from all further and ongoing
              services.
            </AlertDialogDescription>
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