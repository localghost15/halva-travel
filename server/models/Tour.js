const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const discountSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['early_booking', 'seasonal_offer', 'last_minute'],
    required: true
  },
  description: {
    ru: { type: String },
    en: { type: String },
    uz: { type: String }
  },
  amount: {
    type: Number, // скидка в процентах, например, 20 = 20%
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  }
}, { _id: false });

const tourSchema = new mongoose.Schema({
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: true,
    index: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    index: true
  },

  title: {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },

  route: {
    ru: String,
    en: String,
    uz: String
  },

  shortDescription: {
    ru: String,
    en: String,
    uz: String
  },

  isActive: {
    type: Boolean,
    default: true
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },

  includes: {
    type: [String],
    enum: [
      'accommodation',     // Размещение
      'transport',         // Транспорт
      'guide',             // Услуги гида
      'meals',             // Питание
      'flight_tickets',    // Авиабилеты
      'train_tickets',     // Ж/д билеты
      'entrance_tickets',  // Входные билеты
      'entertainment',     // Развлечения
      'cultural',          // Культурные мероприятия
      'hiking'             // Походы
    ],
    default: []
  },

  extras: {
    ru: String,
    en: String,
    uz: String
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  days: {
    type: Number,
    required: true,
    min: 1
  },

  nights: {
    type: Number,
    default: 0,
    min: 0
  },

  images: {
    type: [String],
    default: []
  },

  discounts: {
    type: [discountSchema],
    default: []
  }

}, { timestamps: true, versionKey: false });

// ✅ Автоматическая генерация slug (если не указан)
tourSchema.pre('save', function (next) {
  if (!this.isModified('slug') && !this.slug && this.title?.en) {
    const baseSlug = this.title.en
      .toLowerCase()
      .replace(/[\s\/\\]+/g, '-')     // пробелы и слэши → тире
      .replace(/[^\w\-]+/g, '')       // удалить спецсимволы
      .replace(/\-\-+/g, '-')         // двойные тире → одно
      .replace(/^-+|-+$/g, '');       // убрать тире с краёв

    this.slug = `${baseSlug}-${uuidv4().slice(0, 8)}`; // добавляем уникальность
  }
  next();
});

module.exports = mongoose.model('Tour', tourSchema);
