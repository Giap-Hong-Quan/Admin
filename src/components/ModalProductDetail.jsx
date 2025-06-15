import React, { useEffect, useState } from "react";
import { getBrandById } from "../services/brandService";

const ModalProductDetail = ({ show, onClose, productById }) => {
  const [brandById, setBrandById] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      if (productById?.brandId) {
        try {
          const result = await getBrandById(productById.brandId);
          setBrandById(result);
        } catch (error) {
          console.error("Lỗi khi lấy thương hiệu:", error);
          setBrandById(null);
        }
      }
    };

    fetchBrand();
  }, [productById?.brandId]); // Gọi lại khi brandId thay đổi
  if (!productById || !show || !brandById) return null;
  // Tính tổng số lượng và số màu
  const colorCount = productById.listImageProduct
    ? Object.keys(productById.listImageProduct).length
    : 0;

  const totalQuantity = productById.listImageProduct
    ? Object.values(productById.listImageProduct).reduce((total, imgData) => {
        const sumPerImage = Object.values(imgData.listProductSize).reduce(
          (sum, sizeObj) => sum + sizeObj.quantity,
          0
        );
        return total + sumPerImage;
      }, 0)
    : 0;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl relative overflow-y-auto max-h-[90vh]">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* Tiêu đề */}
        <h2 className="font-semibold mb-6 text-2xl text-gray-800">
          Chi tiết sản phẩm
        </h2>

        <div className="space-y-6">
          {/* 3 trường: Tên - Giá - Brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Tên sản phẩm
              </label>
              <div className="w-full border px-3 py-2 rounded-md bg-gray-50 text-gray-800">
                {productById.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Giá sản phẩm
              </label>
              <div className="w-full border px-3 py-2 rounded-md bg-gray-50 text-gray-800">
                {productById.price}$
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Thương hiệu
              </label>
              <div className="w-full border px-3 py-2 rounded-md bg-gray-50 text-gray-800">
                {brandById.name}
              </div>
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Mô tả
            </label>
            <div className="w-full border px-3 py-2 rounded-md bg-gray-50 text-gray-800 min-h-[80px]">
              {productById.description}
            </div>
          </div>
          {/* Hình ảnh + Size + Số lượng */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Hình ảnh và thông tin size
            </label>

            {productById.listImageProduct &&
              Object.entries(productById.listImageProduct).map(
                ([key, imgData], index) => (
                  <div
                    key={key}
                    className="border p-4 rounded-md mb-4 flex flex-col md:flex-row gap-4"
                  >
                    {/* Cột trái: ảnh */}
                    <div>
                      <img
                        src={imgData.url}
                        alt={`Ảnh sản phẩm ${index + 1}`}
                        className="w-32 h-32 object-contain border rounded"
                      />
                    </div>

                    {/* Cột phải: size + số lượng */}
                    <div className="flex-1">
                      <h4 className="font-medium mb-2 text-gray-700">
                        Thông tin size và tồn kho:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.values(imgData.listProductSize).map(
                          (sizeObj, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                              <div className="text-sm text-gray-600">Size:</div>
                              <div className="border px-3 py-2 rounded-md bg-gray-50 text-center font-medium">
                                {sizeObj.size}
                              </div>
                              <div className="text-sm text-gray-600">
                                Số lượng:
                              </div>
                              <div className="border px-3 py-2 rounded-md bg-gray-50 text-center">
                                {sizeObj.quantity}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>

          {/* Thông tin tổng kết */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-800 mb-2">Tổng kết:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Tổng số lượng : </span>
                <span className="font-medium">{totalQuantity} sản phẩm</span>
              </div>
              <div>
                <span className="text-gray-600">Số màu sắc: </span>
                <span className="font-medium">{colorCount} màu</span>
              </div>
            </div>
          </div>

          {/* Nút đóng */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProductDetail;
