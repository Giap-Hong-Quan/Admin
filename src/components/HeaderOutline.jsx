import { Plus } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { menuItems } from "../libs/Contand";
import Modal from "./Modal";

const HeaderOutline = ({ showModal }) => {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className=" lg:flex items-center space-x-4">
          <h1 className="text-2xl text-gray-900 font-extrabold">
            {currentItem?.label || "Quản lý"}{" "}
          </h1>
          <div className=" flex items-center space-x-2 bg-gray-100 rounded-md lg:px-3 py-1.5">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 8h6m-6 4h6m2-8V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9z"
              />
            </svg>
            <span className="text-sm text-gray-600">Jan 1 - Jan 30, 2024</span>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div className="lg:flex items-center space-x-3 space-y-3 lg:space-y-0 ">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>In</span>
          </button>

          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <span>Thao tác</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={showModal}
            className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4 " />
            Thêm
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderOutline;
