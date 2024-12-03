const express = require('express');
const router = express.Router();

// Import các route controller
const movieRoutes = require('./MovieRoutes');
const revenueRoutes = require('./RevenueRoutes');
const roomRoutes = require('./RoomRoutes');
const showtimeRoutes = require('./ShowtimeRoutes');
const theaterRoutes = require('./TheaterRoutes');
const ticketRoutes = require('./TicketRoutes');
const userRoutes = require('./UserRoutes');
const paymentRoutes = require('./PaymentRoutes');

// Định tuyến các API
router.use('/movies', movieRoutes);         // Đường dẫn cho các API liên quan đến phim
router.use('/revenues', revenueRoutes);     // Đường dẫn cho các API liên quan đến doanh thu
router.use('/rooms', roomRoutes);           // Đường dẫn cho các API liên quan đến phòng chiếu
router.use('/showtimes', showtimeRoutes);   // Đường dẫn cho các API liên quan đến suất chiếu
router.use('/theaters', theaterRoutes);     // Đường dẫn cho các API liên quan đến rạp chiếu
router.use('/tickets', ticketRoutes);       // Đường dẫn cho các API liên quan đến vé đã đặt
router.use('/users', userRoutes);           // Đường dẫn cho các API liên quan đến người dùng
router.use('/payment', paymentRoutes);      // Đường dẫn cho các API liên quan đến thanh toán

module.exports = router;
