const express = require('express');

const app = express();
const morgan = require('morgan');

const AppError = require('./utiles/appError');
const globalErrorHandler = require('./controller/erroController');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
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
