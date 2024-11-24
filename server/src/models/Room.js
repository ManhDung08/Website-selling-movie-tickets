//Lưu trữ thông tin phòng chiếu

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  theaterId: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true }, // reference to Theaters
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  type: { type: String, enum: ["2D", "3D", "4DX", "IMAX"], required: true },
  seatMap: [
    {
      row: { type: String, required: true },
      number: { type: Number, required: true },
      type: { type: String, enum: ["standard", "vip", "couple"], required: true },
      status: { type: String, enum: ["active", "maintenance"], required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", roomSchema);