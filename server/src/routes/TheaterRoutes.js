const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/TheaterController');
const theaterValidation = require('../middleware/validation/TheaterValidation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Lấy danh sách rạp với các tùy chọn lọc và phân trang
// - Query params:
//   - page (optional): số trang, mặc định là 1
//   - limit (optional): số lượng rạp trên mỗi trang, mặc định là 10
//   - keyword (optional): từ khóa tìm kiếm theo tên rạp
//   - city (optional): tên thành phố để lọc rạp theo thành phố
//   - minRooms (optional): số phòng tối thiểu để lọc theo số phòng
//   - maxRooms (optional): số phòng tối đa để lọc theo số phòng
// - Example: GET /api/theaters?page=2&limit=5&city=Hanoi&minRooms=5&maxRooms=20
router.get('/', theaterController.getAllTheaters);

// Lấy thông tin rạp theo ID (cho cả admin và người dùng)
router.get('/:id', theaterController.getTheaterById);

// Tạo rạp mới (chỉ admin)
router.post('/', 
    adminMiddleware, 
    theaterValidation.createTheaterValidation, 
    theaterController.createTheater
);

// Cập nhật thông tin rạp (chỉ admin)
router.put('/:id', 
    adminMiddleware, 
    theaterValidation.updateTheaterValidation, 
    theaterController.updateTheater
);

// Xóa rạp (chỉ admin)
router.delete('/:id', 
    adminMiddleware, 
    theaterValidation.deleteTheaterValidation, 
    theaterController.deleteTheater
);

module.exports = router;