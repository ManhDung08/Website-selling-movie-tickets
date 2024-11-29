
import querystring from "qs";
import crypto from "crypto";
import config from "config";

export const createPaymentUrl = async (req, res) => {
  try {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    const tmnCode = config.get('vnp_TmnCode');
    const secretKey = config.get('vnp_HashSecret');
    const vnpUrl = config.get('vnp_Url');
    const returnUrl = config.get('vnp_ReturnUrl');
    const orderId = moment(date).format('DDHHmmss');
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    let locale = req.body.language || 'vn';
    const currCode = 'VND';

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
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
    res.redirect(paymentUrl);

  } catch (error) {
    res.status(500).json({ message: 'Error creating payment URL', error: error.message });
  }
};

export const vnpayReturn = (req, res, next) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const tmnCode = config.get('vnp_TmnCode');
  const secretKey = config.get('vnp_HashSecret');

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac('sha512', secretKey);
  let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    // Kiểm tra dữ liệu trong cơ sở dữ liệu có hợp lệ hay không và trả về kết quả
    res.render('success', { code: vnp_Params['vnp_ResponseCode'] });
  } else {
    res.render('success', { code: '97' });
  }
};

export const vnpayIpn = (req, res, next) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params['vnp_SecureHash'];

  let orderId = vnp_Params['vnp_TxnRef'];
  let rspCode = vnp_Params['vnp_ResponseCode'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const secretKey = config.get('vnp_HashSecret');
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

  let paymentStatus = '0'; // Trạng thái ban đầu là '0' (Chưa có IPN)
  let checkOrderId = true;  // Kiểm tra mã đơn hàng có tồn tại trong DB
  let checkAmount = true;   // Kiểm tra số tiền có hợp lệ không
  
  if (secureHash === signed) { // Kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus === "0") { // Kiểm tra trạng thái giao dịch
          if (rspCode === "00") {
            // Cập nhật trạng thái thành công vào DB
            res.status(200).json({ RspCode: '00', Message: 'Success' });
          } else {
            // Cập nhật trạng thái thất bại vào DB
            res.status(200).json({ RspCode: '00', Message: 'Failure' });
          }
        } else {
          res.status(200).json({ RspCode: '02', Message: 'This order has been updated to the payment status' });
        }
      } else {
        res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
      }
    } else {
      res.status(200).json({ RspCode: '01', Message: 'Order not found' });
    }
  } else {
    res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
  }
};

export const queryDr = (req, res, next) => {
  process.env.TZ = 'Asia/Ho_Chi_Minh';
  let date = new Date();

  let vnp_TmnCode = config.get('vnp_TmnCode');
  let secretKey = config.get('vnp_HashSecret');
  let vnp_Api = config.get('vnp_Api');

  let vnp_TxnRef = req.body.orderId;
  let vnp_TransactionDate = req.body.transDate;

  let vnp_RequestId = moment(date).format('HHmmss');
  let vnp_Version = '2.1.0';
  let vnp_Command = 'querydr';
  let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

  let vnp_IpAddr = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let currCode = 'VND';
  let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

  let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

  let hmac = crypto.createHmac("sha512", secretKey);
  let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

  let dataObj = {
    'vnp_RequestId': vnp_RequestId,
    'vnp_Version': vnp_Version,
    'vnp_Command': vnp_Command,
    'vnp_TmnCode': vnp_TmnCode,
    'vnp_TxnRef': vnp_TxnRef,
    'vnp_OrderInfo': vnp_OrderInfo,
    'vnp_TransactionDate': vnp_TransactionDate,
    'vnp_CreateDate': vnp_CreateDate,
    'vnp_IpAddr': vnp_IpAddr,
    'vnp_SecureHash': vnp_SecureHash
  };

  // Gửi yêu cầu đến API VNPAY
  request({
    url: vnp_Api,
    method: "POST",
    json: true,
    body: dataObj
  }, function (error, response, body) {
    if (error) {
      return res.status(500).json({ message: 'Error in transaction request', error });
    }

    // Xử lý kết quả từ API trả về (nếu cần)
    console.log(response);
    res.status(200).json({ message: 'Request sent to VNPAY', data: body });
  });
};

export const refundPayment = (req, res, next) => {
  process.env.TZ = 'Asia/Ho_Chi_Minh';
  let date = new Date();

  let vnp_TmnCode = config.get('vnp_TmnCode');
  let secretKey = config.get('vnp_HashSecret');
  let vnp_Api = config.get('vnp_Api');

  let vnp_TxnRef = req.body.orderId;
  let vnp_TransactionDate = req.body.transDate;
  let vnp_Amount = req.body.amount * 100; // Amount in the smallest unit (cents)
  let vnp_TransactionType = req.body.transType;
  let vnp_CreateBy = req.body.user;

  let currCode = 'VND';

  let vnp_RequestId = moment(date).format('HHmmss');
  let vnp_Version = '2.1.0';
  let vnp_Command = 'refund';
  let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

  let vnp_IpAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

  let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
  let vnp_TransactionNo = '0';

  // Prepare the data for generating HMAC
  let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TransactionType + "|" + vnp_TxnRef + "|" + vnp_Amount + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate + "|" + vnp_CreateBy + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

  // Create the secure hash for the request
  let hmac = crypto.createHmac("sha512", secretKey);
  let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

  // Create the data object to send to VNPAY
  let dataObj = {
      'vnp_RequestId': vnp_RequestId,
      'vnp_Version': vnp_Version,
      'vnp_Command': vnp_Command,
      'vnp_TmnCode': vnp_TmnCode,
      'vnp_TransactionType': vnp_TransactionType,
      'vnp_TxnRef': vnp_TxnRef,
      'vnp_Amount': vnp_Amount,
      'vnp_TransactionNo': vnp_TransactionNo,
      'vnp_CreateBy': vnp_CreateBy,
      'vnp_OrderInfo': vnp_OrderInfo,
      'vnp_TransactionDate': vnp_TransactionDate,
      'vnp_CreateDate': vnp_CreateDate,
      'vnp_IpAddr': vnp_IpAddr,
      'vnp_SecureHash': vnp_SecureHash
  };

  // Send the refund request to VNPAY
  request({
      url: vnp_Api,
      method: "POST",
      json: true,
      body: dataObj
  }, function (error, response, body) {
      if (error) {
          return res.status(500).json({ message: 'Error in transaction request', error });
      }

      // Log the response or handle any business logic
      console.log(response);
      res.status(200).json({ message: 'Refund request sent to VNPAY', data: body });
  });
};

// sắp xếp theo key
const sortObject = (obj) => {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
};


