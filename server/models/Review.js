const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  email:  { type: String, required: true, lowercase: true, trim: true, index: true },
  text:   { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  isActive: { type: Boolean, default: true }, // модерация по желанию
  voucher: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' },
  ip: String,
  userAgent: String,
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Review', reviewSchema);
