import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAllBands } from "../services/brandService";
import ImageUploadSingle from "./ImageUploadSingle";
import { addProduct, updateProduct } from "../services/ProductService";
import { toast } from "react-toastify";

const ModalProductAddAndEdit = ({
  show,
  onClose,
  isEditMode,
  productById,
  onSubmitSuccess,
}) => {
  //   console.log(productById);
  const [brands, setBrands] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brandId, setBrandId] = useState("");
  const [images, setImages] = useState([]);
  // feact brands
  const getAllBrands = async () => {
    try {
      const result = await getAllBands();
      setBrands(result);
      console.log(result);
    } catch (err) {
      console.error("Lỗi lấy brand:", err);
    }
  };
  useEffect(() => {
    getAllBrands();
    if (isEditMode && productById) {
      setName(productById.name || "");
      setPrice(productById.price || "");
      setDescription(productById.description || "");
      setBrandId(productById.brandId?.toString() || "");
      const listImageObj = productById.listImageProduct || {};
      const formattedImages = Object.values(listImageObj).map((imgObj) => {
        const sizes = Object.values(imgObj.listProductSize || {}).map(
          (sizeData) => ({
            size: sizeData.size,
            quantity: sizeData.quantity,
          })
        );

        return {
          file: null,
          preview: imgObj.url,
          sizes,
        };
      });
      setImages(formattedImages);
      // Nếu cần load ảnh từ productById.images thì xử lý thêm
    } else {
      // Khi ở chế độ thêm
      setName("");
      setPrice("");
      setDescription("");
      setBrandId("");
      setImages([]);
    }
  }, [isEditMode, productById]);
  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra dữ liệu
      if (!name || !price || !description || !brandId) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }
      const listImageProduct = {}; // object chứa ảnh và size
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        let imageUrl = img.preview; // dùng sẵn nếu là ảnh từ server
        if (img.file) {
          // Nếu là ảnh mới chọn thì upload
          imageUrl = await ImageUploadSingle(img.file);
        }
        // Tạo key động kiểu "img1", "img2", ...
        const imgKey = `img${i + 1}`;

        // Tạo object listProductSize dạng { "40": { size: 40, quantity: 5 }, ... }
        const listProductSize = {};
        img.sizes.forEach((sizeObj) => {
          const sizeKey = sizeObj.size.toString();
          listProductSize[sizeKey] = {
            size: Number(sizeObj.size),
            quantity: Number(sizeObj.quantity),
          };
        });

        // Gắn vào listImageProduct
        listImageProduct[imgKey] = {
          url: imageUrl,
          listProductSize,
        };
      }

      const productData = {
        name,
        price: Number(price),
        description,
        brandId,
        listImageProduct,
        createAt: `${new Date().getDate().toString().padStart(2, "0")}-${(
          new Date().getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${new Date().getFullYear()}`,
      };
      if (isEditMode) {
        await updateProduct(productById.id, productData);
        toast.success("Cập nhật thương hiệu thành công!");
      } else {
        await addProduct(productData);
        toast.success("Thêm thương hiệu thành công!");
      }
      if (onSubmitSuccess) onSubmitSuccess();
      // Đóng modal
      onClose();
    } catch (error) {
      console.error("Lỗi khi submit:", error);
      alert("Đã xảy ra lỗi khi thêm/cập nhật sản phẩm.");
    }
  };
  if (!show) return null;
  if (isEditMode && !productById) return null;
  // Thêm ảnh mới
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        file, //ảnh
        preview: URL.createObjectURL(file), // tạo đường dẫn để hiển thị ảnh tạm thời
        sizes: [{ size: "", quantity: "" }], // tạo 1 size trống ban đầu
      };
      setImages([...images, newImage]); // thêm vào mảng images
    }
  };
  //Hàm xử lý khi người dùng nhập size
  const handleSizeChange = (imgIndex, sizeIndex, key, value) => {
    const updatedImages = [...images]; // sao chép
    updatedImages[imgIndex].sizes[sizeIndex][key] = value; // cập nhật key ('size' hoặc 'quantity') tại vị trí ảnh và size tương ứng
    setImages(updatedImages); // cập nhật lại state
  };
  //Thêm một dòng size mới cho ảnh đang xét
  const handleAddSize = (imgIndex) => {
    const updatedImages = [...images];
    updatedImages[imgIndex].sizes.push({ size: "", quantity: "" }); // thêm một cặp size rỗng mới
    setImages(updatedImages);
  };
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
        <h2 className="font-semibold mb-6 text-2xl">
          {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </h2>

        <form className="space-y-6">
          {/* 3 trường: Tên - Giá - Brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tên sản phẩm
              </label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nhập tên sản phẩm..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Giá sản phẩm($)
              </label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nhập giá..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Thương hiệu
              </label>
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <option value="">-- Chọn brand --</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập mô tả..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Ảnh + size + số lượng */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hình ảnh + Size + Số lượng
            </label>
            <input
              type="file"
              className="mb-4 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleAddImage}
            />

            {images.map((img, imgIndex) => (
              <div
                key={imgIndex}
                className="border p-4 rounded-md mb-4 flex flex-col md:flex-row gap-4"
              >
                {/* Cột trái: ảnh */}
                <div>
                  <img
                    src={img.preview}
                    alt={`Preview ${imgIndex}`}
                    className="w-32 h-32 object-contain border rounded"
                  />
                </div>

                {/* Cột phải: size + quantity */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {img.sizes.map((sizeObj, sizeIndex) => (
                      <div key={sizeIndex} className="flex flex-col gap-1">
                        <input
                          type="number"
                          placeholder="Size"
                          value={sizeObj.size}
                          onChange={(e) =>
                            handleSizeChange(
                              imgIndex,
                              sizeIndex,
                              "size",
                              e.target.value
                            )
                          }
                          className="border px-3 py-2 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="Số lượng"
                          value={sizeObj.quantity}
                          onChange={(e) =>
                            handleSizeChange(
                              imgIndex,
                              sizeIndex,
                              "quantity",
                              e.target.value
                            )
                          }
                          className="border px-3 py-2 rounded-md"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddSize(imgIndex)}
                    className="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    + Thêm size
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nút submit */}
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <Plus className="w-5 h-5" />
              {isEditMode ? "Cập nhật" : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProductAddAndEdit;
