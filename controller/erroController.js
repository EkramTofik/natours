const AppError = require('../utiles/appError');

const handleCastError = (err) =>
  new AppError(`Invalid ${err.path}:${err.value}`, 400);
const handleDuplicateError = (err) => {
  const value = err.errorResponse.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value:${value} .please use another value`;
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const error = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid input data.${error.join(',')}`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateError(error);

    if (error._message === 'Validation failed')
      error = handleValidationError(error);
    sendErrorProd(error, res);
  }
};
