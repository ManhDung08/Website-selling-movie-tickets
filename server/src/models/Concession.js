const mongoose = require("mongoose");

// Model quản lý các loại đồ ăn/thức uống
const concessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['popcorn', 'beverage', 'snack', 'combo'],
    required: true 
  },
  price: { type: Number, required: true },
  image: { type: String },
  size: { 
    type: String,
    enum: ['S', 'M', 'L', 'XL'],
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'out_of_stock', 'discontinued'],
    default: 'available'
  },
  theaterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Theater"
  },
}, { timestamps: true });

module.exports = mongoose.model('Concession', concessionSchema);