import { Bell, Search, User, Settings, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
   const [open, setOpen] = useState(false);
  const raw = localStorage.getItem("token");
  const data = raw ? JSON.parse(raw) : null;
  console.log(data.name)
  return (
    <header className=" bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl">
      <div className="  bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      <div className=" inset-0 backdrop-blur-sm bg-black/10"></div>
      <div className=" z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1/2 items-center space-x-4">
              <button className="top-4 left-4 z-50 p-2 rounded-lg bg-white text-black backdrop-blur-sm shadow-lg">
                {/* <X className="w-5 h-5" /> :  */}
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm dashboard..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                  />
                </div>
              </div> 
          </div>
          <div className="flex items-center space-x-3 ">
            <button className="md:hidden p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            <button className="relative p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              </span>
            </button>
            {/* Settings */}
            <button className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm group">
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-all duration-300" />
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 pl-3 border-l border-white/20">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-white">{data.name}</p>
                <p className="text-xs text-blue-200/80">Quản trị viên</p>
              </div>
                <div className="relative">
      {/* Nút avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="relative group focus:outline-none"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300 ring-2 ring-white/20 group-hover:ring-white/40">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-md z-50">
          <button
            onClick={() => {
              // 👉 Xử lý đăng xuất ở đây
              localStorage.removeItem("token");
              window.location.href = "/login"; // hoặc navigate('/login') nếu dùng React Router
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className=" bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
    </header>
  );
};

export default Header;
