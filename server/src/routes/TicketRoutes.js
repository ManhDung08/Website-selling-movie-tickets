const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/TicketController');
const ticketValidation = require('../middleware/validation/TicketValidation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Lấy danh sách vé (chỉ admin)
router.get('/', 
    adminMiddleware, 
    ticketController.getAllTickets
);

// Lấy thông tin vé theo ID (admin và người dùng sở hữu vé)
router.get('/:id', 
    authMiddleware, 
    ticketController.getTicketById
);

// Lấy danh sách vé của người dùng (đã đăng nhập)
router.get('/user/my-tickets', 
    authMiddleware, 
    ticketController.getTicketsByUser
);

// Tạo vé mới (đã đăng nhập)
router.post('/', 
    authMiddleware, 
    ticketValidation.createTicketValidation, 
    ticketController.createTicket
);

// Hủy vé (chỉ admin)
router.delete('/:id/cancel', 
    adminMiddleware, 
    ticketValidation.validateCancelTicket, 
    ticketController.cancelTicket
);

module.exports = router;