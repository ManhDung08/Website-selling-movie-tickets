const { body, param } = require('express-validator');
const Concession = require('../../models/Concession');
const Theater = require('../../models/Theater');
const validate = require('./Validate');

const baseConcessionValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Tên không được để trống')
        .isLength({ min: 2, max: 100 }).withMessage('Tên phải từ 2-100 ký tự'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Mô tả không được quá 500 ký tự'),

    body('category')
        .isIn(['popcorn', 'beverage', 'snack', 'combo']).withMessage('Danh mục không hợp lệ'),

    body('price')
        .isFloat({ min: 0 }).withMessage('Giá phải là số dương'),

    body('image')
        .optional()
        .trim()
        .isURL().withMessage('URL hình ảnh không hợp lệ'),

    body('size')
        .isIn(['S', 'M', 'L', 'XL']).withMessage('Kích thước không hợp lệ'),

    body('status')
        .optional()
        .isIn(['available', 'out_of_stock', 'discontinued']).withMessage('Trạng thái không hợp lệ'),

    body('theaterId')
        .optional()
        .isMongoId().withMessage('ID rạp không hợp lệ')
        .custom(async (value) => {
            const theater = await Theater.findById(value);
            if (!theater) {
                throw new Error('Rạp không tồn tại');
            }
            return true;
        })
];

exports.createConcessionValidation = [
    ...baseConcessionValidation,
    validate
];

exports.updateConcessionValidation = [
    ...baseConcessionValidation,
    validate
];

exports.deleteConcessionValidation = [
    param('id')
        .isMongoId().withMessage('ID không hợp lệ'),
    validate
];