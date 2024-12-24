import axiosClient from './axios.config';

const revenueService = {
  /**
   * Tạo một bản ghi doanh thu mới (chỉ dành cho admin)
   * @param {Object} revenueData - Dữ liệu doanh thu cần tạo
   * @returns {Promise<Object>} Bản ghi doanh thu vừa được tạo
   */
  createRevenueRecord: async (revenueData) => {
    return axiosClient.post('/revenue', revenueData);
  },

  /**
   * Lấy danh sách các bản ghi doanh thu với phân trang (chỉ dành cho admin)
   * @param {Object} query - Các tham số phân trang và lọc
   * @param {number} [query.page=1] - Trang hiện tại
   * @param {number} [query.limit=10] - Số bản ghi trên mỗi trang
   * @returns {Promise<Object>} Danh sách các bản ghi doanh thu
   */
  getRevenueRecords: async (query = {}) => {
    return axiosClient.get('/revenue', { params: query });
  },

  /**
   * Lấy tổng hợp doanh thu trong một khoảng thời gian (chỉ dành cho admin)
   * @param {Object} params - Tham số lọc
   * @param {string} params.startDate - Ngày bắt đầu (định dạng ISO)
   * @param {string} params.endDate - Ngày kết thúc (định dạng ISO)
   * @returns {Promise<Object>} Tổng hợp doanh thu
   */
  getRevenueSummary: async (params) => {
    return axiosClient.get('/revenue/summary', { params });
  },

  /**
   * Lấy danh sách các rạp hoặc phim có doanh thu tốt nhất (chỉ dành cho admin)
   * @returns {Promise<Object>} Danh sách các rạp hoặc phim có doanh thu cao nhất
   */
  getTopPerformers: async () => {
    return axiosClient.get('/revenue/top-performers');
  },
};

export default revenueService;
