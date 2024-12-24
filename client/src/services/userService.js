import axiosClient from './axios.config';

const userService = {
  /**
   * Lấy danh sách người dùng với các tùy chọn lọc và phân trang
   * @param {Object} params - Các tham số truy vấn (page, limit, keyword, role)
   * @returns {Promise<Object>} Danh sách người dùng
   */
  getAllUsers: async (params) => {
    return axiosClient.get('/users', { params });
  },

  /**
   * Lấy thông tin người dùng theo ID
   * @param {string} userId - ID của người dùng
   * @returns {Promise<Object>} Thông tin chi tiết của người dùng
   */
  getUserById: async (userId) => {
    return axiosClient.get(`/users/${userId}`);
  },

  /**
   * Cập nhật thông tin người dùng
   * @param {string} userId - ID của người dùng
   * @param {Object} userData - Dữ liệu thông tin người dùng mới
   * @returns {Promise<Object>} Người dùng đã được cập nhật
   */
  updateUser: async (userId, userData) => {
    return axiosClient.put(`/users/${userId}`, userData);
  },

  /**
   * Cập nhật mật khẩu người dùng
   * @param {Object} passwordData - Dữ liệu mật khẩu mới (password, confirmPassword)
   * @returns {Promise<Object>} Thông tin người dùng sau khi thay đổi mật khẩu
   */
  changePassword: async (passwordData) => {
    return axiosClient.put('/users/change-password', passwordData);
  },

  /**
   * Xóa người dùng
   * @param {string} userId - ID của người dùng cần xóa
   * @returns {Promise<Object>} Kết quả xóa người dùng
   */
  deleteUser: async (userId) => {
    return axiosClient.delete(`/users/${userId}`);
  },
};

export default userService;
