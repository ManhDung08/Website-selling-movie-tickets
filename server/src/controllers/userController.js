const userService = require('../services/UserService');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Tạo user mới
exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};


exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};


//Sử dụng phân trang
exports.getAllUsers = async (req, res, next) => {
    try {
        const { keyword, page = 1, limit = 10, role } = req.query;
        let result;

        if (role) {
            // Nếu có vai trò, lọc theo vai trò
            result = await userService.getUsersByRole(role, Number(page), Number(limit));
        } else if (keyword) {
            // Nếu có từ khóa, tìm kiếm người dùng
            result = await userService.searchUsers(keyword, Number(page), Number(limit));
        } else {
            // Nếu không có điều kiện, lấy tất cả người dùng
            result = await userService.getAllUsers(Number(page), Number(limit));
        }

        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

//Cập nhật thông tin người dùng
exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return next(createError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

//Xóa User
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) {
            return next(createError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

//Thay đổi mật khẩu
exports.changePassword = async (req, res, next) => {
    try {
        const { newPassword } = req.body;
        const updatedUser = await userService.changePassword(req.user._id, newPassword);
        res.status(200).json({
            status: 'success',
            message: 'Password changed successfully',
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

//Đăng nhập
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        //Kiểm tra username
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return next(createError(404, 'User not found'));
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createError(401, 'Invalid credentials'));
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};
