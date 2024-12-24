import React, { useEffect, useRef, useState, useCallback } from "react";
import authService from "../../services/authService";

const Modal = ({ openModal, setOpenModal, isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    dateOfBirth: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);
  const modalRef = useRef();

  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    },
    [setOpenModal]
  );

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
      return () => clearTimeout(timer);
    }
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Mật khẩu không khớp");
        return false;
      }
      
      if (!formData.username || !formData.email || !formData.fullName || !formData.phone) {
        setErrorMessage("Vui lòng điền đầy đủ thông tin");
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (isLogin) {
        const data = await authService.login({
          username: formData.username,
          password: formData.password
        });

        setSuccessMessage("Đăng nhập thành công");
        localStorage.setItem('authToken', data.token);
       

        if (data.data.user && data.data.user.role === "admin") {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
          console.log("Vào admin")
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      } else {
        const registerData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth
        };

        await authService.register(registerData);
        setSuccessMessage("Đăng ký thành công");
        setShowVerifyMessage(true);
        setTimeout(() => {
          setIsLogin(true);
          setShowVerifyMessage(false);
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            phone: "",
            dateOfBirth: ""
          });
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(isLogin ? "Đăng nhập thất bại" : "Đăng ký thất bại: Email hoặc tên người dùng đã tồn tại");
    }
  };

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  if (!openModal) return null;


  return (
    <div className="fixed z-50 top-0 bottom-0 right-0 left-0 bg-[#000000c2]">
      {errorMessage && (
    <div className="fixed z-50 top-0 bottom-0 right-0 left-0 bg-[#000000c2]">
      {errorMessage && (
        <div className="fixed top-[120px] right-3 transform -translate-x-1/2 z-[1000] bg-red-600 text-white py-2 px-4 rounded-md shadow-lg">
          {errorMessage}
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="fixed top-[120px] right-3 transform -translate-x-1/2 z-[1000] bg-green-600 text-white py-2 px-4 rounded-md shadow-lg">
          {successMessage}
        </div>
      )}
      {showVerifyMessage && (
        <div className="fixed top-[120px] right-3 transform -translate-x-1/2 z-[1000] bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg">
          Vui lòng kiểm tra email để xác minh tài khoản
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div ref={modalRef} className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-center text-2xl font-semibold text-red-600 mb-6">
            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-red-700">
                    Tên người dùng
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    placeholder="Nhập tên người dùng"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-red-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    placeholder="Nhập họ và tên"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-red-700">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-red-700">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <div className={`grid ${!isLogin ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-red-700">
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  name="username"
                  className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Nhập username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-red-700">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-red-700">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-4"
            >
              {isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </button>
            
            {isLogin && (
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Đăng nhập với Google
              </button>
            )}
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