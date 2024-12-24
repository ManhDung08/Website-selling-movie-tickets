import axios from "axios";

// Định nghĩa base URL
const API_BASE_URL = "/api/rooms"; 

// API: Lấy danh sách phòng chiếu
export const getRooms = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phòng chiếu:", error);
    throw error;
  }
};

// API: Thêm phòng chiếu mới
export const createRoom = async (room) => {
  try {
    const response = await axios.post(API_BASE_URL, room);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm phòng chiếu:", error);
    throw error;
  }
};

// API: Cập nhật thông tin phòng chiếu
export const updateRoom = async (id, updatedRoom) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedRoom);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật phòng chiếu:", error);
    throw error;
  }
};

// API: Xóa phòng chiếu
export const deleteRoom = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Lỗi khi xóa phòng chiếu:", error);
    throw error;
  }
};
