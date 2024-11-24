const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now, // Thời gian thống kê
    },
    totalRevenue: {
        type: Number,
        required: true, // Tổng doanh thu
    },
    totalTicketsSold: {
        type: Number,
        required: true, // Tổng số vé đã bán
    },
    revenueByTheater: [
        {
            theaterId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Theater', // Liên kết đến Theater model
                required: true,
            },
            theaterName: {
                type: String,
                required: true,
            },
            revenue: {
                type: Number,
                required: true,
            },
            ticketsSold: {
                type: Number,
                required: true,
            },
        },
    ],
    revenueByMovie: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie', // Liên kết đến Movie model
                required: true,
            },
            movieTitle: {
                type: String,
                required: true,
            },
            revenue: {
                type: Number,
                required: true,
            },
            ticketsSold: {
                type: Number,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('Revenue', RevenueSchema);