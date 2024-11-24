//Lưu trữ thông tin đặt vé xem phim của người dùng

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: "Showtime", required: true },
  seats: [
    {
      row: { type: String, required: true },
      number: { type: Number, required: true },
      type: { type: String, enum: ["standard", "vip", "couple"], required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "cancelled", "refunded"], required: true },
  paymentMethod: { type: String, enum: ["credit-card", "momo", "cash", "zalopay"], required: true },
  bookingCode: { type: String, required: true },    //Mã đặt vé giúp xác nhận vé
  qrCode: { type: String, required: true },      //Mã QR quét tại quầy
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
