import axiosClient from './axios.config';

const concessionService = {
  /**
   * Lấy danh sách concession (public)
   * @returns {Promise<Object[]>} Danh sách các concession
   */
  getAllConcessions: async () => {
    return axiosClient.get('/concession');
  },

  /**
   * Lấy thông tin chi tiết của một concession theo ID (public)
   * @param {string} id - ID của concession
   * @returns {Promise<Object>} Thông tin của concession
   */
  getConcessionById: async (id) => {
    return axiosClient.get(`/concession/${id}`);
  },

  /**
   * Tạo concession mới (chỉ dành cho admin)
   * @param {Object} concessionData - Dữ liệu concession
   * @param {string} concessionData.name - Tên của concession
   * @param {number} concessionData.price - Giá của concession
   * @param {string} concessionData.description - Mô tả của concession (optional)
   * @returns {Promise<Object>} Concession vừa được tạo
   */
  createConcession: async (concessionData) => {
    return axiosClient.post('/concession', concessionData);
  },

  /**
   * Cập nhật thông tin concession theo ID (chỉ dành cho admin)
   * @param {string} id - ID của concession
   * @param {Object} updatedData - Dữ liệu concession cần cập nhật
   * @returns {Promise<Object>} Concession sau khi được cập nhật
   */
  updateConcession: async (id, updatedData) => {
    return axiosClient.put(`/concession/${id}`, updatedData);
  },

  /**
   * Xóa concession theo ID (chỉ dành cho admin)
   * @param {string} id - ID của concession cần xóa
   * @returns {Promise<Object>} Phản hồi từ server
   */
  deleteConcession: async (id) => {
    return axiosClient.delete(`/concession/${id}`);
  },
};

export default concessionService;
