const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('./EmailService');

// Tạo token JWT
exports.generateToken = (userId, role) => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Đăng ký tài khoản người dùng
exports.register = async (userData) => {
    // Tạo token xác thực email
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    // Tạo user mới với trạng thái chưa kích hoạt
    const user = new User({
        ...userData,
        emailVerificationToken,
        emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // Hết hạn sau 24h
        isEmailVerified: false,
        isActive: false
    });

    // Lưu user vào database
    await user.save();

    // Gửi email xác thực
    await sendVerificationEmail(user.email, emailVerificationToken);

    return user;
};

// Xác thực email
exports.verifyEmail = async (token) => {
    // Tìm user với token xác thực còn hạn
    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
    }

    // Cập nhật trạng thái user
    user.isEmailVerified = true;
    user.isActive = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return user;
};

// Đăng nhập
exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Tên đăng nhập không tồn tại');
    }

    if (!user.isEmailVerified || !user.isActive) {
        throw new Error('Tài khoản chưa được xác thực email. Vui lòng kiểm tra email của bạn');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Mật khẩu không chính xác');
    }

    const token = this.generateToken(user._id, user.role);

    return {
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            fullName: user.fullName
        },
        token
    };
};


exports.googleLogin = async (googleUser) => {
    // Logic xử lý đăng nhập bằng Google
    const token = this.generateToken(googleUser._id, googleUser.role);
  
    return {
      user: {
        _id: googleUser._id,
        username: googleUser.username,
        email: googleUser.email,
        role: googleUser.role
      },
      token
    };
};