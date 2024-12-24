import axios from "axios";

// Định nghĩa base URL
const API_BASE_URL = "/api/movies";

// API: Lấy danh sách phim
export const getMovies = async (page = 1, limit = 10, filters = {}) => {
  try {
    const { status, keyword, genre } = filters;
    const response = await axios.get(API_BASE_URL, {
      params: { page, limit, status, keyword, genre },
    });
    return response.data; // Trả về danh sách phim
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    throw error;
  }
};

// API: Lấy phim theo ID
export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data; // Trả về phim theo ID
  } catch (error) {
    console.error("Lỗi khi lấy phim theo ID:", error);
    throw error;
  }
};

// API: Thêm phim mới
export const createMovie = async (movie) => {
  try {
    const response = await axios.post(API_BASE_URL, movie);
    return response.data; // Trả về phim vừa thêm
  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
    throw error;
  }
};

// API: Cập nhật thông tin phim
export const updateMovie = async (id, updatedMovie) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedMovie);
    return response.data; // Trả về phim đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật phim:", error);
    throw error;
  }
};

// API: Xóa phim
export const deleteMovie = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Lỗi khi xóa phim:", error);
    throw error;
  }
};

// API: Lấy thông tin phim kèm suất chiếu
export const getMovieWithShowtimes = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}/showtimes`);
    return response.data; // Trả về phim kèm suất chiếu
  } catch (error) {
    console.error("Lỗi khi lấy phim kèm suất chiếu:", error);
    throw error;
  }
};
