import React, { useEffect, useRef, useState } from "react";
import { login, register } from "../../services/authService";

const Modal = ({ openModal, setOpenModal, isLogin, setIsLogin }) => {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState(""); 
const [errorMessage, setErrorMessage] = useState("");
const [sucessMessage, setSucessMessage] = useState("");
const modalRef = useRef();
const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  };
  console.log('errorMessage', errorMessage)
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    if (sucessMessage) {
        const timer = setTimeout(() => {
            setSucessMessage("");
        }, 1000);
      }
  }, [errorMessage,sucessMessage]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
     if (password.length < 6) {
        setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (isLogin) {
      try {
        const data = await login({ email, password })

        setSucessMessage("Login successful:");
        localStorage.setItem("token", data.token);
        setUsername("")
        setEmail("")
        setPassword("")
        setTimeout(() => {
            window.location.href="/"
          }, 1000);
        
      } catch (error) {
        console.log("Login failed:", error);
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMessage("Mật khẩu không khớp");
        return;
      }

      try {
        const data = await register({ username, email, password }); // Gọi API register
        setSucessMessage("Register successful:");
        setIsLogin(true)
        setTimeout(() => {
            setUsername("")
            setEmail("")
            setPassword("")
            
          }, 1000);
      } catch (error) {
        setErrorMessage("Register failed: Trùng email");
      }
    }
  };
  if (!openModal) return null;
  return (
    <div className="fixed z-50 top-ơ bottom-0 right-0 left-0 bg-[#000000c2]">
        {errorMessage && (
        <div className="fixed top-[120px] right-3 transform -translate-x-1/2 z-[1000] bg-red-600 text-white py-2 px-4 rounded-md shadow-lg">
           {errorMessage}
        </div>
        )}
        {sucessMessage && (
        <div className="fixed top-[120px] right-3 transform -translate-x-1/2 z-[1000] bg-green-600 text-white py-2 px-4 rounded-md shadow-lg">
           {sucessMessage}
        </div>
        )}
        <div className={`min-h-screen flex  items-center justify-center`}>
            <div ref={modalRef}  className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-center text-2xl font-semibold text-red-600 mb-6">
                {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                </h2>
                <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-red-700"
                    >
                        Tên người dùng
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập tên người dùng"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    </div>
                )}
                <div className="mb-4">
                    <label
                    htmlFor="email"
                    className="block text-sm font-medium text-red-700"
                    >
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="mb-4">
                    <label
                    htmlFor="password"
                    className="block text-sm font-medium text-red-700"
                    >
                    Mật khẩu
                    </label>
                    <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                {!isLogin && (
                    <div className="mb-4">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-red-700"
                    >
                        Xác nhận mật khẩu
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                </button>
                </form>
                <div className="text-center mt-4">
                <p className="text-sm text-red-700">
                    {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                    <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-red-600 font-semibold ml-2 hover:underline"
                    >
                    {isLogin ? "Đăng Ký" : "Đăng Nhập"}
                    </button>
                </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Modal;
