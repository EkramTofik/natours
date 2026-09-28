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
} = require('../controller/tourController');
const {
  protect,
  restrictTo,
} = require('../controller/authenticationController');

const router = express.Router();
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
