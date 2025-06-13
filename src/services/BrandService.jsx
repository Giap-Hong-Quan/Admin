import ApiAdmin from "../api/ApiAdmin";

// lấy tất cả dữ liệu
export const getAllBands = async () => {
  const result = await ApiAdmin.get("brands.json");
  const data = result.data;
  return Object.keys(data || {}).map((key) => data[key]);
};
// ✅ Lấy 1 brand theo id
export const getBrandById = async (id) => {
  const res = await ApiAdmin.get(`brands/${id}.json`);
  return res.data;
};
// ✅ Tạo brand mới
export const createBrand = async (brand) => {
  const res = await ApiAdmin.post("brands.json", brand);
  const generatedId = res.data.name; // Firebase trả về key tự tạo
  await ApiAdmin.patch(`brands/${generatedId}.json`, { id: generatedId }); // cập nhật id cho trường id
  return { ...brand, id: generatedId };
};
// ✅ Cập nhật brand theo id
export const updateBrand = async (id, updatedBrand) => {
  await ApiAdmin.patch(`brands/${id}.json`, updatedBrand);
  return updatedBrand;
};

// ✅ Xoá brand theo id
export const deleteBrand = async (id) => {
  await ApiAdmin.delete(`brands/${id}.json`);
  return id;
};
