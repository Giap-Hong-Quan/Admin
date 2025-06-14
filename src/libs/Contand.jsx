import { BarChart3, Package, ShoppingCart, Tag } from "lucide-react";

export const menuItems = [
  {
    path: "/",
    label: "Thống kê",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
  },
  {
    path: "/brands",
    label: "Thương hiệu",
    icon: Tag,
    color: "from-purple-500 to-pink-500",
  },
  {
    path: "/products",
    label: "Sản phẩm",
    icon: Package,
    color: "from-green-500 to-emerald-500",
  },
  {
    path: "/orders",
    label: "Đơn hàng",
    icon: ShoppingCart,
    color: "from-yellow-500 to-orange-500",
  },
];