const movieService = require('../services/movieService');
const createError = require('http-errors');

// Tạo phim mới
exports.createMovie = async (req, res, next) => {
    try {
        const movie = await movieService.createMovie(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Movie created successfully',
            data: movie,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy phim theo ID
exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        if (!movie) {
            return next(createError(404, 'Movie not found'));
        }
        res.status(200).json({
            status: 'success',
            data: movie,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy danh sách phim
exports.getAllMovies = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status, keyword, genre } = req.query;
        let result;

        if (status) {
            result = await movieService.getMoviesByStatus(status, Number(page), Number(limit));
        } else if (keyword) {
            result = await movieService.searchMovies(keyword, Number(page), Number(limit));
        } else if (genre) {
            result = await movieService.getMoviesByGenre(genre, Number(page), Number(limit));
        } else {
            result = await movieService.getAllMovies(Number(page), Number(limit));
        }

        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Lấy thông tin phim kèm suất chiếu
exports.getMovieWithShowtimes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await movieService.getMovieWithShowtimes(id);
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Cập nhật thông tin phim
exports.updateMovie = async (req, res, next) => {
    try {
        const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
        if (!updatedMovie) {
            return next(createError(404, 'Movie not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Movie updated successfully',
            data: updatedMovie,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Cập nhật trạng thái phim sang 'now-showing'
exports.updateMovieToNowShowing = async (req, res, next) => {
    try {
        const result = await movieService.updateMovieToNowShowing();
        res.status(200).json({
            status: 'success',
            message: 'Movies updated to now-showing successfully',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Cập nhật trạng thái phim sang 'ended'
exports.updateMoviesToEnded = async (req, res, next) => {
    try {
        const result = await movieService.updateMoviesToEnded();
        res.status(200).json({
            status: 'success',
            message: 'Movies updated to ended successfully',
            data: result,
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};

// Xóa phim
exports.deleteMovie = async (req, res, next) => {
    try {
        const deletedMovie = await movieService.deleteMovie(req.params.id);
        if (!deletedMovie) {
            return next(createError(404, 'Movie not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Movie and related showtimes deleted successfully',
            data: deletedMovie
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};