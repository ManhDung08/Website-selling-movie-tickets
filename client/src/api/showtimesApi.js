import axios from "axios";

// Định nghĩa base URL
const API_BASE_URL = "/api/showtimes"; 

// API: Lấy danh sách suất chiếu với các tham số tìm kiếm
export const getShowtimes = async (params = {}) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data; // Dữ liệu trả về từ server
  } catch (error) {
    console.error("Lỗi khi lấy danh sách suất chiếu:", error);
    throw error;
  }
};

// API: Lấy suất chiếu theo ID
export const getShowtimeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data; // Dữ liệu suất chiếu
  } catch (error) {
    console.error("Lỗi khi lấy suất chiếu:", error);
    throw error;
  }
};

// API: Thêm suất chiếu mới
export const createShowtime = async (showtime) => {
  try {
    const response = await axios.post(API_BASE_URL, showtime);
    return response.data; // Dữ liệu suất chiếu mới tạo
  } catch (error) {
    console.error("Lỗi khi thêm suất chiếu:", error);
    throw error;
  }
};

// API: Cập nhật suất chiếu
export const updateShowtime = async (id, updatedShowtime) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedShowtime);
    return response.data; // Dữ liệu suất chiếu đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật suất chiếu:", error);
    throw error;
  }
};

// API: Xóa suất chiếu
export const deleteShowtime = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data; // Trả về kết quả xóa thành công
  } catch (error) {
    console.error("Lỗi khi xóa suất chiếu:", error);
    throw error;
  }
};
