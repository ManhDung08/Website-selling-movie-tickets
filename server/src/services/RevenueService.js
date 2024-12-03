const Revenue = require('../models/Revenue');
const Ticket = require('../models/Ticket');

exports.createRevenueRecord = async () => {
  try {
    // Tổng hợp doanh thu theo từng rạp
    const revenueByTheater = await Ticket.aggregate([
      {
        $lookup: {
          from: 'showtimes',
          localField: 'showtimeId',
          foreignField: '_id',
          as: 'showtime'
        }
      },
      { $unwind: '$showtime' },
      {
        $lookup: {
          from: 'theaters',
          localField: 'showtime.theaterId',
          foreignField: '_id',
          as: 'theater'
        }
      },
      { $unwind: '$theater' },
      {
        $group: {
          _id: '$theater._id',
          theaterName: { $first: '$theater.name' },
          revenue: { $sum: '$totalAmount' },
          ticketsSold: { $sum: { $size: '$seats' } }
        }
      }
    ]);

    // Tổng hợp doanh thu theo từng phim
    const revenueByMovie = await Ticket.aggregate([
      {
        $lookup: {
          from: 'showtimes',
          localField: 'showtimeId',
          foreignField: '_id',
          as: 'showtime'
        }
      },
      { $unwind: '$showtime' },
      {
        $lookup: {
          from: 'movies',
          localField: 'showtime.movieId',
          foreignField: '_id',
          as: 'movie'
        }
      },
      { $unwind: '$movie' },
      {
        $group: {
          _id: '$movie._id',
          movieTitle: { $first: '$movie.title' },
          revenue: { $sum: '$totalAmount' },
          ticketsSold: { $sum: { $size: '$seats' } }
        }
      }
    ]);

    // Tính tổng doanh thu và số vé đã bán
    const totalRevenue = revenueByTheater.reduce((sum, theater) => sum + theater.revenue, 0);
    const totalTicketsSold = revenueByTheater.reduce((sum, theater) => sum + theater.ticketsSold, 0);

    // Tạo bản ghi doanh thu và lưu vào cơ sở dữ liệu
    const revenueRecord = new Revenue({
      totalRevenue,
      totalTicketsSold,
      revenueByTheater: revenueByTheater.map(theater => ({
        theaterId: theater._id,
        theaterName: theater.theaterName,
        revenue: theater.revenue,
        ticketsSold: theater.ticketsSold
      })),
      revenueByMovie: revenueByMovie.map(movie => ({
        movieId: movie._id,
        movieTitle: movie.movieTitle,
        revenue: movie.revenue,
        ticketsSold: movie.ticketsSold
      }))
    });

    return await revenueRecord.save();
  } catch (error) {
    throw new Error(`Failed to create revenue record: ${error.message}`);
  }
};

exports.getRevenueRecords = async (filter = {}, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const records = await Revenue.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Revenue.countDocuments(filter);

    return {
      records,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total
    };
  } catch (error) {
    throw new Error(`Failed to retrieve revenue records: ${error.message}`);
  }
};

exports.getRevenueSummary = async (startDate, endDate) => {
  try {
    const summary = await Revenue.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalRevenue' },
          totalTicketsSold: { $sum: '$totalTicketsSold' },
          averageDailyRevenue: { $avg: '$totalRevenue' }
        }
      }
    ]);

    return summary[0] || {
      totalRevenue: 0,
      totalTicketsSold: 0,
      averageDailyRevenue: 0
    };
  } catch (error) {
    throw new Error(`Failed to generate revenue summary: ${error.message}`);
  }
};

exports.getTopPerformers = async (type = 'theater', limit = 5) => {
  try {
    const fieldName = type === 'theater' ? 'revenueByTheater' : 'revenueByMovie';

    const topPerformers = await Revenue.aggregate([
      { $unwind: `$${fieldName}` },
      {
        $group: {
          _id: `$${fieldName}.${type}Id`,
          name: { $first: `$${fieldName}.${type}Name` },
          totalRevenue: { $sum: `$${fieldName}.revenue` },
          totalTicketsSold: { $sum: `$${fieldName}.ticketsSold` }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: limit }
    ]);

    return topPerformers;
  } catch (error) {
    throw new Error(`Failed to retrieve top performers: ${error.message}`);
  }
};
