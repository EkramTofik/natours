const User = require('../model/userModel');
const catchAsync = require('../utiles/catchAsync');
// const ApiFeature = require('../utiles/apiFeature');
const AppError = require('../utiles/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
exports.createUser = (req, res) => {
  res.status(201).json({
    status: 'error',
    message: 'This route is not handled yet ',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not handled yet ',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not handled yet ',
  });
};
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
