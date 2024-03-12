"use client";
import React from "react";
import Layouts from "@/components/Layout";
import { DataTableDemo } from "@/components/Table";

export default function Users() {
  return (
    <Layouts>
      <h1 className="text-gray-500 p-5">Users</h1>
      <div className="p-10">
        <DataTableDemo />
      </div>
    </Layouts>
  );
}
