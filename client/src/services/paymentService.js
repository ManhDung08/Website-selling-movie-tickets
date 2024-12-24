import axiosClient from './axios.config';

const paymentService = {
  /**
   * Tạo giao dịch thanh toán mới
   * @param {Object} paymentData - Dữ liệu thanh toán
   * @param {string} paymentData.ticketId - ID của vé cần thanh toán
   * @param {string} paymentData.userId - ID của người dùng
   * @param {number} paymentData.amount - Số tiền cần thanh toán
   * @param {string} paymentData.paymentMethod - Phương thức thanh toán (vnpay)
   * @param {string} paymentData.bankCode - Mã ngân hàng (optional)
   * @returns {Promise<{paymentUrl: string}>} URL thanh toán VNPay
   */
  createPayment: async (paymentData) => {
    try {
      const response = await axiosClient.post('/payment/create-payment', paymentData);
      if (response.data && response.data.paymentUrl) {
        return response.data.paymentUrl;
      } else {
        throw new Error('Không thể tạo URL thanh toán');
      }
    } catch (error) {
      console.error('Lỗi khi tạo giao dịch thanh toán:', error);
      throw error;
    }
  },

  /**
   * Xử lý kết quả trả về từ VNPay
   * @param {Object} queryParams - Tham số trả về từ VNPay
   * @returns {Promise<Object>} Kết quả xử lý
   */
  vnpayReturn: async (queryParams) => {
    try {
      const response = await axiosClient.get('/payment/vnpay-return', {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xử lý VNPay return:', error);
      throw error;
    }
  },

  /**
   * Xử lý IPN (Instant Payment Notification) từ VNPay
   * @param {Object} queryParams - Tham số từ thông báo IPN của VNPay
   * @returns {Promise<Object>} Kết quả xử lý
   */
  vnpayIpn: async (queryParams) => {
    try {
      const response = await axiosClient.get('/payment/vnpay-ipn', {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xử lý VNPay IPN:', error);
      throw error;
    }
  },
};

export default paymentService;