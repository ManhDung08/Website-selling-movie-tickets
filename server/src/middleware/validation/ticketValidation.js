const { body, param } = require('express-validator');
const Ticket = require('../../models/Ticket');
const Showtime = require('../../models/Showtime');
const User = require('../../models/User');
const validate = require('./Validate');


// Kiểm tra ghế đã được đặt 
const validateSeatsAvailability = async (seats, showtimeId) => {
    if (!Array.isArray(seats) || seats.length === 0) {
        throw new Error('Danh sách ghế không hợp lệ');
    }

    const existingTickets = await Ticket.find({
        showtimeId,
        paymentStatus: { $in: ['pending', 'paid'] }
    });

    const reservedSeats = new Set(
        existingTickets.flatMap((ticket) =>
            ticket.seats.map((seat) => `${seat.row}-${seat.number}`)
        )
    );

    seats.forEach((seat) => {
        const seatKey = `${seat.row}-${seat.number}`;
        if (reservedSeats.has(seatKey)) {
            throw new Error(`Ghế ${seatKey} đã được đặt`);
        }
    });
};

// Validate ghế và tính toán tổng số tiền
const validateSeats = async (seats, showtimeId) => {
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
        throw new Error('Suất chiếu không tồn tại');
    }

    const seenSeats = new Set();
    let totalAmount = 0;
    seats.forEach((seat, index) => {
        // Validate seat uniqueness
        const seatKey = `${seat.row}-${seat.number}`;
        if (seenSeats.has(seatKey)) {
            throw new Error(`Ghế ${seatKey} bị trùng`);
        }
        seenSeats.add(seatKey);

        // Validate seat details
        if (!['standard', 'vip', 'couple'].includes(seat.type)) {
            throw new Error(`Loại ghế tại vị trí ${index} không hợp lệ`);
        }

        // Tính toán tổng tiền dựa trên loại ghế
        totalAmount += seat.price || 0;
    });

    // Kiểm tra ghế đã được đặt 
    await validateSeatsAvailability(seats, showtimeId);

    return totalAmount;
};

const validateItems = async (items) => {
    if (!Array.isArray(items)) {
        throw new Error('Danh sách items không hợp lệ');
    }

    let totalItemsAmount = 0;
    for (const item of items) {
        const concession = await Concession.findById(item.concessionId);
        if (!concession) {
            throw new Error(`Concession ${item.concessionId} không tồn tại`);
        }
        
        if (concession.status !== 'available') {
            throw new Error(`${concession.name} hiện không có sẵn`);
        }

        if (item.quantity < 1) {
            throw new Error('Số lượng phải lớn hơn 0');
        }

        if (item.price !== concession.price * item.quantity) {
            throw new Error('Giá không khớp với số lượng');
        }

        totalItemsAmount += item.price;
    }

    return totalItemsAmount;
};

const baseTicketValidation = [
    body('showtimeId')
        .isMongoId().withMessage('ID suất chiếu không hợp lệ')
        .custom(async (value) => {
            const showtime = await Showtime.findById(value);
            if (!showtime || showtime.status === 'full' || showtime.status === 'cancelled') {
                throw new Error('Suất chiếu không khả dụng');
            }
            return true;
        }),

    body('seats')
        .custom(async (seats, { req }) => {
            req.calculatedTotalAmount = await validateSeats(seats, req.body.showtimeId);
            return true;
        }),

    body('items')
        .optional()
        .isArray().withMessage('Items phải là một mảng')
        .custom(async (items, { req }) => {
            if (items && items.length > 0) {
                const itemsAmount = await validateItems(items);
                req.calculatedTotalAmount = (req.calculatedTotalAmount || 0) + itemsAmount;
            }
            return true;
        }),

    body('totalAmount')
        .custom((value, { req }) => {
            if (value !== req.calculatedTotalAmount) {
                throw new Error('Tổng số tiền không khớp');
            }
            return true;
        }),

    body('paymentStatus')
        .isIn(['pending', 'paid', 'cancelled', 'refunded']).withMessage('Trạng thái thanh toán không hợp lệ'),

    body('paymentMethod')
        .isIn(['VNPay', 'momo', 'zalopay']).withMessage('Phương thức thanh toán không hợp lệ')
];

exports.createTicketValidation = [
    body('userId')
        .isMongoId().withMessage('ID người dùng không hợp lệ')
        .custom(async (value) => {
            const user = await User.findById(value);
            if (!user) {
                throw new Error('Người dùng không tồn tại');
            }
            return true;
        }),

    body('bookingCode')
        .trim()
        .notEmpty().withMessage('Mã đặt vé không được để trống')
        .isLength({ min: 6, max: 20 }).withMessage('Mã đặt vé phải từ 6-20 ký tự'),

    body('qrCode')
        .trim()
        .notEmpty().withMessage('Mã QR không được để trống')
        .isLength({ min: 10, max: 50 }).withMessage('Mã QR phải từ 10-50 ký tự'),

    ...baseTicketValidation,
    validate
];

exports.updateTicketValidation = [
    body('paymentStatus')
        .isIn(['pending', 'paid', 'cancelled', 'refunded']).withMessage('Trạng thái thanh toán không hợp lệ'),

    validate
];

exports.deleteTicketValidation = [
    param('id')
        .isMongoId().withMessage('ID vé không hợp lệ'),
    validate
];

exports.validateCancelTicket = [
    param('id')
        .isMongoId().withMessage('ID vé không hợp lệ'),
];