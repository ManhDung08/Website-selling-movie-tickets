import axiosClient from './axios.config';

const showtimeService = {
  /**
   * Lấy danh sách suất chiếu với các tùy chọn lọc và phân trang
   * @param {Object} query - Các tham số lọc và phân trang
   * @param {number} [query.page=1] - Số trang hiện tại
   * @param {number} [query.limit=10] - Số lượng suất chiếu mỗi trang
   * @param {string} [query.movieId] - Lọc suất chiếu theo ID phim
   * @param {string} [query.theaterId] - Lọc suất chiếu theo ID rạp
   * @param {string} [query.roomId] - Lọc suất chiếu theo ID phòng chiếu
   * @param {string} [query.startDate] - Ngày bắt đầu lọc theo khoảng thời gian
   * @param {string} [query.endDate] - Ngày kết thúc lọc theo khoảng thời gian
   * @param {boolean} [query.upcoming] - Lọc các suất chiếu sắp tới
   * @returns {Promise<Object>} Danh sách suất chiếu
   */
  getAllShowtimes: async (query = {}) => {
    return axiosClient.get('/showtimes', { params: query });
  },

  /**
   * Lấy thông tin chi tiết của một suất chiếu
   * @param {string} showtimeId - ID của suất chiếu cần lấy thông tin
   * @returns {Promise<Object>} Thông tin chi tiết suất chiếu
   */
  getShowtimeById: async (showtimeId) => {
    return axiosClient.get(`/showtimes/${showtimeId}`);
  },

  /**
   * Tạo mới một suất chiếu (chỉ dành cho admin)
   * @param {Object} showtimeData - Dữ liệu của suất chiếu cần tạo
   * @returns {Promise<Object>} Suất chiếu vừa được tạo
   */
  createShowtime: async (showtimeData) => {
    return axiosClient.post('/showtimes', showtimeData);
  },

  /**
   * Cập nhật thông tin suất chiếu (chỉ dành cho admin)
   * @param {string} showtimeId - ID của suất chiếu cần cập nhật
   * @param {Object} showtimeData - Dữ liệu cập nhật
   * @returns {Promise<Object>} Suất chiếu sau khi được cập nhật
   */
  updateShowtime: async (showtimeId, showtimeData) => {
    return axiosClient.put(`/showtimes/${showtimeId}`, showtimeData);
  },

  /**
   * Xóa một suất chiếu (chỉ dành cho admin)
   * @param {string} showtimeId - ID của suất chiếu cần xóa
   * @returns {Promise<Object>} Kết quả xóa
   */
  deleteShowtime: async (showtimeId) => {
    return axiosClient.delete(`/showtimes/${showtimeId}`);
  },
};

export default showtimeService;
