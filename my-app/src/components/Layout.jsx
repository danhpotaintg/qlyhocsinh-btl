// src/components/Layout.jsx
<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react'; 
>>>>>>> 576c95d (chinh sua tí ti)
import { useNavigate, Outlet } from 'react-router-dom';
import { MENU_CONFIG } from '../config/navigation';

export default function Layout({ userRole, onLogout }) {
  const navigate = useNavigate();
  const menuItems = MENU_CONFIG[userRole.toLowerCase()] || [];
<<<<<<< HEAD
=======
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
>>>>>>> 576c95d (chinh sua tí ti)

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* CỘT TRÁI: SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-20">
<<<<<<< HEAD
        
        {/* ĐÃ SỬA: Đưa Logo vào đây, căn giữa, bỏ chữ "Menu Chức Năng" */}
=======
>>>>>>> 576c95d (chinh sua tí ti)
        <div 
          className="h-16 flex items-center justify-center border-b border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors"
          onClick={() => navigate('/dashboard')}
        >
<<<<<<< HEAD
          {/* Chỉnh màu chữ logo cho nổi trên nền tối */}
=======
>>>>>>> 576c95d (chinh sua tí ti)
          <span className="text-2xl font-bold text-blue-400 tracking-wider">
            QLHS.COM
          </span>
        </div>

        <nav className="flex-1 pt-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index} className="relative group">
<<<<<<< HEAD
                {/* Menu cấp 1 */}
=======
>>>>>>> 576c95d (chinh sua tí ti)
                <button 
                  onClick={() => !item.children && navigate(item.path)}
                  className="w-full text-left px-6 py-3 hover:bg-gray-800 transition-colors flex justify-between items-center"
                >
                  {item.title}
                  {item.children && <span className="text-xs text-gray-400">▶</span>}
                </button>

<<<<<<< HEAD
                {/* Menu cấp 2 (Hiển thị bên phải khi hover) */}
=======
>>>>>>> 576c95d (chinh sua tí ti)
                {item.children && (
                  <ul className="absolute left-full top-0 w-56 bg-gray-800 hidden group-hover:block shadow-xl border-l border-gray-700">
                    {item.children.map((child, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => navigate(child.path)}
                          className="w-full text-left px-6 py-3 hover:bg-blue-600 transition-colors text-sm"
                        >
                          {child.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* PHẦN CHÍNH */}
      <div className="flex-1 flex flex-col ml-64">
        
        {/* HEADER */}
<<<<<<< HEAD
        {/* ĐÃ SỬA: Đổi justify-between thành justify-end để đẩy cụm User sang góc phải */}
        <header className="h-16 bg-white shadow flex items-center justify-end px-6 fixed w-[calc(100%-16rem)] z-10">
          
          {/* Menu phải (Thông tin user & Đăng xuất) */}
=======
        <header className="h-16 bg-white shadow flex items-center justify-end px-6 fixed w-[calc(100%-16rem)] z-10">
          
>>>>>>> 576c95d (chinh sua tí ti)
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-800">
                {userRole.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">Trực tuyến</span>
            </div>
            
            <button 
              onClick={() => navigate('/change-password')}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Đổi mật khẩu
            </button>
            
<<<<<<< HEAD
            <button 
              onClick={onLogout}
              className="text-sm font-medium bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-500 hover:text-white transition-all"
            >
              Đăng xuất
            </button>
=======
            <div className="relative">
              {/* Nút Đăng xuất chính: Bấm vào thì mở bảng Confirm chứ không thoát ngay */}
              <button 
                onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
                className="text-sm font-medium bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-500 hover:text-white transition-all"
              >
                Đăng xuất
              </button>

              {/* BẢNG POPUP XÁC NHẬN */}
              {showLogoutConfirm && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 shadow-xl rounded-lg p-4 z-50">
                  <p className="text-sm text-gray-700 mb-4 font-medium text-center">Bạn có chắc chắn muốn đăng xuất?</p>
                  
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => setShowLogoutConfirm(false)}
                      className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                    >
                      Huỷ
                    </button>
                    <button 
                      onClick={onLogout} 
                      className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                    >
                      Đồng ý
                    </button>
                  </div>
                </div>
              )}
            </div>

>>>>>>> 576c95d (chinh sua tí ti)
          </div>
        </header>

        {/* NỘI DUNG ĐỘNG (DASHBOARD) */}
        <main className="flex-1 mt-16 p-6 overflow-y-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}