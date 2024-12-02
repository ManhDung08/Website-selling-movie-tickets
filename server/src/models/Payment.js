const mongoose = require('mongoose');

const PaymentMethodEnum = ['VNPay', 'momo', 'zalopay'], PaymentStatusEnum = ['pending', 'success', 'failed', 'refunded'];

const paymentSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: PaymentMethodEnum, required: true },
  transactionCode: { type: String, required: true, unique: true, trim: true },
  status: { type: String, enum: PaymentStatusEnum, default: 'pending' },
  paymentDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
