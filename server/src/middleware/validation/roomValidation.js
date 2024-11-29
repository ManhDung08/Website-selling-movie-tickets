const { body, param } = require('express-validator');
const Room = require('../../models/Room');
const Theater = require('../../models/Theater');
const validate = require('./validate');

const checkUniqueField = async (field, value, room = null) => {
    const query = { 
        [field]: value,
        theaterId: room?.theaterId 
    };

    // Nếu đang trong quá trình cập nhật thông tin (room có tồn tại), loại trừ bản ghi hiện tại
    if (room && room._id) {
        query._id = { $ne: room._id };
    }

    const existingRoom = await Room.findOne(query);
    if (existingRoom) {
        throw new Error(`Tên phòng trong rạp này đã tồn tại`);
    }
    return true;
};

const validateSeatMap = (seatMap) => {
    if (!Array.isArray(seatMap) || seatMap.length === 0) {
        throw new Error('Sơ đồ ghế không hợp lệ');
    }

    const seenSeats = new Set();

    seatMap.forEach((seat, index) => {
        // Validate row
        if (!seat.row || typeof seat.row !== 'string') {
            throw new Error(`Hàng ghế tại vị trí ${index} không hợp lệ`);
        }

        // Validate seat number
        if (!seat.number || typeof seat.number !== 'number' || seat.number <= 0) {
            throw new Error(`Số ghế tại vị trí ${index} không hợp lệ`);
        }

        // Check for duplicate seats
        const seatKey = `${seat.row}-${seat.number}`;
        if (seenSeats.has(seatKey)) {
            throw new Error(`Ghế ${seatKey} bị trùng`);
        }
        seenSeats.add(seatKey);

        // Validate seat type
        if (!['standard', 'vip', 'couple'].includes(seat.type)) {
            throw new Error(`Loại ghế tại vị trí ${index} không hợp lệ`);
        }

        // Validate seat status
        if (!['active', 'maintenance'].includes(seat.status)) {
            throw new Error(`Trạng thái ghế tại vị trí ${index} không hợp lệ`);
        }
    });

    return true;
};

const baseRoomValidation = [
    body('capacity')
        .isInt({ min: 1 }).withMessage('Sức chứa phòng phải là số nguyên và lớn hơn 0'),

    body('type')
        .isIn(['2D', '3D', '4DX', 'IMAX']).withMessage('Loại phòng chiếu không hợp lệ'),

    body('seatMap')
        .custom(validateSeatMap)
];

// Validation cho việc tạo mới phòng chiếu
exports.createRoomValidation = [
    body('theaterId')
        .notEmpty().withMessage('Mã rạp không được để trống')
        .isMongoId().withMessage('Mã rạp không hợp lệ')
        .custom(async (value) => {
            const theater = await Theater.findById(value);
            if (!theater) {
                throw new Error('Rạp không tồn tại');
            }
            return true;
        }),

    body('name')
        .trim()
        .notEmpty().withMessage('Tên phòng không được để trống')
        .isLength({ min: 3, max: 50 }).withMessage('Tên phòng phải có từ 3-50 ký tự')
        .custom(async (value, { req }) => {
            await checkUniqueField('name', value);
        }),

    ...baseRoomValidation,
    validate
];

// Validation cho việc cập nhật thông tin phòng chiếu
exports.updateRoomValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Tên phòng không được để trống')
        .isLength({ min: 3, max: 50 }).withMessage('Tên phòng phải có từ 3-50 ký tự')
        .custom(async (value, { req }) => {
            await checkUniqueField('name', value, req.room);
        }),

    ...baseRoomValidation,
    validate
];

// Validation cho việc xóa phòng chiếu
exports.deleteRoomValidation = [
    param('id')
        .isMongoId().withMessage('ID phòng chiếu không hợp lệ'),
    validate
];