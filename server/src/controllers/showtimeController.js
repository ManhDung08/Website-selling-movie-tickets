const showtimeService = require('../services/showtimeService');
const createError = require('http-errors');

// Tạo suất chiếu mới
exports.createShowtime = async (req, res, next) => {
    try {
        const showtime = await showtimeService.createShowtime(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Showtime created successfully',
            data: showtime,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy suất chiếu theo ID
exports.getShowtimeById = async (req, res, next) => {
    try {
        const showtime = await showtimeService.getShowtimeById(req.params.id);
        if (!showtime) {
            return next(createError(404, 'Showtime not found'));
        }
        res.status(200).json({
            status: 'success',
            data: showtime,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy danh sách suất chiếu
exports.getAllShowtimes = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            movieId,
            theaterId,
            roomId,
            startDate,
            endDate,
            upcoming
        } = req.query;

        let result;

        if (movieId) {
            // Lọc theo phim
            result = await showtimeService.getShowtimesByMovie(movieId, Number(page), Number(limit));
        } else if (theaterId) {
            // Lọc theo rạp
            result = await showtimeService.getShowtimesByTheater(theaterId, Number(page), Number(limit));
        } else if (roomId) {
            // Lọc theo phòng
            result = await showtimeService.getShowtimesByRoom(roomId, Number(page), Number(limit));
        } else if (startDate && endDate) {
            // Lọc theo khoảng thời gian
            result = await showtimeService.getShowtimesByDateRange(startDate, endDate, Number(page), Number(limit));
        } else if (upcoming === 'true') {
            // Lấy suất chiếu sắp tới
            result = await showtimeService.getUpcomingShowtimes(Number(page), Number(limit));
        } else {
            // Lấy tất cả suất chiếu
            result = await showtimeService.getAllShowtimes(Number(page), Number(limit));
        }

        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Cập nhật thông tin suất chiếu
exports.updateShowtime = async (req, res, next) => {
    try {
        const updatedShowtime = await showtimeService.updateShowtime(req.params.id, req.body);
        if (!updatedShowtime) {
            return next(createError(404, 'Showtime not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Showtime updated successfully',
            data: updatedShowtime,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Xóa suất chiếu
exports.deleteShowtime = async (req, res, next) => {
    try {
        const deletedShowtime = await showtimeService.deleteShowtime(req.params.id);
        if (!deletedShowtime) {
            return next(createError(404, 'Showtime not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Showtime deleted successfully',
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};