const AppError = require('./../utils/appError');

const castErrorHandler = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const duplicateHandler = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const validationHandler = (err) => {
  const values = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data. ${values}`;
  return new AppError(message, 400);
};
const devError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  // isOperational : usually the error from the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // false: programming error or something wrong
  else {
    res.status(500).json({
      status: 'error',
      message: 'somethig went wrong',
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    error.message = err.message;
    error.name = err.name;
    error.code = err.code;

    if (error.name === 'CastError') error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateHandler(error);
    if (error.name === 'ValidationError') error = validationHandler(error);
    prodError(error, res);
  }
};
