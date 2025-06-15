import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Brands from "../pages/Brands";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Users from "../pages/Users";

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "brands", element: <Brands /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
    ],
  },
]);
export default router;
