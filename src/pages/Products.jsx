import React, { useEffect, useState } from "react";
import HeaderOutline from "../components/HeaderOutline";
import { ToastContainer } from "react-toastify";
import ModalProduct from "../components/ModalProduct";
import { getAllProducts } from "../services/ProductService";
import { Eye, Pencil, Trash2 } from "lucide-react";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  //set du lieu product
  const [products, setProducts] = useState();
  //Lấy danh sách sản phẩm
  const listProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
      console.log(result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thương hiệu:", error);
      setProducts([]);
    }
  };
  useEffect(() => {
    listProducts();
  }, []);
  if (!products) return null;
  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 ">
        <div className="max-w-7xl mx-auto">
          {/* headerOuline  */}
          <HeaderOutline showModal={() => setShowModal(true)} />
          <ModalProduct show={showModal} onClose={() => setShowModal(false)} />
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="max-h-[505px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hình ảnh
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tên
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Giá tiền
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.id}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          {Object.entries(product.listImageProduct).map(
                            ([key, value]) => (
                              <img
                                key={key}
                                src={value.url}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            )
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {product.createAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="p-1.5 text-gray-400 hover:text-green-600 transition-colors duration-200"
                            title="Delete"
                            // onClick={() => {
                            //   handleDelete(product.id);
                            // }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-700 transition-colors duration-200"
                            title="Delete"
                            // onClick={() => {
                            //   handleDelete(product.id);
                            // }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-yellow-600 transition-colors duration-200"
                            title="Edit"
                            // onClick={() => {
                            //   setIsEditMode(true); // Bật chế độ sửa
                            //   setShowModal(true); // Mở modal
                            //   setEditingproductId(product.id); // Lưu ID
                            //   setproductName(product.name); // Gán tên thương hiệu vào input
                            //   setPreviewImage(product.imagePath); // Xem trước hình ảnh
                            //   setImageFile(null); // Reset file
                            // }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* oulint pproduct */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Products;
