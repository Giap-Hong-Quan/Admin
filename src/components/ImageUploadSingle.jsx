import axios from "axios";

const ImageUploadSingle = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mobile");
  formData.append("folder", "mobile");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dglzu3rsm/image/upload",
      formData
    );
    return res.data.secure_url;
  } catch (error) {
    console.error("Upload ảnh lỗi:", error);
    throw error;
  }
};

export default ImageUploadSingle;
