const Payment = require('../models/Payment'); 
const crypto = require('crypto');
const moment = require('moment');
const { URLSearchParams } = require('url');

// Logic xử lý thanh toán VNPay
exports.createPayment = async (ticketId, userId, amount, paymentMethod, bankCode) => {
  try {
    const date = new Date();
    const orderId = moment(date).format('DDHHmmss');
    const transactionCode = crypto.randomBytes(8).toString('hex'); // Mã giao dịch ngẫu nhiên nhỏ hơn
    const payment = new Payment({
      ticketId,
      userId,
      amount,
      paymentMethod,
      transactionCode,
      status: 'pending',
    });

    await payment.save();
    return payment;
  } catch (error) {
    throw new Error('Error creating payment: ' + error.message);
  }
};

// Logic tạo URL thanh toán cho VNPay
exports.createPaymentUrl = async (amount, content, req, bankCode = '') => {
  try {
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const expireDate = moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss');

    const tmnCode = "TXOOZNX4";
    const txnRef = getRandomNumber(8);
    const ipAddr = getIpAddress(req);
    const secretKey = "HUQHTRVXVRGJJWHMBFCAUBAXOSAJBIND";
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl = process.env.FRONTEND_URL + '/payment/vnpay_return';

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Amount: (amount * 100).toString(),
      vnp_CurrCode: 'VND',
      vnp_BankCode: bankCode,
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: content,
      vnp_OrderType: 'other',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
    };

    // Sắp xếp tham số theo thứ tự bảng chữ cái
    const sortedParams = Object.entries(vnp_Params)
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value.toString();
        }
        return acc;
      }, {});

    // Tạo URLSearchParams từ các tham số đã sắp xếp
    const redirectUrl = new URLSearchParams();
    Object.entries(sortedParams).forEach(([key, value]) => {
      redirectUrl.append(key, value);
    });

    // Ký HMAC SHA512
    const hashData = redirectUrl.toString();
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(hashData, 'utf-8')).digest('hex');

    // Gán chữ ký vào tham số
    redirectUrl.append('vnp_SecureHash', signed);

    // Tạo URL thanh toán
    const paymentUrl = `${vnpUrl}?${redirectUrl.toString()}`;
    return paymentUrl;
  } catch (error) {
    throw new Error('Error creating payment URL: ' + error.message);
  }
};

function getRandomNumber(length) {
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getIpAddress(req) {
  if (!req) return '127.0.0.1'; // Trả về localhost nếu không có req

  let ipAddr = req.headers['x-forwarded-for'] || 
               req.headers['x-real-ip'] || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress || 
               req.connection.socket?.remoteAddress;

  if (ipAddr?.includes(',')) {
    ipAddr = ipAddr.split(',')[0].trim();
  }

  if (ipAddr?.includes('::ffff:')) {
    ipAddr = ipAddr.split('::ffff:')[1];
  }

  return ipAddr || '127.0.0.1'; // Fallback nếu không xác định được
}