import ApiAdmin from "../api/ApiAdmin";
//lấy hết dữ liệu
// 1. Get all products
export const getAllProducts = async () => {
  const result = await ApiAdmin.get("products.json");
  const data = result.data;
  return Object.keys(data || {}).map((key) => ({
    id: key,
    ...data[key],
  }));
};
// 2. Get product by ID
export const getProductById = async (id) => {
  const result = await ApiAdmin.get(`products/${id}.json`);
  return result.data;
};
// 3. Add product
export const addProduct = async (productData) => {
  // 1. Gửi POST để thêm sản phẩm mới
  const res = await ApiAdmin.post("products.json", productData);
  const generatedId = res.data.name; // Firebase trả về id (tên key)
  await ApiAdmin.patch(`products/${generatedId}.json`, { id: generatedId });
  return { ...productData, id: generatedId };
};
// 4. Update product
export const updateProduct = async (id, productData) => {
  await ApiAdmin.patch(`products/${id}.json`, productData);
};

// 5. Delete product
export const deleteProducts = async (id) => {
  await ApiAdmin.delete(`products/${id}.json`);
};
