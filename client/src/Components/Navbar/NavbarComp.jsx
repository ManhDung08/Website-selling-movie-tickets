import React, { useRef, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../services/userService";
import { clearUser } from "../../redux/userSlice";

export default function NavbarComp() {
  const user = useSelector(state => state.user);
  console.log('user', user)
  const navRef = useRef(null); 
  const [navHeight, setNavHeight] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const getUser = async(id)=>{
    const res = await userDetail(id)
    console.log('res', res)
  }
  useEffect(() => {
    if(user.id){
      getUser(user.id);
    }
    if (navRef.current) {

      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  return (
<header style={{ marginTop: `${navHeight}px` }}>
  <Modal openModal= {openModal} setOpenModal= {setOpenModal} isLogin= {isLogin} setIsLogin= {setIsLogin}></Modal>
<nav
        ref={navRef}
        className="bg-[#0A1A2F] text-white px-6 py-4 fixed inset-x-0 top-0 z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="ml-3 font-bold text-xl">CINESTAR</span>
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
            <button className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg flex items-center">
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
            {user.username ?(
              <>
                <p>{user.username}</p>
                <a onClick={()=>dispatch(clearUser())} className="hover:underline cursor-pointer">
                  Đăng xuất
                </a>
              </>
            ) :(
              <a onClick={()=>setOpenModal(true)} className="hover:underline cursor-pointer">
                Đăng nhập
              </a>
            )
            }
           
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
