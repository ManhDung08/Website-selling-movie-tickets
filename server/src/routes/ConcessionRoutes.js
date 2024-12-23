const express = require('express');
const router = express.Router();
const concessionController = require('../controllers/ConcessionController');
const concessionValidation = require('../middleware/validation/ConcessionValidation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Lấy danh sách concession (public)
router.get('/', concessionController.getAllConcessions);

// Lấy thông tin concession theo ID (public)
router.get('/:id', concessionController.getConcessionById);

// Tạo concession mới (chỉ admin)
router.post('/',
    adminMiddleware,
    concessionValidation.createConcessionValidation,
    concessionController.createConcession
);

// Cập nhật concession (chỉ admin)
router.put('/:id',
    adminMiddleware,
    concessionValidation.updateConcessionValidation,
    concessionController.updateConcession
);

// Xóa concession (chỉ admin)
router.delete('/:id',
    adminMiddleware,
    concessionValidation.deleteConcessionValidation,
    concessionController.deleteConcession
);

module.exports = router;