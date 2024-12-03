const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController');
const movieValidation = require('../validations/MovieValidation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// **Routes chỉ dành cho Admin**
// Tạo phim mới
router.post(
    '/',
    adminMiddleware,
    movieValidation.createMovieValidation,
    movieController.createMovie
);

// Cập nhật thông tin phim
router.put(
    '/:id',
    adminMiddleware,
    movieValidation.updateMovieValidation,
    movieController.updateMovie
);

// Xóa phim
router.delete(
    '/:id',
    adminMiddleware,
    movieValidation.deleteMovieValidation,
    movieController.deleteMovie
);

// **Routes dành cho mọi người dùng**
// Lấy phim theo ID
router.get('/:id', movieController.getMovieById);

// Lấy danh sách phim với các tùy chọn lọc và phân trang
// - Query params:
//   - page (optional): số trang, mặc định là 1
//   - limit (optional): số lượng phim trên mỗi trang, mặc định là 10
//   - status (optional): trạng thái của phim ('coming-soon', 'now-showing', 'ended')
//   - keyword (optional): từ khóa tìm kiếm theo tên phim
//   - genre (optional): thể loại phim
// - Example: GET /api/movies?page=2&limit=5&status=now-showing
router.get('/', movieController.getAllMovies);

// Lấy thông tin phim kèm suất chiếu
router.get(
    '/:id/showtimes',
    movieController.getMovieWithShowtimes
);

module.exports = router;
