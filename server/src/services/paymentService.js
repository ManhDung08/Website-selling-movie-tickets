const Payment = require('../models/Payment'); 
const crypto = require('crypto');
const moment = require('moment');
const config = require('config');
const querystring = require('qs');

const configs = {
  vnp_TmnCode: 'TXOOZNX4', // Mã website của bạn tại VNPay
  vnp_HashSecret: 'HUQHTRVXVRGJJWHMBFCAUBAXOSAJBIND', // Chuỗi bí mật để tạo mã hash
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', // Đường dẫn thanh toán của VNPay
  vnp_ReturnUrl: 'http://localhost:3000/order' // URL trả về sau khi thanh toán
};

exports.createPayment = (req) => {
  var ipAddr = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress;


  var tmnCode = configs.vnp_TmnCode;
  var secretKey = configs.vnp_HashSecret;
  var vnpUrl = configs.vnp_Url;
  var returnUrl = configs.vnp_ReturnUrl;


  var createDate = moment().format('YYYYMMDDHHmmss');
  var orderId = moment().format('HHmmss');
  var amount = req.body.total;
console.log('amount', amount)
  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType
  var locale = req.body.language;
  if(locale === undefined || locale === ''){
    locale = 'vn';
  }
  var currCode = 'VND';
  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = orderInfo;
  vnp_Params['vnp_OrderType'] = orderType;
  vnp_Params['vnp_Amount'] = amount *100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  vnp_Params = sortObject(vnp_Params);
  var querystring = require('qs');
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");     
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return vnpUrl
}
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]);
  }
  return sorted;
}