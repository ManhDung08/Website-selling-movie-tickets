import React, { useRef, useEffect, useState } from "react";

export default function NavbarComp() {
  const navRef = useRef(null); // Tham chiếu tới nav
  const [navHeight, setNavHeight] = useState(0); // State để lưu chiều cao của nav

  useEffect(() => {
    if (navRef.current) {
      // Lấy chiều cao của nav sau khi render
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  return (
<header style={{ marginTop: `${navHeight}px` }}>
<nav
        ref={navRef}
        className="bg-[#0A1A2F] text-white px-6 py-4 fixed inset-x-0 top-0 z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="ml-3 font-bold text-xl">CINEMASTAR</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a href="#choose-cinema" className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              Chọn rạp
            </a>
            <a href="#schedule" className="flex items-center">
              <i className="fas fa-calendar-alt mr-2"></i>
              Lịch chiếu
            </a>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center">
              <i className="fas fa-ticket-alt mr-2"></i>
              Đặt vé ngay
            </button>
            <button className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg flex items-center">
              <i className="fas fa-popcorn mr-2"></i>
              Đặt bắp nước
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center border border-gray-600 rounded-lg px-3 py-1 bg-[#1B2B44]">
            <input
              type="text"
              placeholder="Tìm phim, rạp"
              className="bg-transparent focus:outline-none text-sm w-48 text-gray-300"
            />
            <i className="fas fa-search text-gray-400 ml-2"></i>
          </div>

          {/* Right Side Options */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#login" className="hover:underline">
              Đăng nhập
            </a>
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="container bg-[#091522] py-2 flex mx-auto">
          <div className="ml-auto flex space-x-8 text-sm">
            <a href="/Showing" className="hover:underline">
              Khuyến mãi
            </a>
            <a href="#event-rentals" className="hover:underline">
              Thuê sự kiện
            </a>
            <a href="#all-entertainment" className="hover:underline">
              Tất cả các giải trí
            </a>
            <a href="#about" className="hover:underline">
              Giới thiệu
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
