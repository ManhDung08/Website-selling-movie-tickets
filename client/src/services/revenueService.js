import axiosClient from './axios.config';

const revenueService = {
  /**
   * Tạo một bản ghi doanh thu mới (chỉ dành cho admin)
   * @param {Object} revenueData - Dữ liệu doanh thu cần tạo
   * @returns {Promise<Object>} Bản ghi doanh thu vừa được tạo
   */
  createRevenueRecord: async (revenueData) => {
    return axiosClient.post('/revenues', revenueData);
  },

  /**
   * Lấy danh sách các bản ghi doanh thu với phân trang (chỉ dành cho admin)
   * @param {Object} query - Các tham số phân trang và lọc
   * @param {number} [query.page=1] - Trang hiện tại
   * @param {number} [query.limit=10] - Số bản ghi trên mỗi trang
   * @returns {Promise<Object>} Danh sách các bản ghi doanh thu
   */
  getRevenueRecords: async (query = {}) => {
    try {
      // Đảm bảo query luôn là một object
      const safeQuery = {
        page: query.page || 1,
        limit: query.limit || 10
      };

      // Gọi API với params được an toàn
      const response = await axiosClient.get('/revenues/record', { 
        params: safeQuery 
      });

      // Kiểm tra và xử lý phản hồi
      if (!response || !response.data) {
        throw new Error('Không có dữ liệu');
      }

      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu:', error);
      throw error;
    }
  },

  /**
   * Lấy tổng hợp doanh thu trong một khoảng thời gian (chỉ dành cho admin)
   * @param {Object} params - Tham số lọc
   * @param {string} params.startDate - Ngày bắt đầu (định dạng ISO)
   * @param {string} params.endDate - Ngày kết thúc (định dạng ISO)
   * @returns {Promise<Object>} Tổng hợp doanh thu
   */
  getRevenueSummary: async (params) => {
    return axiosClient.get('/revenues/summary', { params });
  },

  /**
   * Lấy danh sách các rạp hoặc phim có doanh thu tốt nhất (chỉ dành cho admin)
   * @returns {Promise<Object>} Danh sách các rạp hoặc phim có doanh thu cao nhất
   */
  getTopPerformers: async () => {
    return axiosClient.get('/revenues/top-performers');
  },
};

export default revenueService;
