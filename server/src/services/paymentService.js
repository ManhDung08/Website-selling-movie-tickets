const Payment = require('../models/paymentModel'); // Model payment
const crypto = require('crypto');
const moment = require('moment');
const config = require('config');
const querystring = require('qs');

// Logic xử lý thanh toán VNPay
exports.createPayment = async (ticketId, userId, amount, paymentMethod, bankCode) => {
  try {
    const date = new Date();
    const orderId = moment(date).format('DDHHmmss');
    const transactionCode = crypto.randomBytes(16).toString('hex'); // Tạo mã giao dịch ngẫu nhiên
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
exports.createPaymentUrl = async (payment, bankCode) => {
  try {
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    const tmnCode = config.get('vnp_TmnCode');
    const secretKey = config.get('vnp_HashSecret');
    const vnpUrl = config.get('vnp_Url');
    const returnUrl = config.get('vnp_ReturnUrl');

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: payment.transactionCode,
      vnp_OrderInfo: `Thanh toan cho ma GD:${payment.transactionCode}`,
      vnp_Amount: payment.amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_CreateDate: createDate
    };

    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;

    const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;
    return paymentUrl;
  } catch (error) {
    throw new Error('Error creating payment URL: ' + error.message);
  }
};

// Hàm sắp xếp đối tượng theo key
const sortObject = (obj) => {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
};
