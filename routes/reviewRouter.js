const express = require('express');
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  setTourUserIds,
  getReview,
} = require('../controller/reviewController');
const {
  protect,
  restrictTo,
} = require('../controller/authenticationController');

const router = express.Router({ mergeParams: true });

router.use(protect);
router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);
router.route('/:id').patch(restrictTo('user', 'admin'), updateReview);

router
  .route('/:id')
  .get(getReview)
  .delete(restrictTo('user', 'admin'), deleteReview);
module.exports = router;
