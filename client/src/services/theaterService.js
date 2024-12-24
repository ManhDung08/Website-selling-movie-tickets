import axiosClient from './axios.config';

const theaterService = {
  /**
   * Lấy danh sách rạp với các tùy chọn lọc và phân trang
   * @param {Object} query - Các tham số lọc và phân trang
   * @param {number} [query.page=1] - Số trang hiện tại
   * @param {number} [query.limit=10] - Số lượng rạp mỗi trang
   * @param {string} [query.keyword] - Tìm kiếm theo từ khóa tên rạp
   * @param {string} [query.city] - Lọc theo thành phố
   * @param {number} [query.minRooms] - Lọc theo số phòng tối thiểu
   * @param {number} [query.maxRooms] - Lọc theo số phòng tối đa
   * @returns {Promise<Object>} Danh sách các rạp
   */
  getAllTheaters: async (query = {}) => {
    return axiosClient.get('/theaters', { params: query });
  },

  /**
   * Lấy thông tin chi tiết của một rạp theo ID
   * @param {string} theaterId - ID của rạp cần lấy thông tin
   * @returns {Promise<Object>} Thông tin chi tiết của rạp
   */
  getTheaterById: async (theaterId) => {
    return axiosClient.get(`/theaters/${theaterId}`);
  },

  /**
   * Tạo mới một rạp (chỉ dành cho admin)
   * @param {Object} theaterData - Dữ liệu của rạp cần tạo
   * @returns {Promise<Object>} Rạp vừa được tạo
   */
  createTheater: async (theaterData) => {
    return axiosClient.post('/theaters', theaterData);
  },

  /**
   * Cập nhật thông tin rạp (chỉ dành cho admin)
   * @param {string} theaterId - ID của rạp cần cập nhật
   * @param {Object} theaterData - Dữ liệu cập nhật
   * @returns {Promise<Object>} Rạp sau khi cập nhật
   */
  updateTheater: async (theaterId, theaterData) => {
    return axiosClient.put(`/theaters/${theaterId}`, theaterData);
  },

  /**
   * Xóa một rạp (chỉ dành cho admin)
   * @param {string} theaterId - ID của rạp cần xóa
   * @returns {Promise<Object>} Kết quả xóa
   */
  deleteTheater: async (theaterId) => {
    return axiosClient.delete(`/theaters/${theaterId}`);
  },
};

export default theaterService;
