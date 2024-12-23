const AuthService = require('../services/AuthService');
const createError = require('http-errors');

exports.register = async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.',
      data: {
        userId: user._id,
        email: user.email
      }
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await AuthService.verifyEmail(req.params.token);
    
    res.status(200).json({
      status: 'success',
      message: 'Xác thực email thành công. Bạn có thể đăng nhập ngay bây giờ.',
      data: {
        userId: user._id,
        email: user.email
      }
    });
  } catch (err) {
    next(createError(400, err.message));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await AuthService.login(username, password);
    
    res.status(200).json({
      status: 'success',
      message: 'Đăng nhập thành công',
      data: result
    });
  } catch (err) {
    next(createError(401, err.message));
  }
};