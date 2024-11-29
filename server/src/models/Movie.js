//Lưu trữ thông tin phim

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  genre: [String],
  releaseDate: { type: Date, required: true },
  language: String,
  director: String,
  cast: [String],
  poster: String,
  status: { type: String, enum: ['coming-soon', 'now-showing', 'ended'], default: 'coming-soon' },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);