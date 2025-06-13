import { useEffect, useState } from "react";
import {
  createBrand,
  deleteBrand,
  getAllBands,
  updateBrand,
} from "../services/brandService";
import Loading from "../components/Loading";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploadSingle from "../components/ImageUploadSingle";

const Brands = () => {
  // chế độ add ,edit
  const [isEditMode, setIsEditMode] = useState(false); // Đang ở chế độ sửa?
  // lưu id để edit
  const [editingBrandId, setEditingBrandId] = useState(null); // ID của brand đang sửa
  // ân hiện modal
  const [showModal, setShowModal] = useState(false);
  //ẩn hiện ảnh khi chọn ảnh
  const [previewImage, setPreviewImage] = useState(null);
  // set tên
  const [brandName, setBrandName] = useState("");
  //set ảnh
  const [imageFile, setImageFile] = useState(null);
  // set ngày tạo
  const date = new Date();
  const createdAt = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
  // hàm submit thêm sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrls = previewImage;
      if (imageFile) {
        imageUrls = await ImageUploadSingle(imageFile);
      }
      const brandData = {
        name: brandName,
        imagePath: imageUrls,
        createdAt: createdAt,
      };

      if (isEditMode) {
        // Gọi hàm cập nhật (bạn phải tạo trong `brandService.js`)
        await updateBrand(editingBrandId, brandData);
        toast.success("Cập nhật thương hiệu thành công!");
      } else {
        // Tạo mới
        await createBrand(brandData);
        toast.success("Thêm thương hiệu thành công!");
      }

      // Reset lại
      await listBrands();
      setShowModal(false);
      setIsEditMode(false);
      setEditingBrandId(null);
      setBrandName("");
      setPreviewImage(null);
      setImageFile(null);
    } catch (error) {
      console.error("Lỗi khi tạo thương hiệu:", error);
    }
  };
  // const navigate = useNavigate();
  const [brands, setBrands] = useState();
  //Lấy danh sách thương hiệu
  const listBrands = async () => {
    try {
      const result = await getAllBands();
      setBrands(result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thương hiệu:", error);
      setBrands([]);
    }
  };
  useEffect(() => {
    listBrands();
  }, []);
  // Xóa thương hiệu
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      try {
        await deleteBrand(id); // Gọi API xóa
        // Gọi lại danh sách nếu xóa thành công
        listBrands();
        toast.success("Xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa thương hiệu:", error);
        toast.error("Xóa thất bại!");
      }
    }
  };

  if (!brands) {
    // return <Loading />;
    return null;
  }
  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className=" lg:flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900 font-extrabold">
                Thương hiệu{" "}
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
                <span className="text-sm text-gray-600">
                  Jan 1 - Jan 30, 2024
                </span>
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
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4 " />
                Thêm
              </button>
              {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                    {/* Nút đóng */}
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      onClick={() => setShowModal(false)}
                    >
                      ✕
                    </button>

                    {/* Form thêm thương hiệu */}
                    <h2 className=" font-semibold mb-4 text-2xl">
                      {isEditMode ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
                    </h2>
                    <form>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Tên thương hiệu
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Nhập tên thương hiệu..."
                          onChange={(e) => setBrandName(e.target.value)}
                          value={brandName}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Hình ảnh
                        </label>
                        <input
                          type="file"
                          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Nhập tên thương hiệu..."
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setImageFile(file);
                              setPreviewImage(URL.createObjectURL(file));
                            }
                          }}
                        />
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-contain rounded border"
                          />
                        )}
                      </div>

                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                      >
                        <Plus className="w-4 h-4 " />
                        {isEditMode ? "Cập nhật" : "Thêm"}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

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
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {brands.map((brand) => (
                    <tr
                      key={brand.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {brand.id}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={brand.imagePath}
                            alt={brand.name}
                            className="w-full h-full object-contain "
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {brand.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-700 transition-colors duration-200"
                            title="Delete"
                            onClick={() => {
                              handleDelete(brand.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-yellow-600 transition-colors duration-200"
                            title="Edit"
                            onClick={() => {
                              setIsEditMode(true); // Bật chế độ sửa
                              setShowModal(true); // Mở modal
                              setEditingBrandId(brand.id); // Lưu ID
                              setBrandName(brand.name); // Gán tên thương hiệu vào input
                              setPreviewImage(brand.imagePath); // Xem trước hình ảnh
                              setImageFile(null); // Reset file
                            }}
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
      </div>
      <ToastContainer />
    </>
  );
};

export default Brands;
