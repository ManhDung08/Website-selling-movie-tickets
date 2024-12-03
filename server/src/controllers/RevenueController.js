const RevenueService = require('../services/RevenueService');

// Tạo một bản ghi doanh thu mới (thường dùng cho báo cáo định kỳ)
exports.createRevenueRecord = async (req, res) => {
  try {
    const record = await RevenueService.createRevenueRecord();
    res.status(201).json({
      message: 'Revenue record created successfully',
      data: record
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating revenue record',
      error: error.message
    });
  }
};

// Lấy các bản ghi doanh thu với phân trang
exports.getRevenueRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filter } = req.query;
    const result = await RevenueService.getRevenueRecords(filter, page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving revenue records',
      error: error.message
    });
  }
};

// Lấy tổng hợp doanh thu trong một khoảng thời gian cụ thể
exports.getRevenueSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: 'Start date and end date are required'
      });
    }

    const summary = await RevenueService.getRevenueSummary(startDate, endDate);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      message: 'Error generating revenue summary',
      error: error.message
    });
  }
};

// Lấy danh sách các rạp hoặc phim có doanh thu tốt nhất
exports.getTopPerformers = async (req, res) => {
  try {
    const { type = 'theater', limit = 5 } = req.query;
    
    if (!['theater', 'movie'].includes(type)) {
      return res.status(400).json({
        message: 'Invalid performer type. Use "theater" or "movie"'
      });
    }

    const topPerformers = await RevenueService.getTopPerformers(type, Number(limit));
    res.status(200).json(topPerformers);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving top performers',
      error: error.message
    });
  }
};
