import axiosClient from './axios.config';

const roomService = {
  /**
   * Lấy danh sách phòng chiếu với các tùy chọn lọc và phân trang
   * @param {Object} query - Các tham số lọc và phân trang
   * @param {number} [query.page=1] - Số trang hiện tại
   * @param {number} [query.limit=10] - Số lượng phòng chiếu mỗi trang
   * @param {string} [query.keyword] - Từ khóa tìm kiếm theo tên phòng chiếu
   * @param {string} [query.theaterId] - Lọc phòng chiếu theo ID rạp
   * @param {string} [query.type] - Lọc theo loại phòng chiếu (ví dụ: 'IMAX', '2D', '3D')
   * @returns {Promise<Object>} Danh sách phòng chiếu
   */
  getAllRooms: async (query = {}) => {
    return axiosClient.get('/rooms', { params: query });
  },

  /**
   * Lấy thông tin chi tiết của một phòng chiếu
   * @param {string} roomId - ID của phòng chiếu cần lấy thông tin
   * @returns {Promise<Object>} Thông tin chi tiết phòng chiếu
   */
  getRoomById: async (roomId) => {
    return axiosClient.get(`/rooms/${roomId}`);
  },

  /**
   * Tạo mới một phòng chiếu (chỉ dành cho admin)
   * @param {Object} roomData - Dữ liệu của phòng chiếu cần tạo
   * @returns {Promise<Object>} Phòng chiếu vừa được tạo
   */
  createRoom: async (roomData) => {
    return axiosClient.post('/rooms', roomData);
  },

  /**
   * Cập nhật thông tin phòng chiếu (chỉ dành cho admin)
   * @param {string} roomId - ID của phòng chiếu cần cập nhật
   * @param {Object} roomData - Dữ liệu cập nhật
   * @returns {Promise<Object>} Phòng chiếu sau khi được cập nhật
   */
  updateRoom: async (roomId, roomData) => {
    return axiosClient.put(`/rooms/${roomId}`, roomData);
  },

  /**
   * Xóa một phòng chiếu (chỉ dành cho admin)
   * @param {string} roomId - ID của phòng chiếu cần xóa
   * @returns {Promise<Object>} Kết quả xóa
   */
  deleteRoom: async (roomId) => {
    return axiosClient.delete(`/rooms/${roomId}`);
  },
};

export default roomService;
