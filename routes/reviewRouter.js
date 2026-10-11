const express = require('express');
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  setTourUserIds,
} = require('../controller/reviewController');
const {
  protect,
  restrictTo,
} = require('../controller/authenticationController');

const router = express.Router({ mergeParams: true });
router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);
router.route('/:id').patch(updateReview);

router.route('/:id').delete(deleteReview);
module.exports = router;
