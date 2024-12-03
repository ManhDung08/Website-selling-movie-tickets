const { body } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const validate = require('./Validate');

// Kiểm tra username hoặc email đã tồn tại
const checkUniqueField = async (field, value, user = null) => {
    const query = { [field]: value };
    
    // Nếu đang trong quá trình cập nhật thông tin (user có tồn tại), loại trừ bản ghi hiện tại
    if (user && user._id) {
        query._id = { $ne: user._id };
    }
    
    const existing = await User.findOne(query);
    if (existing) {
        throw new Error(`${field === 'username' ? 'Tên đăng nhập' : 'Email'} đã được sử dụng`);
    }
    return true;
};

// Hàm validation thông tin cơ bản cho người dùng: tên, ngày sinh, sđt
const baseUserValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Họ và tên không được để trống')
        .isLength({ min: 2, max: 50 }).withMessage('Họ và tên phải từ 2-50 ký tự'),

    body('phone')
        .trim()
        .notEmpty().withMessage('Số điện thoại không được để trống')
        .matches(/^(0|\+84)[3-9][0-9]{8}$/).withMessage('Số điện thoại không hợp lệ'),

    body('dateOfBirth')
        .notEmpty().withMessage('Ngày sinh không được để trống')
        .isISO8601().toDate()
        .withMessage('Ngày sinh không đúng định dạng'),
];


//For admin
// Validation cho việc tạo người dùng
exports.createUserValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Tên đăng nhập không được để trống')
        .isLength({ min: 4, max: 20 }).withMessage('Tên đăng nhập phải từ 4-20 ký tự')
        .custom(async (value) => {
            await checkUniqueField('username', value);
        }),

    body('email')
        .trim()
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ')
        .custom(async (value) => {
            await checkUniqueField('email', value);
        }),

    body('password')
        .trim()
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[A-Z]/).withMessage('Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
        .matches(/[0-9]/).withMessage('Mật khẩu phải chứa ít nhất một chữ số'),
    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Vai trò không hợp lệ'),
    ...baseUserValidation,
    validate
];


//For user
// Validation cho việc đăng ký người dùng
exports.registerUserValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Tên đăng nhập không được để trống')
        .isLength({ min: 4, max: 20 }).withMessage('Tên đăng nhập phải từ 4-20 ký tự')
        .custom(async (value) => {
            await checkUniqueField('username', value);
        }),

    body('email')
        .trim()
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ')
        .custom(async (value) => {
            await checkUniqueField('email', value);
        }),

    body('password')
        .trim()
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 8 }).withMessage('Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/[A-Z]/).withMessage('Mật khẩu phải chứa ít nhất một chữ cái viết hoa')
        .matches(/[0-9]/).withMessage('Mật khẩu phải chứa ít nhất một chữ số'),
    ...baseUserValidation,
    validate
];


//For both
// Validation cho việc đăng nhập
exports.loginValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Tên đăng nhập không được để trống'),
    body('password')
        .notEmpty().withMessage('Mật khẩu không được để trống'),
    validate
];


// Hàm kiểm tra cập nhật thông tin người dùng
exports.updateUserValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Tên đăng nhập không được để trống')
        .isLength({ min: 4, max: 20 }).withMessage('Tên đăng nhập phải từ 4-20 ký tự')
        .custom(async (value, { req }) => {
            await checkUniqueField('username', value, req.user);
        }),

    body('email')
        .trim()
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ')
        .custom(async (value, { req }) => {
            await checkUniqueField('email', value, req.user);
        }),

    ...baseUserValidation,

    // Kiểm tra quyền thay đổi role
    body('role')
        .optional()
        .custom((value, { req }) => {
            if (!req.user || !req.user.role || !req.params.id) {
                throw new Error('Thông tin không hợp lệ');
            }

            if (req.user._id.toString() === req.params.id.toString()) {
                throw new Error('Admin không thể thay đổi vai trò của chính mình');
            }
            if (req.user.role === 'admin' && value) {
                return true;  //Admin đc phép
            }

            // Người dùng thông thường không được phép thay đổi role
            throw new Error('Chỉ admin mới có thể thay đổi vai trò người dùng');
        }),

    validate
];

exports.changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Mật khẩu hiện tại không được để trống')
        .custom(async (currentPassword, { req }) => {
            const user = await User.findById(req.user._id); // Lấy thông tin người dùng từ cơ sở dữ liệu
            if (!user) {
                throw new Error('Người dùng không tồn tại');
            }
            const isMatch = await bcrypt.compare(currentPassword, user.password); // So sánh mật khẩu cũ
            if (!isMatch) {
                throw new Error('Mật khẩu hiện tại không đúng');
            }
        }),

    body('newPassword')
        .notEmpty().withMessage('Mật khẩu mới không được để trống')
        .isLength({ min: 8 }).withMessage('Mật khẩu mới phải có ít nhất 8 ký tự')
        .matches(/[A-Z]/).withMessage('Mật khẩu mới phải chứa ít nhất một chữ cái viết hoa')
        .matches(/[0-9]/).withMessage('Mật khẩu mới phải chứa ít nhất một chữ số')
        .custom((newPassword, { req }) => {
            if (newPassword === req.body.currentPassword) {
                throw new Error('Mật khẩu mới không được trùng với mật khẩu hiện tại');
            }
            return true;
        }),
    
    body('confirmNewPassword')
        .notEmpty().withMessage('Xác nhận mật khẩu mới không được để trống')
        .custom((confirmNewPassword, { req }) => {
            if (confirmNewPassword !== req.body.newPassword) {
                throw new Error('Xác nhận mật khẩu mới không khớp');
            }
            return true;
        }),

    validate
];