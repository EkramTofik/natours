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

const router = express.Router();
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
