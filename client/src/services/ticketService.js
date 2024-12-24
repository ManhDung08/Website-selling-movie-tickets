import axiosClient from './axios.config';

const ticketService = {
  /**
   * Lấy danh sách vé (chỉ dành cho admin)
   * @returns {Promise<Object>} Danh sách vé
   */
  getAllTickets: async () => {
    return axiosClient.get('/tickets');
  },

  /**
   * Lấy thông tin vé theo ID (admin và người dùng sở hữu vé)
   * @param {string} ticketId - ID của vé cần lấy thông tin
   * @returns {Promise<Object>} Thông tin chi tiết của vé
   */
  getTicketById: async (ticketId) => {
    return axiosClient.get(`/tickets/${ticketId}`);
  },

  /**
   * Lấy danh sách vé của người dùng (đã đăng nhập)
   * @returns {Promise<Object>} Danh sách vé của người dùng
   */
  getTicketsByUser: async () => {
    return axiosClient.get('/tickets/user/my-tickets');
  },

  /**
   * Tạo vé mới (chỉ dành cho người dùng đã đăng nhập)
   * @param {Object} ticketData - Dữ liệu của vé cần tạo
   * @returns {Promise<Object>} Vé vừa được tạo
   */
  createTicket: async (ticketData) => {
    return axiosClient.post('/tickets', ticketData);
  },

  /**
   * Hủy vé (chỉ admin)
   * @param {string} ticketId - ID của vé cần hủy
   * @returns {Promise<Object>} Kết quả hủy vé
   */
  cancelTicket: async (ticketId) => {
    return axiosClient.delete(`/tickets/${ticketId}/cancel`);
  },

  /**
   * Cập nhật trạng thái thanh toán (chỉ admin)
   * @param {string} ticketId - ID của vé cần cập nhật trạng thái thanh toán
   * @param {Object} statusData - Dữ liệu trạng thái thanh toán
   * @returns {Promise<Object>} Vé sau khi cập nhật
   */
  updatePaymentStatus: async (ticketId, statusData) => {
    return axiosClient.patch(`/tickets/${ticketId}/payment-status`, statusData);
  },
};

export default ticketService;
