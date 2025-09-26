// controllers/reviewController.js
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const Review = require('../models/Review');
const Voucher = require('../models/Voucher');
const { voucherPdfStream } = require('../utils/voucherPdf');

const BRAND = 'Halva Travel';
const SITE_URL = process.env.SITE_URL || 'http://localhost:5000';
const EXPIRES_DAYS  = Number(process.env.VOUCHER_EXPIRES_DAYS || 180);
const COOLDOWN_DAYS = Number(process.env.VOUCHER_COOLDOWN_DAYS || 30);

function genVoucherCode() {
  const A = crypto.randomBytes(4).toString('hex').toUpperCase().slice(0,4);
  const B = (Math.random()*1e8|0).toString().slice(0,4).padStart(4,'0');
  const C = crypto.randomBytes(3).toString('hex').toUpperCase().slice(0,4);
  return `${A}-${B}-${C}`;
}
const normalizeEmail = (e='') => e.trim().toLowerCase();

// ——— Публичные ———
async function listPublic(req, res) {
  try {
    const items = await Review.find({ isActive: true })
      .select('name text rating createdAt')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const { name, email, text, rating } = req.body || {};
    if (!name || !email || !text || !rating) {
      return res.status(400).json({ error: 'Заполните все поля: name, email, text, rating' });
    }
    const rate = Number(rating);
    if (rate < 1 || rate > 5) {
      return res.status(400).json({ error: 'Рейтинг должен быть от 1 до 5' });
    }

    const emailNorm = normalizeEmail(email);
    const since = new Date(Date.now() - COOLDOWN_DAYS*24*60*60*1000);

    // не выдаём новый ваучер чаще кулдауна
    const recentVoucher = await Voucher.findOne({
      email: emailNorm,
      createdAt: { $gte: since },
    });

    if (recentVoucher) {
      const review = await Review.create({
        name, email: emailNorm, text, rating: rate,
        ip: req.ip, userAgent: req.headers['user-agent'],
        voucher: recentVoucher._id,
      });
      const link = `${SITE_URL}/api/vouchers/${recentVoucher.code}/download`;
      return res.status(201).json({
        review,
        voucher: {
          code: recentVoucher.code,
          link,
          expiresAt: recentVoucher.expiresAt || null,
          note: `Ваучер ${BRAND} уже был выдан ранее (кулдаун ${COOLDOWN_DAYS} дн.).`,
        }
      });
    }

    // новый отзыв
    const review = await Review.create({
      name, email: emailNorm, text, rating: rate,
      ip: req.ip, userAgent: req.headers['user-agent'],
    });

    // новый ваучер
    const code = genVoucherCode();
    const expiresAt = EXPIRES_DAYS ? new Date(Date.now() + EXPIRES_DAYS*24*60*60*1000) : null;

    const voucher = await Voucher.create({
      code,
      email: emailNorm,
      review: review._id,
      expiresAt,
    });

    review.voucher = voucher._id;
    await review.save();

    const link = `${SITE_URL}/api/vouchers/${code}/download`;
    res.status(201).json({
      review,
      voucher: { code, link, expiresAt },
      message: `Отзыв принят, ваучер ${BRAND} доступен для скачивания`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getInfo(req, res) {
  try {
    const { code } = req.params;
    const v = await Voucher.findOne({ code });
    if (!v) return res.status(404).json({ error: 'Ваучер не найден' });
    const isExpired = v.expiresAt && v.expiresAt < new Date();
    res.json({
      code: v.code,
      email: v.email,
      status: isExpired ? 'expired' : v.status,
      expiresAt: v.expiresAt || null,
      downloadedAt: v.downloadedAt || null,
      downloadLink: `/api/vouchers/${v.code}/download`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function downloadVoucher(req, res) {
  try {
    const { code } = req.params;
    const v = await Voucher.findOne({ code });
    if (!v) return res.status(404).json({ error: 'Voucher not found' });
    if (v.expiresAt && v.expiresAt < new Date()) {
      return res.status(410).json({ error: 'Voucher expired' });
    }

    const logoPath = path.resolve(__dirname, '../assets/logo.png');
    const logo = fs.existsSync(logoPath) ? logoPath : undefined;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="voucher-${code}.pdf"`);

    const pdf = voucherPdfStream({
      code: v.code,
      email: v.email,
      expiresAt: v.expiresAt || null,
      logoPath: logo,
      brand: BRAND,
    });

    pdf.on('error', () => {
      if (!res.headersSent) res.status(500).json({ error: 'PDF generation failed' });
      else try { res.end(); } catch {}
    });

    pdf.pipe(res);

    v.downloadedAt = new Date();
    v.save().catch(() => {});
  } catch (err) {
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
}

// ——— Админ ———
async function listAllReviews(req, res) {
  try {
    const items = await Review.find({})
      .select('name email text rating createdAt isActive voucher')
      .populate('voucher', 'code expiresAt downloadedAt status')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function setReviewActive(req, res) {
  try {
    const { isActive } = req.body;
    const doc = await Review.findByIdAndUpdate(
      req.params.id,
      { isActive: !!isActive },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Отзыв не найден' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteReview(req, res) {
  try {
    const doc = await Review.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Отзыв не найден' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function listVouchers(req, res) {
  try {
    const list = await Voucher.find({})
      .select('code email status expiresAt downloadedAt review createdAt')
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function setVoucherStatus(req, res) {
  try {
    const { status } = req.body; // 'new' | 'issued' | 'used' | 'expired'
    const doc = await Voucher.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Ваучер не найден' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// ——— ЕДИНЫЙ export ———
module.exports = {
  // public
  listPublic,
  create,
  getInfo,
  downloadVoucher,
  // admin
  listAllReviews,
  setReviewActive,
  deleteReview,
  listVouchers,
  setVoucherStatus,
};
