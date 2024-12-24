import axios from "axios";

// Định nghĩa base URL
const API_BASE_URL = "/api/theaters"; 

// API: Lấy danh sách rạp chiếu
export const getTheaters = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp chiếu:", error);
    throw error;
  }
};

// API: Thêm rạp chiếu mới
export const createTheater = async (theater) => {
  try {
    const response = await axios.post(API_BASE_URL, theater);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm rạp chiếu:", error);
    throw error;
  }
};

// API: Cập nhật thông tin rạp chiếu
export const updateTheater = async (id, updatedTheater) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTheater);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật rạp chiếu:", error);
    throw error;
  }
};

// API: Xóa rạp chiếu
export const deleteTheater = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Lỗi khi xóa rạp chiếu:", error);
    throw error;
  }
};
