import axios from 'axios';

// Base URL của backend
const baseURL = 'http://localhost:5000/api'; // Thay bằng URL backend của bạn nếu cần

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL, // URL gốc cho tất cả các request
  timeout: 10000, // Thời gian tối đa cho một request (10 giây)
  headers: {
    'Content-Type': 'application/json', // Header mặc định
    Accept: 'application/json', // Hỗ trợ JSON response
  },
});

// Request Interceptor: Thêm token vào header nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('accessToken');

    // Nếu có token, thêm vào Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config; // Trả về config đã chỉnh sửa
  },
  (error) => {
    // Xử lý lỗi trước khi request được gửi đi
    return Promise.reject(error);
  }
);

// Response Interceptor: Xử lý lỗi từ server
axiosInstance.interceptors.response.use(
  (response) => {
    // Trả về response nếu thành công
    return response;
  },
  (error) => {
    // Kiểm tra lỗi
    if (error.response) {
      const { status } = error.response;

      // Nếu lỗi là 401 (Unauthorized), có thể logout hoặc thông báo người dùng
      if (status === 401) {
        console.error('Unauthorized! Token đã hết hạn.');
        // Xóa token và redirect về trang login
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // Redirect về trang login
      }

      // Nếu lỗi là 403 (Forbidden), thông báo không có quyền
      if (status === 403) {
        console.error('Forbidden! Người dùng không có quyền truy cập.');
      }

      // Xử lý lỗi 500 (Internal Server Error)
      if (status === 500) {
        console.error('Lỗi server! Vui lòng thử lại sau.');
      }
    }

    // Trả lỗi về cho nơi gọi Axios
    return Promise.reject(error);
  }
);

export default axiosInstance;