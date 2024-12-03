const express = require('express');
const router = express.Router();
const roomController = require('../controllers/RoomController');
const roomValidation = require('../middleware//validation/RoomValidation');
const { adminMiddleware, authMiddleware } = require('../middleware/auth');

// Lấy danh sách phòng chiếu với các tùy chọn lọc và phân trang
// - Query params:
//   - page (optional): số trang, mặc định là 1
//   - limit (optional): số lượng phòng chiếu trên mỗi trang, mặc định là 10
//   - keyword (optional): từ khóa tìm kiếm theo tên phòng chiếu
//   - theaterId (optional): ID của rạp để lọc phòng chiếu theo rạp
//   - type (optional): loại phòng chiếu (ví dụ: 'IMAX', '2D', '3D')
// - Example: GET /api/rooms?page=2&limit=5&theaterId=123&type=IMAX
router.get('/', roomController.getAllRooms);

// Lấy thông tin chi tiết phòng chiếu theo ID
router.get('/:id', roomController.getRoomById);

// Tạo mới phòng chiếu (chỉ admin)
router.post(
    '/',
    adminMiddleware,
    roomValidation.createRoomValidation,
    roomController.createRoom
);

// Cập nhật thông tin phòng chiếu (chỉ admin)
router.put(
    '/:id',
    adminMiddleware,
    roomValidation.updateRoomValidation,
    roomController.updateRoom
);

// Xóa phòng chiếu (chỉ admin)
router.delete(
    '/:id',
    adminMiddleware,
    roomValidation.deleteRoomValidation,
    roomController.deleteRoom
);

module.exports = router;
