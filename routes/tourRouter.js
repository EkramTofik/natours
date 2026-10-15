const express = require('express');

const {
  aliasTopTours,
  getTourStats,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getMonthlyPlan,
  getTourWithin,
  getDistances,
} = require('../controller/tourController');
const {
  protect,
  restrictTo,
} = require('../controller/authenticationController');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getTourWithin);
router.route('/distance/:latlng/unit/:unit').get(getDistances);
// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);
module.exports = router;
