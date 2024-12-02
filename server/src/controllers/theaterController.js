const theaterService = require('../services/theaterService');
const createError = require('http-errors');

// Tạo rạp mới
exports.createTheater = async (req, res, next) => {
    try {
        const theater = await theaterService.createTheater(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Theater created successfully',
            data: theater,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy rạp theo ID
exports.getTheaterById = async (req, res, next) => {
    try {
        const theater = await theaterService.getTheaterById(req.params.id);
        if (!theater) {
            return next(createError(404, 'Theater not found'));
        }
        res.status(200).json({
            status: 'success',
            data: theater,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy danh sách rạp
exports.getAllTheaters = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            keyword, 
            city, 
            minRooms, 
            maxRooms 
        } = req.query;
        let result;

        if (city) {
            // Nếu có thành phố, lọc theo thành phố
            result = await theaterService.getTheatersByCity(city, Number(page), Number(limit));
        } else if (minRooms && maxRooms) {
            // Nếu có khoảng số phòng, lọc theo số phòng
            result = await theaterService.getTheatersByRoomCount(
                Number(minRooms), 
                Number(maxRooms), 
                Number(page), 
                Number(limit)
            );
        } else if (keyword) {
            // Nếu có từ khóa, tìm kiếm rạp
            result = await theaterService.searchTheaters(keyword, Number(page), Number(limit));
        } else {
            // Nếu không có điều kiện, lấy tất cả rạp
            result = await theaterService.getAllTheaters(Number(page), Number(limit));
        }

        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Cập nhật thông tin rạp
exports.updateTheater = async (req, res, next) => {
    try {
        const updatedTheater = await theaterService.updateTheater(req.params.id, req.body);
        if (!updatedTheater) {
            return next(createError(404, 'Theater not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Theater updated successfully',
            data: updatedTheater,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Xóa rạp
exports.deleteTheater = async (req, res, next) => {
    try {
        const deletedTheater = await theaterService.deleteTheater(req.params.id);
        
        if (!deletedTheater) {
            return next(createError(404, 'Theater not found'));
        }

        res.status(200).json({
            status: 'success',
            message: 'Theater, related rooms, and showtimes deleted successfully',
            data: deletedTheater
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};