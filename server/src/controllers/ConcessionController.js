const concessionService = require('../services/ConcessionService');
const createError = require('http-errors');

// Tạo concession mới
exports.createConcession = async (req, res, next) => {
    try {
        const concession = await concessionService.createConcession(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Concession created successfully',
            data: concession
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Lấy concession theo ID
exports.getConcessionById = async (req, res, next) => {
    try {
        const concession = await concessionService.getConcessionById(req.params.id);
        if (!concession) {
            return next(createError(404, 'Concession not found'));
        }
        res.status(200).json({
            status: 'success',
            data: concession
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Lấy danh sách concession
exports.getAllConcessions = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, category, status, theaterId, size } = req.query;
        const filters = { category, status, theaterId, size };
        
        const result = await concessionService.getAllConcessions(
            Number(page),
            Number(limit),
            filters
        );
        
        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Cập nhật concession
exports.updateConcession = async (req, res, next) => {
    try {
        const concession = await concessionService.updateConcession(
            req.params.id,
            req.body
        );
        if (!concession) {
            return next(createError(404, 'Concession not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Concession updated successfully',
            data: concession
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

// Xóa concession
exports.deleteConcession = async (req, res, next) => {
    try {
        const concession = await concessionService.deleteConcession(req.params.id);
        if (!concession) {
            return next(createError(404, 'Concession not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Concession deleted successfully'
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};