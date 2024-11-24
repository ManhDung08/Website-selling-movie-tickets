//Lưu trữ thông tin suất chiếu

const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  standard: { type: Number, required: true },
  vip: { type: Number, required: true },
  couple: { type: Number, required: true },
});

const showtimeSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }, // reference to Movies
    theaterId: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true }, // reference to Theaters
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }, // reference to Rooms
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: priceSchema, required: true }, // Price object
    status: {
      type: String,
      enum: ["available", "almost-full", "full", "cancelled"],
      required: true,
      default: "available",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
module.exports = mongoose.model("Showtime", showtimeSchema);
