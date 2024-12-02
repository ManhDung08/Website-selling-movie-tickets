const Room = require('../models/Room');
const Theater = require('../models/Theater');
const Showtime = require('../models/Showtime');
const mongoose = require('mongoose');

// Hàm trợ helper để cập nhật tổng số phòng của rạp
const updateTheaterTotalRooms = async (theaterId) => {
    const roomCount = await Room.countDocuments({ theaterId });
    await Theater.findByIdAndUpdate(theaterId, { totalRooms: roomCount });
};

// Tạo phòng chiếu mới
exports.createRoom = async (roomData) => {
    const room = new Room(roomData);
    await room.save();
    
    // Cập nhật tổng số phòng của rạp sau khi tạo phòng
    await updateTheaterTotalRooms(roomData.theaterId);
    return room;
};

// Lấy phòng chiếu theo ID
exports.getRoomById = async (roomId) => {
    return Room.findById(roomId).populate('theaterId');
};

// Lấy danh sách phòng chiếu với phân trang
exports.getAllRooms = async (page = 1, limit = 10) => {
    const rooms = await Room.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('theaterId');

    const totalRooms = await Room.countDocuments();

    return {
        rooms,
        total: totalRooms,
        page,
        pages: Math.ceil(totalRooms / limit),
    };
};

// Cập nhật thông tin phòng chiếu
exports.updateRoom = async (roomId, updateData) => {
    return Room.findByIdAndUpdate(roomId, updateData, { new: true }).populate('theaterId');
};

// Xóa phòng chiếu
exports.deleteRoom = async (roomId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const room = await Room.findById(roomId);
        if (!room) return null;

        const theaterId = room.theaterId;

        // Xóa tất cả các suất chiếu liên quan đến phòng này
        await Showtime.deleteMany({ roomId: roomId }).session(session);

        // Xóa phòng chiếu
        const deletedRoom = await Room.findByIdAndDelete(roomId).session(session);

        // Cập nhật tổng số phòng của rạp
        await updateTheaterTotalRooms(theaterId);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        return deletedRoom;
    } catch (error) {
        // Nếu có lỗi, rollback transaction
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Tìm kiếm phòng chiếu
exports.searchRooms = async (keyword, page = 1, limit = 10) => {
    const rooms = await Room.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { type: { $regex: keyword, $options: 'i' } }
        ]
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate('theaterId');

    const totalRooms = await Room.countDocuments({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { type: { $regex: keyword, $options: 'i' } }
        ]
    });

    return {
        rooms,
        total: totalRooms,
        page,
        pages: Math.ceil(totalRooms / limit),
    };
};

// Lọc phòng chiếu theo rạp
exports.getRoomsByTheater = async (theaterId, page = 1, limit = 10) => {
    const rooms = await Room.find({ theaterId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('theaterId');

    const totalRooms = await Room.countDocuments({ theaterId });

    return {
        rooms,
        total: totalRooms,
        page,
        pages: Math.ceil(totalRooms / limit),
    };
};

// Lọc phòng chiếu theo loại
exports.getRoomsByType = async (type, page = 1, limit = 10) => {
    const rooms = await Room.find({ type })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('theaterId');

    const totalRooms = await Room.countDocuments({ type });

    return {
        rooms,
        total: totalRooms,
        page,
        pages: Math.ceil(totalRooms / limit),
    };
};