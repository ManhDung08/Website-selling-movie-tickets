const jwt = require('jsonwebtoken');

// Hàm xác thực JWT chung
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token.');
    }
};

// Middleware xác thực token (Dành cho cả user và admin)
exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = verifyToken(token);
        req.user = decoded;  // Lưu thông tin người dùng trong request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }
};

// Middleware xác thực admin
exports.adminMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = verifyToken(token);
        req.user = decoded;  // Lưu thông tin người dùng trong request

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }
};
