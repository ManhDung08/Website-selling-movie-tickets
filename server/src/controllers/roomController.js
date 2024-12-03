const roomService = require('../services/RoomService');
const createError = require('http-errors');

// Tạo phòng chiếu mới
exports.createRoom = async (req, res, next) => {
    try {
        const room = await roomService.createRoom(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Room created successfully',
            data: room,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy phòng chiếu theo ID
exports.getRoomById = async (req, res, next) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        if (!room) {
            return next(createError(404, 'Room not found'));
        }
        res.status(200).json({
            status: 'success',
            data: room,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy danh sách phòng chiếu
exports.getAllRooms = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            keyword,
            theaterId,
            type
        } = req.query;

        let result;

        if (theaterId) {
            // Nếu có theater ID, lọc theo rạp
            result = await roomService.getRoomsByTheater(theaterId, Number(page), Number(limit));
        } else if (type) {
            // Nếu có loại phòng, lọc theo loại
            result = await roomService.getRoomsByType(type, Number(page), Number(limit));
        } else if (keyword) {
            // Nếu có từ khóa, tìm kiếm phòng
            result = await roomService.searchRooms(keyword, Number(page), Number(limit));
        } else {
            // Nếu không có điều kiện, lấy tất cả phòng
            result = await roomService.getAllRooms(Number(page), Number(limit));
        }

        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Cập nhật thông tin phòng chiếu
exports.updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await roomService.updateRoom(req.params.id, req.body);
        if (!updatedRoom) {
            return next(createError(404, 'Room not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Room updated successfully',
            data: updatedRoom,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Xóa phòng chiếu
exports.deleteRoom = async (req, res, next) => {
    try {
        const deletedRoom = await roomService.deleteRoom(req.params.id);
        if (!deletedRoom) {
            return next(createError(404, 'Room not found'));
        }
        
        res.status(200).json({
            status: 'success',
            message: 'Room and related showtimes deleted successfully',
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};