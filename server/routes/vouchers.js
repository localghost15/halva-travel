const express = require('express');
const { downloadVoucher, getInfo, listVouchers, setVoucherStatus } = require('../controllers/reviewController');
const router = express.Router();

router.get('/', listVouchers);
router.put('/:id/status', setVoucherStatus);

router.get('/:code/download', downloadVoucher);
router.get('/:code', getInfo); // опционально

module.exports = router;
