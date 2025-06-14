import ApiAdmin from "../api/ApiAdmin";
//lấy hết dữ liệu
export const getAllProducts = async () => {
  const result = await ApiAdmin.get("products.json");
  const data = result.data;
  return Object.keys(data || {}).map((key) => data[key]);
};
