const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code:    { type: String, required: true, unique: true, index: true },
  email:   { type: String, required: true, lowercase: true, index: true },
  review:  { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  status:  { type: String, enum: ['issued', 'redeemed', 'expired'], default: 'issued' },
  expiresAt: { type: Date },
  downloadedAt: { type: Date },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Voucher', voucherSchema);
