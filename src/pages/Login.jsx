import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [name,setName]=useState('')
     const [password,setPassword]=useState('')
    const navigate = useNavigate();

  const handleLogin = () => {
    const dataLogin={name,password}
    if (name === 'admin' && password === '123456') {
      localStorage.setItem("token", JSON.stringify(dataLogin)); // ✅ sửa chỗ này
      navigate("/"); // chuyển sang trang chính
    } else {
       toast.error("Sai email hoặc mật khẩu!");
    }
  };
   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Left Side - Shoe Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
        <div className="relative z-10 text-center">
          <div className="mb-8">
          
            
          </div>
          
          {/* Shoe Image with Hover Effects */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-75 group-hover:scale-100"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-105">
              <img 
                src="https://ash.vn/cdn/shop/files/fac78ca14818b8a4303d059ff703a977_1800x.png?v=1704772696"
                alt="Shoe"
                className="w-80 h-60 object-contain filter drop-shadow-2xl group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 group-hover:rotate-18"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 delay-100"></div>
            <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-500 rounded-full opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300 delay-200"></div>
            <div className="absolute top-10 -left-8 w-4 h-4 bg-pink-400 rounded-full opacity-50 group-hover:opacity-90 group-hover:scale-150 transition-all duration-300 delay-75"></div>
          </div>

          <div className="mt-8 text-slate-300">
            <p className="text-lg">
              "Quản lý sản phẩm giày dép chuyên nghiệp"
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
           
            <h2 className="text-3xl font-bold text-white mb-2">Đăng nhập</h2>
            <p className="text-slate-400">Truy cập hệ thống quản trị</p>
          </div>

          {/* Login Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email quản trị viên
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="admin@shoestore.com"
                    className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pl-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-500 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2" />
                  <span className="ml-2 text-sm text-slate-300">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Đăng nhập vào hệ thống
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-slate-400 text-sm">
                Chỉ dành cho quản trị viên được ủy quyền
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login