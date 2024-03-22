"use client";
import React from "react";
import Layouts from "@/components/Layout";
import { Tables } from "@/components/Table";

export default function Users() {
  return (
    <Layouts>
      <h1 className="text-gray-500 p-5">Users</h1>
      <div className="p-10 overflow-x-auto overflow-y-auto max-h-[500px]">
        {/* Add max height and overflow properties to enable scrolling */}
        <Tables />
      </div>
    </Layouts>
  );
}
