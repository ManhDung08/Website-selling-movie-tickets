import axiosClient from './axios.config';

const authService = {
  /**
   * Đăng ký tài khoản mới
   * @param {Object} userData - Dữ liệu đăng ký
   * @param {string} userData.email - Email người dùng
   * @param {string} userData.password - Mật khẩu người dùng
   * @param {string} userData.fullName - Tên đầy đủ người dùng
   * @returns {Promise<Object>} Phản hồi từ server
   */
  register: async (userData) => {
    return axiosClient.post('/auth/register', userData);
  },

  /**
   * Xác minh email
   * @param {string} token - Mã xác minh email
   * @returns {Promise<Object>} Phản hồi từ server
   */
  verifyEmail: async (token) => {
    return axiosClient.get(`/auth/verify-email/${token}`);
  },

  /**
   * Đăng nhập
   * @param {Object} credentials - Thông tin đăng nhập
   * @param {string} credentials.email - Email người dùng
   * @param {string} credentials.password - Mật khẩu người dùng
   * @returns {Promise<Object>} Phản hồi từ server
   */
  login: async (credentials) => {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      // Handle specific error cases
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error('Email hoặc mật khẩu không chính xác');
          case 403:
            throw new Error('Tài khoản chưa được xác minh email');
          case 404:
            throw new Error('Tài khoản không tồn tại');
          default:
            throw new Error('Lỗi đăng nhập: ' + (error.response.data?.message || 'Vui lòng thử lại sau'));
        }
      }
      throw new Error('Không thể kết nối đến máy chủ');
    }
  },

  /**
   * Đăng nhập bằng Google
   * @returns {void} Chuyển hướng đến trang Google login
   */
  loginWithGoogle: () => {
    window.location.href = '/auth/google';
  },

  /**
   * Xử lý callback sau khi Google login
   * @returns {Promise<Object>} Lấy token từ URL hoặc thực hiện bước tiếp theo
   */
  handleGoogleCallback: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token); // Lưu token vào localStorage
      return { token };
    }
    return null;
  },
};

export default authService;
