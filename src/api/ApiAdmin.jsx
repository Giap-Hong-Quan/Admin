import axios from "axios";

const ApiAdmin = axios.create({
  baseURL: "https://shosestore-7c86e-default-rtdb.firebaseio.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default ApiAdmin;
