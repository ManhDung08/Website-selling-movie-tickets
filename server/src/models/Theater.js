//Lưu trữ thông tin rạp

const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  totalRooms: { type: Number, required: true },
  facilities: [String],
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Theater", theaterSchema);
