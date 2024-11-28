// Xử lý các lỗi không lường trước được
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Ghi log lỗi
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};
