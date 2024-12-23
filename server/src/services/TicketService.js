const Ticket = require('../models/Ticket');
const Showtime = require('../models/Showtime');
const mongoose = require('mongoose');
const QRCode = require('qrcode');


// Sinh mã đặt vé ngẫu nhiên
const generateBookingCode = () => {
    // Tạo mã gồm 8 ký tự viết hoa và số
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    
    return result;
};

// Sinh mã QR code
const generateQRCode = async (bookingCode) => {
    try {
        // Tạo QR code từ mã đặt vé, trả về dạng base64
        const qrCodeOptions = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.92,
            margin: 1,
        };
        
        return QRCode.toDataURL(bookingCode, qrCodeOptions);
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Không thể tạo mã QR');
    }
};

// Kiểm tra trùng mã đặt vé
const checkUniqueBookingCode = async (bookingCode) => {
    const existingTicket = await Ticket.findOne({ bookingCode });
    return !existingTicket;
};

// Sinh mã đặt vé duy nhất
const createUniqueBookingCode = async () => {
    let bookingCode;
    let isUnique = false;
    
    while (!isUnique) {
        bookingCode = generateBookingCode();
        isUnique = await checkUniqueBookingCode(bookingCode);
    }
    
    return bookingCode;
};

// Tạo vé mới
exports.createTicket = async (ticketData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Tạo mã đặt vé và QR code duy nhất
        const bookingCode = await createUniqueBookingCode();
        const qrCode = await generateQRCode(bookingCode);

        // Tính toán tổng giá vé
        const seatsAmount = ticketData.seats.reduce((total, seat) => total + seat.price, 0);
        
        // Tính tổng tiền bỏng nước
        const itemsAmount = ticketData.items ? ticketData.items.reduce((total, item) => total + item.price, 0) : 0;

        // Thêm mã đặt vé, QR code và tổng giá vé vào dữ liệu vé
        const ticketWithCodes = {
            ...ticketData,
            bookingCode,
            qrCode,
            totalAmount: seatsAmount + itemsAmount,
        };

        // Lưu vé mới
        const ticket = new Ticket(ticketWithCodes);
        await ticket.save({ session });

        // Cập nhật trạng thái suất chiếu
        await updateShowtimeStatus(ticketData.showtimeId, session);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        // Populate ticket và gửi email xác nhận
        const populatedTicket = await ticket.populate(['userId', 'showtimeId', 'items.concessionId']);
        await emailService.sendTicketConfirmationEmail(populatedTicket, user);

        return populatedTicket;
    } catch (error) {
        // Rollback transaction nếu có lỗi
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Cập nhật trạng thái suất chiếu
exports.updateShowtimeStatus = async (showtimeId, session) => {
    const tickets = await Ticket.countDocuments({ 
        showtimeId, 
        paymentStatus: { $in: ['pending', 'paid'] } 
    });
    
    const showtime = await Showtime.findById(showtimeId);
    const totalSeats = showtime.roomId.seatMap.length;

    if (tickets >= totalSeats * 0.9) {
        await Showtime.findByIdAndUpdate(showtimeId, { status: 'almost-full' }, { session });
    } else if (tickets >= totalSeats) {
        await Showtime.findByIdAndUpdate(showtimeId, { status: 'full' }, { session });
    }
};

// Lấy vé theo ID
exports.getTicketById = async (ticketId) => {
    return Ticket.findById(ticketId).populate(['userId', 'showtimeId', 'items.concessionId']);
};

// Lấy danh sách vé với phân trang
exports.getAllTickets = async (page = 1, limit = 10) => {
    const tickets = await Ticket.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate(['userId', 'showtimeId', 'items.concessionId']);

    const totalTickets = await Ticket.countDocuments();

    return {
        tickets,
        total: totalTickets,
        page,
        pages: Math.ceil(totalTickets / limit),
    };
};

// Lấy vé của người dùng
exports.getTicketsByUser = async (userId, page = 1, limit = 10) => {
    const tickets = await Ticket.find({ userId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate(['userId', 'showtimeId', 'items.concessionId']);

    const totalTickets = await Ticket.countDocuments({ userId });

    return {
        tickets,
        total: totalTickets,
        page,
        pages: Math.ceil(totalTickets / limit),
    };
};

// Cập nhật trạng thái thanh toán
exports.updatePaymentStatus = async (ticketId, paymentStatus) => {
    return Ticket.findByIdAndUpdate(
        ticketId, 
        { paymentStatus }, 
        { new: true }
    ).populate(['userId', 'showtimeId', 'items.concessionId']);
};

// Hủy vé
exports.cancelTicket = async (ticketId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Cập nhật trạng thái vé
        const ticket = await Ticket.findByIdAndUpdate(
            ticketId, 
            { 
                paymentStatus: 'cancelled',
                paymentMethod: null 
            }, 
            { new: true, session }
        );

        // Cập nhật lại trạng thái suất chiếu
        if (ticket) {
            await updateShowtimeStatus(ticket.showtimeId, session);
        }

        await session.commitTransaction();
        session.endSession();

        return ticket;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};