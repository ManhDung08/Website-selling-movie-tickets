const { validationResult } = require('express-validator');

// Middleware kiểm tra kết quả validation
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Tạo một danh sách lỗi chi tiết
        const errorDetails = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
            value: err.value
        }));

        // Trả về response lỗi nếu có lỗi validation
        return res.status(400).json({
            status: 'error',
            code: 'VALIDATION_ERROR',
            errors: errorDetails
        });
    }
    next(); // Nếu không có lỗi, tiếp tục với next middleware
};

module.exports = validate;