import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <Outlet />
        </div>
      </div>
     
    </div>
  );
};

export default AdminLayout;
