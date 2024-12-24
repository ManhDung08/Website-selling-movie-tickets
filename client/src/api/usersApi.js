import axios from "axios";

// Định nghĩa base URL
const API_BASE_URL = "/api/users";

// API: Lấy danh sách người dùng với phân trang và tìm kiếm
export const getUsers = async (params = {}) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    throw error;
  }
};

// API: Lấy người dùng theo ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    throw error;
  }
};

// API: Thêm người dùng mới
export const createUser = async (user) => {
  try {
    const response = await axios.post(API_BASE_URL, user);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    throw error;
  }
};

// API: Cập nhật thông tin người dùng
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    throw error;
  }
};

// API: Xóa người dùng
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    throw error;
  }
};

// API: Thay đổi mật khẩu người dùng
export const changePassword = async (id, newPassword) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/change-password`, { newPassword });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thay đổi mật khẩu:", error);
    throw error;
  }
};
