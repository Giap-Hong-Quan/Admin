import { useEffect, useState } from "react";
import { getAllBands } from "../services/brandService";
import Loading from "../components/Loading";

const Brands = () => {
  const [brands, setBrands] = useState();
  useEffect(() => {
    const fetchBrands = async () => {
      const result = await getAllBands();
      setBrands(result);
    };
    fetchBrands();
  }, []);
  if (!brands) {
    return <Loading />;
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Danh sách thương hiệu
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá các thương hiệu hàng đầu với chất lượng và uy tín được
              khách hàng tin tưởng
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands;
