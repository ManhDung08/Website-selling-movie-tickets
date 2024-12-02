const Theater = require('../models/Theater');
const Room = require('../models/Room');
const Showtime = require('../models/Showtime');
const mongoose = require('mongoose');


// Tạo rạp mới
exports.createTheater = async (theaterData) => {
    const theater = new Theater(theaterData);
    await theater.save();
    return theater;
};

// Lấy rạp theo ID
exports.getTheaterById = async (theaterId) => {
    return Theater.findById(theaterId);
};

// Lấy danh sách rạp với phân trang
exports.getAllTheaters = async (page = 1, limit = 10) => {
    const theaters = await Theater.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalTheaters = await Theater.countDocuments();

    return {
        theaters,
        total: totalTheaters,
        page,
        pages: Math.ceil(totalTheaters / limit),
    };
};

// Cập nhật thông tin rạp
exports.updateTheater = async (theaterId, updateData) => {
    // Loại bỏ thuộc tính totalRooms khỏi updateData
    if ('totalRooms' in updateData) {
        delete updateData.totalRooms;
    }
    return Theater.findByIdAndUpdate(theaterId, updateData, { new: true });
};

// Xóa rạp và các phòng chiếu, suất chiếu liên quan
exports.deleteTheater = async (theaterId) => {
    // Bắt đầu một session để thực hiện transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Tìm tất cả các phòng của rạp
        const rooms = await Room.find({ theaterId }).session(session);
        
        // Lấy danh sách ID của các phòng
        const roomIds = rooms.map(room => room._id);

        // Xóa tất cả suất chiếu liên quan đến các phòng của rạp
        await Showtime.deleteMany({ 
            $or: [
                { theaterId: theaterId },
                { roomId: { $in: roomIds } }
            ]
        }).session(session);

        // Xóa tất cả các phòng của rạp
        await Room.deleteMany({ theaterId }).session(session);

        // Xóa rạp
        const deletedTheater = await Theater.findByIdAndDelete(theaterId).session(session);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        return deletedTheater;
    } catch (error) {
        // Rollback transaction nếu có lỗi
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// Tìm kiếm rạp
exports.searchTheaters = async (keyword, page = 1, limit = 10) => {
    const theaters = await Theater.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { city: { $regex: keyword, $options: 'i' } },
            { address: { $regex: keyword, $options: 'i' } }
        ]
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

    const totalTheaters = await Theater.countDocuments({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { city: { $regex: keyword, $options: 'i' } },
            { address: { $regex: keyword, $options: 'i' } }
        ]
    });

    return {
        theaters,
        total: totalTheaters,
        page,
        pages: Math.ceil(totalTheaters / limit),
    };
};

// Lọc rạp theo thành phố
exports.getTheatersByCity = async (city, page = 1, limit = 10) => {
    const theaters = await Theater.find({ city })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalTheaters = await Theater.countDocuments({ city });

    return {
        theaters,
        total: totalTheaters,
        page,
        pages: Math.ceil(totalTheaters / limit),
    };
};

// Lấy rạp theo số lượng phòng
exports.getTheatersByRoomCount = async (minRooms, maxRooms, page = 1, limit = 10) => {
    const theaters = await Theater.find({ 
        totalRooms: { 
            $gte: minRooms, 
            $lte: maxRooms 
        } 
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ totalRooms: -1 });

    const totalTheaters = await Theater.countDocuments({ 
        totalRooms: { 
            $gte: minRooms, 
            $lte: maxRooms 
        } 
    });

    return {
        theaters,
        total: totalTheaters,
        page,
        pages: Math.ceil(totalTheaters / limit),
    };
};