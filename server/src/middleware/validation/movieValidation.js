const { body, param } = require('express-validator');
const Movie = require('../../models/Movie');
const validate = require('./Validate');

const checkUniqueField = async (field, value, movie = null) => {
    const query = { [field]: value };

    if (movie && movie._id) {
        query._id = { $ne: movie._id };
    }

    const existingMovie = await Movie.findOne(query);
    if (existingMovie) {
        throw new Error(`Phim với ${field === 'title' ? 'tên' : 'thông tin'} này đã tồn tại`);
    }
    return true;
};

const baseMovieValidation = [
    body('description')
        .trim()
        .notEmpty().withMessage('Mô tả phim không được để trống')
        .isLength({ min: 10, max: 1000 }).withMessage('Mô tả phim phải từ 10-1000 ký tự'),

    body('duration')
        .isInt({ min: 1, max: 300 }).withMessage('Thời lượng phim không hợp lệ (1-300 phút)'),

    body('genre')
        .isArray().withMessage('Thể loại phải là một mảng')
        .custom((value) => {
            if (value && value.length > 0 && value.some(genre => typeof genre !== 'string')) {
                throw new Error('Mỗi thể loại phải là một chuỗi');
            }
            return true;
        }),

    body('releaseDate')
        .isISO8601().toDate().withMessage('Ngày phát hành không hợp lệ')
        .custom((value) => {
            if (value <= new Date()) {
                throw new Error('Ngày phát hành phải lớn hơn ngày hiện tại.');
            }
            return true;
        }),

    body('language')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('Ngôn ngữ không hợp lệ'),

    body('director')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Tên đạo diễn không hợp lệ'),

    body('cast')
        .optional()
        .isArray()
        .custom((value) => {
            if (value && value.length > 0 && value.some(actor => typeof actor !== 'string')) {
                throw new Error('Mỗi diễn viên phải là một chuỗi');
            }
            return true;
        }),

    body('poster')
        .optional()
        .isURL().withMessage('Liên kết poster không hợp lệ'),

    body('status')
        .optional()
        .isIn(['coming-soon', 'now-showing', 'ended']).withMessage('Trạng thái phim không hợp lệ')
];

// Validation cho việc tạo mới phim
exports.createMovieValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Tên phim không được để trống')
        .isLength({ min: 2, max: 200 }).withMessage('Tên phim phải từ 2-200 ký tự')
        .custom(async (value) => {
            await checkUniqueField('title', value);
        }),

    ...baseMovieValidation,
    validate
];

// Validation cho việc cập nhật thông tin phim
exports.updateMovieValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Tên phim không được để trống')
        .isLength({ min: 2, max: 200 }).withMessage('Tên phim phải từ 2-200 ký tự')
        .custom(async (value, { req }) => {
            await checkUniqueField('title', value, req.movie);
        }),

    ...baseMovieValidation,
    validate
];

// Validation cho việc xóa phim
exports.deleteMovieValidation = [
    param('id')
        .isMongoId().withMessage('ID phim không hợp lệ'),
    validate
];