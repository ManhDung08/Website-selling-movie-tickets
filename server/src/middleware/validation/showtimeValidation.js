const { body, param } = require('express-validator');
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theater');
const Room = require('../../models/Room');
const Ticket = require('../../models/Ticket');
const validate = require('./Validate');

const validateShowtimeOverlap = async (movieId, theaterId, roomId, startTime, endTime, showtimeId = null) => {
    const query = {
        movieId,
        theaterId, 
        roomId,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
    };

    if (showtimeId) {
        query._id = { $ne: showtimeId };
    }

    const overlappingShowtime = await Showtime.findOne(query);
    
    if (overlappingShowtime) {
        throw new Error('Suất chiếu bị trùng với suất chiếu khác');
    }
    return true;
};

const baseShowtimeValidation = [
    body('startTime')
        .isISO8601().toDate().withMessage('Thời gian bắt đầu không hợp lệ')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('Thời gian bắt đầu phải sau thời điểm hiện tại');
            }
            return true;
        }),

    body('endTime')
        .isISO8601().toDate().withMessage('Thời gian kết thúc không hợp lệ')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startTime)) {
                throw new Error('Thời gian kết thúc phải sau thời gian bắt đầu');
            }
            return true;
        }),

    body('price.standard')
        .isFloat({ min: 0 }).withMessage('Giá vé standard không hợp lệ'),

    body('price.vip')
        .isFloat({ min: 0 }).withMessage('Giá vé vip không hợp lệ'),

    body('price.couple')
        .isFloat({ min: 0 }).withMessage('Giá vé couple không hợp lệ'),

    body('status')
        .optional()
        .isIn(['available', 'almost-full', 'full', 'cancelled']).withMessage('Trạng thái suất chiếu không hợp lệ')
];

exports.createShowtimeValidation = [
    body('movieId')
        .isMongoId().withMessage('ID phim không hợp lệ')
        .custom(async (value) => {
            const movie = await Movie.findById(value);
            if (!movie) {
                throw new Error('Phim không tồn tại');
            }
            return true;
        }),

    body('theaterId')
        .isMongoId().withMessage('ID rạp không hợp lệ')
        .custom(async (value) => {
            const theater = await Theater.findById(value);
            if (!theater) {
                throw new Error('Rạp không tồn tại');
            }
            return true;
        }),

    body('roomId')
        .isMongoId().withMessage('ID phòng không hợp lệ')
        .custom(async (value, { req }) => {
            const room = await Room.findOne({ 
                _id: value, 
                theaterId: req.body.theaterId 
            });
            if (!room) {
                throw new Error('Phòng không thuộc rạp được chọn');
            }
            return true;
        }),

    ...baseShowtimeValidation,
    
    body().custom(async (body, { req }) => {
        await validateShowtimeOverlap(
            req.body.movieId, 
            req.body.theaterId, 
            req.body.roomId, 
            req.body.startTime, 
            req.body.endTime
        );
        return true;
    }),

    validate
];

exports.updateShowtimeValidation = [
    ...baseShowtimeValidation,
    
    body().custom(async (body, { req }) => {
        await validateShowtimeOverlap(
            req.body.movieId, 
            req.body.theaterId, 
            req.body.roomId, 
            req.body.startTime, 
            req.body.endTime,
            req.params.id
        );
        return true;
    }),

    validate
];

exports.deleteShowtimeValidation = [
    param('id')
        .isMongoId().withMessage('ID suất chiếu không hợp lệ')
        .custom(async (value) => {
            // Kiểm tra xem có vé nào đã được đặt cho suất chiếu này không
            const ticketCount = await Ticket.countDocuments({ showtimeId: value });
            if (ticketCount > 0) {
                throw new Error('Không thể xóa suất chiếu vì đã có vé được đặt.');
            }
            return true;
        }),
    validate
];