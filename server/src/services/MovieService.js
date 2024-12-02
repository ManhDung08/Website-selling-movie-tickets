const Movie = require('../models/Movie');
const Showtime = require('../models/Showtime');
const mongoose = require('mongoose');

// Tạo phim mới
exports.createMovie = async (movieData) => {
    const movie = new Movie(movieData);
    await movie.save();
    return movie;
};

// Lấy phim theo ID
exports.getMovieById = async (movieId) => {
    return Movie.findById(movieId);
};

// Lấy danh sách phim với phân trang
exports.getAllMovies = async (page = 1, limit = 10) => {
    const movies = await Movie.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ releaseDate: -1 });

    const totalMovies = await Movie.countDocuments();

    return {
        movies,
        total: totalMovies,
        page,
        pages: Math.ceil(totalMovies / limit),
    };
};

//Lấy thông tin phim kèm suất chiếu
exports.getMovieWithShowtimes = async (movieId) => {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error('Movie not found.');

    const showtimes = await Showtime.find({ movieId: movieId }).populate('theaterId roomId');
    
    return { movie, showtimes };
};

// Cập nhật thông tin phim
exports.updateMovie = async (movieId, updateData) => {
    return Movie.findByIdAndUpdate(movieId, updateData, { new: true });
};

//Cập nhật status sang now-showing khi đến releaseDate
exports.updateMovieToNowShowing = async () => {
    const now = new Date();
    const updatedMovies = await Movie.updateMany(
        { status: 'coming-soon', releaseDate: { $lte: now } },
        { $set: { status: 'now-showing' } }
    );  

    return updatedMovies;
};

//Sau 1 tháng công chiếu thì chuyển status sang ended
exports.updateMoviesToEnded = async () => {
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const updatedMovies = await Movie.updateMany(
        { 
            releaseDate: { $lte: oneMonthAgo }, 
            status: { $ne: 'ended' } 
        },
        { status: 'ended' }
    );

    return updatedMovies
};

//Xóa phim thì xóa cả suất chiếu liên quan (trừ các phim đang chiếu)
exports.deleteMovie = async (movieId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Kiểm tra trạng thái phim
        const movie = await Movie.findById(movieId);
        if (!movie) throw new Error('Movie not found.');
        if (movie.status === 'now-showing') {
            throw new Error('Cannot delete a movie that is currently showing.');
        }

        // Xóa tất cả suất chiếu liên quan đến phim
        await Showtime.deleteMany({ movieId: movieId }).session(session);

        // Xóa phim
        const deletedMovie = await Movie.findByIdAndDelete(movieId).session(session);

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        return deletedMovie;
    } catch (error) {
        // Rollback transaction nếu có lỗi
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


// Tìm kiếm phim
exports.searchMovies = async (keyword, page = 1, limit = 10) => {
    const movies = await Movie.find({
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { director: { $regex: keyword, $options: 'i' } }
        ]
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ releaseDate: -1 });

    const totalMovies = await Movie.countDocuments({
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { director: { $regex: keyword, $options: 'i' } }
        ]
    });

    return {
        movies,
        total: totalMovies,
        page,
        pages: Math.ceil(totalMovies / limit),
    };
};

// Lọc phim theo trạng thái
exports.getMoviesByStatus = async (status, page = 1, limit = 10) => {
    const movies = await Movie.find({ status })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ releaseDate: -1 });

    const totalMovies = await Movie.countDocuments({ status });

    return {
        movies,
        total: totalMovies,
        page,
        pages: Math.ceil(totalMovies / limit),
    };
};

// Lọc phim theo thể loại
exports.getMoviesByGenre = async (genre, page = 1, limit = 10) => {
    const movies = await Movie.find({ genre: genre })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ releaseDate: -1 });

    const totalMovies = await Movie.countDocuments({ genre: genre });

    return {
        movies,
        total: totalMovies,
        page,
        pages: Math.ceil(totalMovies / limit),
    };
};
