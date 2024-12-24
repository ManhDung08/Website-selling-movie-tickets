import React, { useRef, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "../../services/userService";
import { clearUser } from "../../redux/userSlice";
import { Link } from "react-router-dom";

export default function NavbarComp() {
  const user = useSelector(state => state.user);
  console.log('user', user)
  const navRef = useRef(null); 
  const [navHeight, setNavHeight] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (navRef.current) {

      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  return (
<header style={{ marginTop: `${navHeight}px` }}>
  <Modal openModal= {openModal} setOpenModal= {setOpenModal} isLogin= {isLogin} setIsLogin= {setIsLogin}></Modal>
<nav
        ref={navRef}
        className="bg-[#0A1A2F] h-[98px] flex items-center text-white px-6 py-4 fixed inset-x-0 top-0 z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
          <Link to="/" className="ml-3 font-bold text-xl">CINESTAR</Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
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
               <Link to="/order" className="hover:underline">Vé của bạn</Link>
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
      </nav>
    </header>
  );
}
