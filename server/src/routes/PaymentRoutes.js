const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

// Route tạo giao dịch thanh toán
router.post('/create-payment', paymentController.createPayment);

// Route xử lý kết quả trả về từ VNPay sau khi thanh toán
router.get('/vnpay-return', paymentController.vnpayReturn);

// Route xử lý IPN từ VNPay (thông báo thanh toán tức thời)
router.get('/vnpay-ipn', paymentController.vnpayIpn);

module.exports = router;
