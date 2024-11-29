import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }], // Mối quan hệ giữa Payment và Ticket
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "cancelled", "refunded"], required: true },
    paymentMethod: { type: String, enum: ["momo", "VNPay", "zalopay"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  

export default mongoose.model("Payment", paymentSchema);