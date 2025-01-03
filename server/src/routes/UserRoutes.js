const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const userValidation = require('../middleware/validation/UserValidation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');


//For admin
// Lấy danh sách người dùng với các tùy chọn lọc và phân trang
// - Query params:
//   - page (optional): số trang, mặc định là 1
//   - limit (optional): số lượng người dùng trên mỗi trang, mặc định là 10
//   - keyword (optional): từ khóa tìm kiếm theo tên người dùng
//   - role (optional): vai trò của người dùng (ví dụ: 'admin', 'user')
// - Example: GET /api/users?page=2&limit=5&role=user
router.get('/', adminMiddleware, userController.getAllUsers);

// Tạo user mới
router.post('/', adminMiddleware, userValidation.createUserValidation, userController.createUser);

// Lấy user theo ID
router.get('/:id', authMiddleware, userController.getUserById);

// Xóa user
router.delete('/:id', adminMiddleware, userController.deleteUser);

//For both
// Cập nhật thông tin người dùng
router.put('/:id', userValidation.updateUserValidation, authMiddleware, userController.updateUser);

// Cập nhật mật khẩu
router.put('/change-password', userValidation.changePasswordValidation, authMiddleware, userController.changePassword);

module.exports = router;
