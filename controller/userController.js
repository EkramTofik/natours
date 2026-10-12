const User = require('../model/userModel');
const catchAsync = require('../utiles/catchAsync');
// const ApiFeature = require('../utiles/apiFeature');
const AppError = require('../utiles/appError');
const handlerFactory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    next(
      new AppError(
        'This route is not for password updates.Please use /updateMyPassword.',
        400,
      ),
    );
  }
  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    returnDocument: 'after',
    runValidators: true,
  });
  // user.name = 'ekrutii';
  // await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createUser = (req, res) => {
  res.status(201).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead ',
  });
};
exports.getAllUsers = handlerFactory.getAll(User);

exports.getUser = handlerFactory.getOne(User);

exports.updateUser = handlerFactory.updateOne(User);

exports.deleteUser = handlerFactory.deleteOne(User);
