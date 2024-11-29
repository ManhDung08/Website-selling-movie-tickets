const { body, param } = require('express-validator');
const Theater = require('../../models/Theater');
const validate = require('./validate');

const checkUniqueField = async (field, value, theater = null) => {
    const query = { [field]: value };

    // Nếu đang trong quá trình cập nhật thông tin (theater có tồn tại), loại trừ bản ghi hiện tại
    if (theater && theater._id) {
        query._id = { $ne: theater._id };
    }

    const existingTheater = await Theater.findOne(query);
    if (existingTheater) {
        throw new Error(`${field === 'name' ? 'Tên rạp' : 'Email'} đã được sử dụng`);
    }
    return true;
};

const baseUserValidation = [
    body('address')
        .trim()
        .notEmpty().withMessage('Địa chỉ không được để trống'),

    body('city')
        .trim()
        .notEmpty().withMessage('Thành phố không được để trống'),

    body('totalRooms')
        .isInt({ min: 1 }).withMessage('Số lượng phòng phải là số nguyên và lớn hơn 0'),

    body('facilities')
        .isArray().withMessage('Tiện ích phải là một mảng')
        .custom((value) => {
            if (value && value.length > 0 && value.some(facility => typeof facility !== 'string')) {
                throw new Error('Mỗi tiện ích phải là một chuỗi');
            }
            return true;
        }),

    body('contact.phone')
        .trim()
        .notEmpty().withMessage('Số điện thoại không được để trống')
        .matches(/^(0|\+84)[3-9][0-9]{8}$/).withMessage('Số điện thoại không hợp lệ'),
];

// Validation cho việc tạo mới rạp
exports.createTheaterValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Tên rạp không được để trống')
        .isLength({ min: 3, max: 100 }).withMessage('Tên rạp phải có từ 3-100 ký tự')
        .custom(async (value) => {
            await checkUniqueField('name', value);
        }),

    body('contact.email')
        .trim()
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ')
        .custom(async (value) => {
            await checkUniqueField('contact.email', value);
        }),

    ...baseUserValidation,
    validate
];

// Validation cho việc cập nhật thông tin rạp
exports.updateTheaterValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Tên rạp không được để trống')
        .isLength({ min: 3, max: 100 }).withMessage('Tên rạp phải có từ 3-100 ký tự')
        .custom(async (value, { req }) => {
            await checkUniqueField('name', value, req.theater);
        }),
    
    body('contact.email')
        .trim()
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ')
        .custom(async (value, { req }) => {
            await checkUniqueField('contact.email', value, req.theater);
        }),
    
    ...baseUserValidation,
    validate
];

// Validation cho việc xóa rạp
exports.deleteTheaterValidation = [
    param('id')
        .isMongoId().withMessage('ID rạp không hợp lệ'),
    validate
];
