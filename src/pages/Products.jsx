import React, { useEffect, useState } from "react";
import HeaderOutline from "../components/HeaderOutline";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteProducts,
  getAllProducts,
  getProductById,
} from "../services/ProductService";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ModalProductAddAndEdit from "../components/ModalProductAddAndEdit";
import ModalProductDetail from "../components/ModalProductDetail";
import { getAllBands } from "../services/brandService";

const Products = () => {
  // chế độ sửa
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  //set du lieu product
  const [products, setProducts] = useState();
  //set product id
  const [productById, setProductById] = useState();

  //Lấy danh sách sản phẩm
  const listProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thương hiệu:", error);
      setProducts([]);
    }
  };
  // getbyid
  const getProductId = async (id) => {
    try {
      const result = await getProductById(id);
      setProductById(result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thương hiệu:", error);
      setProductById({});
    }
  };
  useEffect(() => {
    listProducts();
  }, []);

  // trền qua modal để gọi lại list
  const handleAfterSubmit = () => {
    listProducts(); // Gọi lại danh sách sản phẩm
    setShowModal(false); // Ẩn modal sau khi thêm/sửa xong
  };
  // hàm xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      try {
        await deleteProducts(id);
        listProducts();
        toast.success("Xóa thành công ");
      } catch (error) {
        console.error("Lỗi khi xóa thương hiệu:", error);
        toast.error("Xóa thất bại!");
      }
    }
    await deleteProducts(id);
  };

  // get brands
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const result = await getAllBands();
        setBrands(result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách brands:", error);
      }
    };

    fetchBrands();
  }, []);
  if (!products || !brands) return null;
  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 ">
        <div className="max-w-7xl mx-auto">
          {/* headerOuline  */}
          <HeaderOutline
            showModal={() => setShowModal(true)}
            isEditMode={() => setIsEditMode(false)}
          />
          <ModalProductAddAndEdit
            show={showModal}
            onClose={() => setShowModal(false)}
            isEditMode={isEditMode}
            productById={productById}
            onSubmitSuccess={handleAfterSubmit}
          />
          <ModalProductDetail
            show={showModalDetail}
            onClose={() => setShowModalDetail(false)}
            productById={productById}
          />
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
                      Thương hiệu
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
                  {products.map((product, index) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index+1}
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
                        {product.price}$
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {brands.find((brand) => brand.id === product.brandId)
                          ?.name || "Không rõ"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {product.createAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="p-1.5 text-gray-400 hover:text-green-600 transition-colors duration-200"
                            title="Delete"
                            onClick={() => {
                              setShowModalDetail(true);
                              getProductId(product.id);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-yellow-600 transition-colors duration-200"
                            title="Edit"
                            onClick={() => {
                              setIsEditMode(true); // Bật chế độ sửa
                              setShowModal(true); // Mở modal
                              getProductId(product.id);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-700 transition-colors duration-200"
                            title="Delete"
                            onClick={() => {
                              handleDeleteProduct(product.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
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
