const Showtime = require('../models/Showtime');
const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');

// Tạo suất chiếu mới
exports.createShowtime = async (showtimeData) => {
    const showtime = new Showtime(showtimeData);
    await showtime.save();
    return showtime.populate(['movieId', 'theaterId', 'roomId']);
};

// Lấy suất chiếu theo ID
exports.getShowtimeById = async (showtimeId) => {
    return Showtime.findById(showtimeId).populate(['movieId', 'theaterId', 'roomId']);
};

// Lấy danh sách suất chiếu với phân trang
exports.getAllShowtimes = async (page = 1, limit = 10) => {
    const showtimes = await Showtime.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ startTime: -1 })
        .populate(['movieId', 'theaterId', 'roomId']);

    const totalShowtimes = await Showtime.countDocuments();

    return {
        showtimes,
        total: totalShowtimes,
        page,
        pages: Math.ceil(totalShowtimes / limit),
    };
};

// Cập nhật thông tin suất chiếu
exports.updateShowtime = async (showtimeId, updateData) => {
    return Showtime.findByIdAndUpdate(showtimeId, updateData, { new: true })
        .populate(['movieId', 'theaterId', 'roomId']);
};

// Xóa suất chiếu
exports.deleteShowtime = async (showtimeId) => {
    return Showtime.findByIdAndDelete(showtimeId);
};

// Tìm kiếm suất chiếu theo phim
exports.getShowtimesByMovie = async (movieId, page = 1, limit = 10) => {
    const showtimes = await Showtime.find({ movieId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ startTime: 1 })
        .populate(['movieId', 'theaterId', 'roomId']);

    const totalShowtimes = await Showtime.countDocuments({ movieId });

    return {
        showtimes,
        total: totalShowtimes,
        page,
        pages: Math.ceil(totalShowtimes / limit),
    };
};

// Tìm kiếm suất chiếu theo rạp
exports.getShowtimesByTheater = async (theaterId, page = 1, limit = 10) => {
    const showtimes = await Showtime.find({ theaterId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ startTime: 1 })
        .populate(['movieId', 'theaterId', 'roomId']);

    const totalShowtimes = await Showtime.countDocuments({ theaterId });

    return {
        showtimes,
        total: totalShowtimes,
        page,
        pages: Math.ceil(totalShowtimes / limit),
    };
};

// Tìm kiếm suất chiếu theo phòng
exports.getShowtimesByRoom = async (roomId, page = 1, limit = 10) => {
    const showtimes = await Showtime.find({ roomId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ startTime: 1 })
        .populate(['movieId', 'theaterId', 'roomId']);

    const totalShowtimes = await Showtime.countDocuments({ roomId });

    return {
        showtimes,
        total: totalShowtimes,
        page,
        pages: Math.ceil(totalShowtimes / limit),
    };
};

// Tìm kiếm suất chiếu theo khoảng thời gian
exports.getShowtimesByDateRange = async (startDate, endDate, page = 1, limit = 10) => {
    const showtimes = await Showtime.find({
        startTime: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ startTime: 1 })
    .populate(['movieId', 'theaterId', 'roomId']);

    const totalShowtimes = await Showtime.countDocuments({
        startTime: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    });

    return {
        showtimes,
        total: totalShowtimes,
        page,
        pages: Math.ceil(totalShowtimes / limit),
    };
};

// Lấy suất chiếu sắp tới
exports.getUpcomingShowtimes = async (page = 1, limit = 10) => {
    const now = new Date();
    const showtimes = await Showtime.find({ startTime: { $gt: now } })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ startTime: 1 })
        .populate(['movieId', 'theaterId', 'roomId']);

    const totalShowtimes = await Showtime.countDocuments({ startTime: { $gt: now } });

    return {
        showtimes,
        total: totalShowtimes,
        page,
        pages: Math.ceil(totalShowtimes / limit),
    };
};