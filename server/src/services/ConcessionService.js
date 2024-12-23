const Concession = require('../models/Concession');
const mongoose = require('mongoose');

// Tạo concession mới
exports.createConcession = async (concessionData) => {
    const concession = new Concession(concessionData);
    return await concession.save();
};

// Lấy concession theo ID
exports.getConcessionById = async (id) => {
    return await Concession.findById(id).populate('theaterId');
};

// Lấy danh sách concession với phân trang
exports.getAllConcessions = async (page = 1, limit = 10, filters = {}) => {
    const query = {};
    
    if (filters.category) query.category = filters.category;
    if (filters.status) query.status = filters.status;
    if (filters.theaterId) query.theaterId = filters.theaterId;
    if (filters.size) query.size = filters.size;

    const concessions = await Concession.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('theaterId');

    const total = await Concession.countDocuments(query);

    return {
        concessions,
        total,
        page,
        pages: Math.ceil(total / limit)
    };
};

// Cập nhật concession
exports.updateConcession = async (id, updateData) => {
    return await Concession.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    ).populate('theaterId');
};

// Xóa concession
exports.deleteConcession = async (id) => {
    return await Concession.findByIdAndDelete(id);
};

// Kiểm tra tồn kho của danh sách concession
exports.validateConcessionAvailability = async (items) => {
    const concessionIds = items.map(item => item.concessionId);
    const concessions = await Concession.find({
        _id: { $in: concessionIds }
    });

    const concessionMap = new Map(
        concessions.map(c => [c._id.toString(), c])
    );

    items.forEach(item => {
        const concession = concessionMap.get(item.concessionId.toString());
        if (!concession) {
            throw new Error(`Concession ${item.concessionId} không tồn tại`);
        }
        if (concession.status !== 'available') {
            throw new Error(`${concession.name} hiện không có sẵn`);
        }
    });

    return true;
};