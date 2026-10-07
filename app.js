const express = require('express');

const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utiles/appError');
const globalErrorHandler = require('./controller/erroController');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'To many requests from this ID,please try again in an hour.',
});
app.use('/api', limiter);
app.use(express.json());
app.use((req, res, next) => {
  res.requestTime = new Date().toISOString;
  next();
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*path', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
