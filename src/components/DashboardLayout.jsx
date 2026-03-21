import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex w-full bg-[#E6F4F1]">
      <Sidebar />

      <div className="ml-[280px] h-screen w-[calc(100%-280px)] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;