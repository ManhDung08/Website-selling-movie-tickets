const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/ShowtimeController');
const showtimeValidation = require('../middleware/validation/ShowtimeValidation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Lấy danh sách suất chiếu với các tùy chọn lọc và phân trang
// - Query params:
//   - page (optional): số trang, mặc định là 1
//   - limit (optional): số lượng suất chiếu trên mỗi trang, mặc định là 10
//   - movieId (optional): ID của phim để lọc suất chiếu theo phim
//   - theaterId (optional): ID của rạp để lọc suất chiếu theo rạp
//   - roomId (optional): ID của phòng chiếu để lọc suất chiếu theo phòng
//   - startDate (optional): ngày bắt đầu để lọc suất chiếu trong khoảng thời gian
//   - endDate (optional): ngày kết thúc để lọc suất chiếu trong khoảng thời gian
//   - upcoming (optional): nếu bằng 'true', lấy các suất chiếu sắp tới
// - Example: GET /api/showtimes?page=2&limit=5&movieId=123&startDate=2024-12-01&endDate=2024-12-31
router.get('/', showtimeController.getAllShowtimes);

// Lấy thông tin suất chiếu theo ID (cho cả admin và người dùng)
router.get('/:id', showtimeController.getShowtimeById);

// Tạo suất chiếu mới (chỉ admin)
router.post('/', 
    adminMiddleware, 
    showtimeValidation.createShowtimeValidation, 
    showtimeController.createShowtime
);

// Cập nhật thông tin suất chiếu (chỉ admin)
router.put('/:id', 
    adminMiddleware, 
    showtimeValidation.updateShowtimeValidation, 
    showtimeController.updateShowtime
);

// Xóa suất chiếu (chỉ admin)
router.delete('/:id', 
    adminMiddleware, 
    showtimeValidation.deleteShowtimeValidation, 
    showtimeController.deleteShowtime
);

module.exports = router;