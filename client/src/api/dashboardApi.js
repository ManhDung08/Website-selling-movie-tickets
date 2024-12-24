import axios from "axios";

// Định nghĩa base URL cho Revenue API
const API_BASE_URL = "/api/revenue";

// API: Tạo một bản ghi doanh thu mới
export const createRevenueRecord = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`);
    return response.data; // Trả về bản ghi doanh thu vừa tạo
  } catch (error) {
    console.error("Lỗi khi tạo bản ghi doanh thu:", error);
    throw error;
  }
};

// API: Lấy các bản ghi doanh thu với phân trang
export const getRevenueRecords = async (page = 1, limit = 10, filter = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/records`, {
      params: { page, limit, ...filter },
    });
    return response.data; // Trả về danh sách bản ghi doanh thu
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bản ghi doanh thu:", error);
    throw error;
  }
};

// API: Lấy tổng hợp doanh thu trong một khoảng thời gian
export const getRevenueSummary = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summary`, {
      params: { startDate, endDate },
    });
    return response.data; // Trả về dữ liệu tổng hợp doanh thu
  } catch (error) {
    console.error("Lỗi khi lấy tổng hợp doanh thu:", error);
    throw error;
  }
};

// API: Lấy danh sách các rạp hoặc phim có doanh thu tốt nhất
export const getTopPerformers = async (type = "theater", limit = 5) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/top-performers`, {
      params: { type, limit },
    });
    return response.data; // Trả về danh sách các performer tốt nhất
  } catch (error) {
    console.error("Lỗi khi lấy danh sách performer tốt nhất:", error);
    throw error;
  }
};
