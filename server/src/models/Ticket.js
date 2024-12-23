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
  items: [{
    concessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Concession',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    notes: String
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "cancelled", "refunded"], default: 'pending' },
  paymentMethod: { type: String, enum: ["momo", "VNPay", "zalopay"], required: true },
  bookingCode: { type: String, required: true },    //Mã đặt vé giúp xác nhận vé
  qrCode: { type: String, required: true },      //Mã QR quét tại quầy
},{ timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
