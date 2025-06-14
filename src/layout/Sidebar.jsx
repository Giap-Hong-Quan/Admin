import {
  ChevronRight,
  BarChart3,
  Tag,
  Package,
  ShoppingCart,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../libs/Contand";

const Sidebar = () => {
  // thay vì set usestate khi load lại sẽ qua về / mặc định thì dùng thgthg useLocation khi load không quay về
  // const [activeItem, setActiveItem] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <aside
        className={`hidden sm:block 
        relative top-0 left-0 h-screen w-90 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
        shadow-2xl z-40 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0 backdrop-blur-xl bg-black/10"></div>
        <div className="relative z-10 h-full flex flex-col">
          <div className="h-0"></div>
          <div className="p-5 md:p-[22px] border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white rounded opacity-90"></div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Quản trị viên </h2>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 ">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const color = item.color;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                  }}
                  className={`
                   w-full group relative overflow-hidden rounded-xl p-4 text-left
                    transition-all duration-300 transform hover:scale-[1.02]  ${
                      isActive
                        ? `bg-gradient-to-r ${color} text-white shadow-md scale-[1.03]`
                        : ""
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-300  `}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight
                      className={` w-4 h-4 transition-all duration-300  `}
                    />
                  </div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-center text-xs text-gray-400">
              <p className="mb-1">Admin Dashboard v2.0</p>
              <p className="text-blue-300/60">© 2025 Your Company</p>
            </div>
          </div>
        </div>
        {/* Right border gradient */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
      </aside>
    </>
  );
};

export default Sidebar;
