// utils/voucherPdf.js
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');
const fs = require('fs');

function voucherPdfStream({ code, email, expiresAt, logoPath, brand = 'Halva Travel' }) {
  const doc = new PDFDocument({ size: 'A4', margin: 60 });
  const stream = new PassThrough();

  // никаких registerFont — вообще
  doc.on('error', (e) => stream.emit('error', e));
  doc.pipe(stream);

  // logo (optional)
  if (logoPath && fs.existsSync(logoPath)) {
    try { doc.image(logoPath, doc.page.margins.left, 40, { height: 60 }); } catch {}
  }

  // header
  doc.font('Helvetica-Bold').fontSize(22).fillColor('#A88856')
     .text(brand, { align: 'center' });
  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(12).fillColor('#666')
     .text('Thank you for your review', { align: 'center' });

  doc.moveDown(2);

  // content (ASCII only)
  doc.font('Helvetica-Bold').fontSize(18).fillColor('#000')
     .text(`Voucher code: ${String(code).trim()}`);
  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(12).fillColor('#444')
     .text(`Email: ${email}`);

  if (expiresAt) {
    const human = new Date(expiresAt).toISOString().slice(0,10); // YYYY-MM-DD
    doc.moveDown(0.5);
    doc.text(`Valid until: ${human}`);
  }

  doc.moveDown(2);
  doc.font('Helvetica').fontSize(11).fillColor('#666')
     .text('Show this code to your Halva Travel manager when booking to get a discount.');

  // footer
  doc.moveDown(6);
  doc.font('Helvetica').fontSize(9).fillColor('#999')
     .text(`${brand} · halva.travel`, { align: 'center' });

  doc.end();
  return stream;
}

module.exports = { voucherPdfStream };
