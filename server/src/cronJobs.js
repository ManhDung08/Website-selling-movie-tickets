const cron = require('node-cron');
const movieService = require('./services/MovieService');

/**
 * Hàm chạy cron job cập nhật trạng thái phim sang 'now-showing'.
 */
const updateMoviesToNowShowing = async () => {
    console.log('Running updateMoviesToNowShowing job...');
    try {
        const result = await movieService.updateMovieToNowShowing();
        console.log(`Movies updated to now-showing: ${result.modifiedCount || 0}`);
    } catch (error) {
        console.error('Error in updateMoviesToNowShowing:', error.message);
    }
};

/**
 * Hàm chạy cron job cập nhật trạng thái phim sang 'ended'.
 */
const updateMoviesToEnded = async () => {
    console.log('Running updateMoviesToEnded job...');
    try {
        const result = await movieService.updateMoviesToEnded();
        console.log(`Movies updated to ended: ${result.modifiedCount || 0}`);
    } catch (error) {
        console.error('Error in updateMoviesToEnded:', error.message);
    }
};

// Lên lịch chạy cron job
const scheduleJobs = () => {
    // Cập nhật 'now-showing' mỗi giờ (phút 0)
    cron.schedule('0 * * * *', updateMoviesToNowShowing);

    // Cập nhật 'ended' hàng ngày lúc 12 giờ đêm
    cron.schedule('0 0 * * *', updateMoviesToEnded);

    console.log('Cron jobs have been scheduled successfully.');
};

module.exports = { scheduleJobs };
