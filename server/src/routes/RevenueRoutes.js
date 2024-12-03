const express = require('express');
const router = express.Router();
const RevenueController = require('../controllers/RevenueController');
const { adminMiddleware, authMiddleware } = require('../middleware/auth');

// Route tạo bản ghi doanh thu mới
// POST /api/revenue
router.post('/revenue',adminMiddleware, RevenueController.createRevenueRecord);

// Route lấy danh sách các bản ghi doanh thu với phân trang
// GET /api/revenue
router.get('/revenue',adminMiddleware, RevenueController.getRevenueRecords);

// Route lấy tổng hợp doanh thu trong một khoảng thời gian cụ thể
// GET /api/revenue/summary
router.get('/revenue/summary',adminMiddleware, RevenueController.getRevenueSummary);

// Route lấy các rạp hoặc phim có doanh thu tốt nhất
// GET /api/revenue/top-performers
router.get('/revenue/top-performers',adminMiddleware, RevenueController.getTopPerformers);

module.exports = router;
