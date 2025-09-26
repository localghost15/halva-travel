const Voucher = require('../models/Voucher');
const { voucherPdfStream } = require('../utils/voucherPdf');

// Метаданные ваучера (для кнопки «Скачать»/проверки статуса)
exports.getInfo = async (req, res) => {
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
};

// Скачать PDF ваучера
exports.download = async (req, res) => {
  try {
    const { code } = req.params;
    const voucher = await Voucher.findOne({ code });
    if (!voucher) return res.status(404).json({ error: 'Ваучер не найден' });

    if (voucher.expiresAt && voucher.expiresAt < new Date()) {
      return res.status(410).json({ error: 'Срок действия ваучера истёк' });
    }

    const pdfStream = voucherPdfStream({
      code: voucher.code,
      email: voucher.email,
      expiresAt: voucher.expiresAt || null,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="voucher-${voucher.code}.pdf"`);
    pdfStream.pipe(res);

    voucher.downloadedAt = new Date();
    voucher.save().catch(() => {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
