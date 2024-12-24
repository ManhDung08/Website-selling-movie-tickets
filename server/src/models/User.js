//Lưu trữ thông tin người dùng
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date },
  // isEmailVerified: { type: Boolean, default: false },
  // emailVerificationToken: String,
  // emailVerificationExpires: Date,
  // isActive: { type: Boolean, default: false },
  // googleId: { type: String, unique: true, sparse: true }
},{ timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
