const paymentService = require('../services/PaymentService');
const Payment = require('../models/Payment');

//Tạo giao dịch thanh toán
exports.createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req);
    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};

//Xử lý trả về từ VNPay
exports.vnpayReturn = (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const sortedParams = Object.entries(vnp_Params)
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

  // Tạo chuỗi tham số để ký
  const signData = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  // Ký HMAC SHA512
  const secretKey = "HUQHTRVXVRGJJWHMBFCAUBAXOSAJBIND";
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    // Xử lý dữ liệu sau khi thanh toán thành công
    const rspCode = vnp_Params['vnp_ResponseCode'];
    if (rspCode === '00') {
      // Cập nhật trạng thái thanh toán thành công
      Payment.findOneAndUpdate({ transactionCode: vnp_Params['vnp_TxnRef'] }, { status: 'success' })
        .then(() => {
          res.render('success', { code: rspCode });
        })
        .catch((error) => {
          res.render('error', { message: 'Error updating payment status', error: error.message });
        });
    } else {
      res.render('error', { message: 'Payment failed', error: 'Transaction not successful' });
    }
  } else {
    res.render('error', { message: 'Checksum failed', error: 'Invalid signature' });
  }
};


// Xử lý IPN (Instant Payment Notification) từ VNPay
exports.vnpayIpn = (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];
  const orderId = vnp_Params['vnp_TxnRef'];
  const rspCode = vnp_Params['vnp_ResponseCode'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const secretKey = "HUQHTRVXVRGJJWHMBFCAUBAXOSAJBIND";
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac('sha512', secretKey);
  let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    // Kiểm tra và cập nhật trạng thái thanh toán trong cơ sở dữ liệu
    Payment.findOne({ transactionCode: orderId }).then(payment => {
      if (payment) {
        payment.status = rspCode === '00' ? 'success' : 'failed';
        payment.save();
        res.status(200).json({ message: 'Payment status updated', status: payment.status });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    }).catch(error => {
      res.status(500).json({ message: 'Error updating payment status', error: error.message });
    });
  } else {
    res.status(400).json({ message: 'Checksum failed' });
  }
};
