import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar  />
        <div className="w-full">
          <Header />
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default AdminLayout;
