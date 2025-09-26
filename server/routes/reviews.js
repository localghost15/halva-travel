const express = require('express');
const ctrl = require('../controllers/reviewController');
const router = express.Router();

router.get('/', ctrl.listPublic);
router.post('/', ctrl.create);

router.get('/all', ctrl.listAllReviews);
router.put('/:id/active', ctrl.setReviewActive);
router.delete('/:id', ctrl.deleteReview);

module.exports = router;