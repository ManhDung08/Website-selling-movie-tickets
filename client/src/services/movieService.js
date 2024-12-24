import axiosClient from './axios.config';

const movieService = {
  /**
   * Lấy danh sách phim với tùy chọn lọc và phân trang
   * @param {Object} query - Các tùy chọn lọc
   * @param {number} [query.page=1] - Số trang
   * @param {number} [query.limit=10] - Số phim trên mỗi trang
   * @param {string} [query.status] - Trạng thái phim ('coming-soon', 'now-showing', 'ended')
   * @param {string} [query.keyword] - Từ khóa tìm kiếm theo tên phim
   * @param {string} [query.genre] - Thể loại phim
   * @returns {Promise<Object>} Danh sách phim
   */
  getAllMovies: async (query = {}) => {
    const response = await axiosClient.get('/movies', { params: query });
    return response;
  },

  /**
   * Lấy thông tin chi tiết của một phim theo ID
   * @param {string} id - ID của phim
   * @returns {Promise<Object>} Thông tin của phim
   */
  getMovieById: async (id) => {
    return axiosClient.get(`/movies/${id}`);
  },

  /**
   * Lấy thông tin phim kèm các suất chiếu
   * @param {string} id - ID của phim
   * @returns {Promise<Object>} Thông tin phim và danh sách suất chiếu
   */
  getMovieWithShowtimes: async (id) => {
    return axiosClient.get(`/movies/${id}/showtimes`);
  },

  /**
   * Tạo phim mới (chỉ dành cho admin)
   * @param {Object} movieData - Dữ liệu phim
   * @returns {Promise<Object>} Phim vừa được tạo
   */
  createMovie: async (movieData) => {
    return axiosClient.post('/movies', movieData);
  },

  /**
   * Cập nhật thông tin phim theo ID (chỉ dành cho admin)
   * @param {string} id - ID của phim
   * @param {Object} updatedData - Dữ liệu phim cần cập nhật
   * @returns {Promise<Object>} Phim sau khi được cập nhật
   */
  updateMovie: async (id, updatedData) => {
    return axiosClient.put(`/movies/${id}`, updatedData);
  },

  /**
   * Xóa phim theo ID (chỉ dành cho admin)
   * @param {string} id - ID của phim cần xóa
   * @returns {Promise<Object>} Phản hồi từ server
   */
  deleteMovie: async (id) => {
    return axiosClient.delete(`/movies/${id}`);
  },
};

export default movieService;
