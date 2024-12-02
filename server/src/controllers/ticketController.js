const ticketService = require('../services/ticketService');
const Ticket = require('../models/Ticket');
const Showtime = require('../models/Showtime');


// Tạo vé mới
exports.createTicket = async (req, res, next) => {
    try {
        const ticketData = req.body;
        const ticket = await ticketService.createTicket(ticketData);
        
        res.status(201).json({
            status: 'success',
            message: 'Ticket created successfully',
            data: ticket,
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Lấy vé theo ID
exports.getTicketById = async (req, res, next) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        if (!ticket) {
            return next(createError(404, 'Ticket not found'));
        }
        res.status(200).json({
            status: 'success',
            data: ticket,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy danh sách vé
exports.getAllTickets = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await ticketService.getAllTickets(Number(page), Number(limit));
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy vé của người dùng
exports.getTicketsByUser = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await ticketService.getTicketsByUser(
            req.user.id,
            Number(page), 
            Number(limit)
        );
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Cập nhật trạng thái thanh toán
exports.updatePaymentStatus = async (req, res, next) => {
    try {
        const { paymentStatus } = req.body;
        const ticket = await ticketService.updatePaymentStatus(req.params.id, paymentStatus);
        if (!ticket) {
            return next(createError(404, 'Ticket not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Payment status updated successfully',
            data: ticket,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Hủy vé
exports.cancelTicket = async (req, res, next) => {
    try {
        const ticket = await ticketService.cancelTicket(req.params.id);
        if (!ticket) {
            return next(createError(404, 'Ticket not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Ticket cancelled successfully',
            data: ticket,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};