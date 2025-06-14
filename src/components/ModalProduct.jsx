import { Plus } from "lucide-react";
import React from "react";

const ModalProduct = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          {/* Nút đóng */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

          {/* Form thêm thương hiệu */}
          <h2 className=" font-semibold mb-4 text-2xl">
            {/* {isEditMode ? "Cập nhật thương hiệu" : "Thêm thương hiệu"} */}
            cap nhât || xóa
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Tên thương hiệu ||
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nhập tên thương hiệu..."
                //   onChange={(e) => setBrandName(e.target.value)}
                //   value={brandName}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Hình ảnh</label>
              <input
                type="file"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nhập tên thương hiệu..."
                //   onChange={(e) => {
                //     const file = e.target.files[0];
                //     if (file) {
                //       setImageFile(file);
                //       setPreviewImage(URL.createObjectURL(file));
                //     }
                //   }}
              />
              {/* {previewImage && ( */}
              <img
                // src={previewImage}
                src=""
                alt="Preview"
                className="mt-2 w-32 h-32 object-contain rounded border"
              />
              {/* )} */}
            </div>

            <button
              // onClick={handleSubmit}
              type="submit"
              className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 " />
              {/* {isEditMode ? "Cập nhật" : "Thêm"} */}
              cap nht hay xoa
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalProduct;
