"use client";
import React from "react";
import TabLayouts from "@/components/TabLayout";
import ProfileComponent from "@/components/Profile";


const  Page:React.FC = () => {
  return (
    <>
    <TabLayouts>
        <ProfileComponent />
    </TabLayouts>
    </>
  );
}

export default Page;
