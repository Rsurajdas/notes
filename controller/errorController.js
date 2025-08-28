import AppError from "../utils/appError.js";

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDb = (err) => {
  const errObj = err.keyValue;
  const error = Object.keys(errObj).reduce((obj, key) => {
    obj[key] = `Duplicate field value: ${errObj[key]}`;
    return obj;
  }, {});
  const message = `Please use another value!`;
  return new AppError(message, 400, error);
};

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).reduce((obj, error) => {
    obj[error.path] = error.message;
    return obj;
  }, {});
  const message = `Invalid input data`;
  return new AppError(message, 400, errors);
};

const handleJWTError = () =>
  new AppError(`Invalid token. Please log in again!`, 401);

const handleJWTExpiredError = () =>
  new AppError(`Your token has expired! Please log in again!`, 401);

const sendErrorDev = (err, res) => {
  const response = {
    status: err.status,
    statusCode: err.statusCode,
    error: err.error,
    message: err.message,
  };
  res.status(err.statusCode).json(response);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "CastError") err = handleCastErrorDb(err);
  if (err.code === 11000) err = handleDuplicateFieldsDb(err);
  if (err.name === "ValidationError") err = handleValidationErrorDb(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  sendErrorDev(err, res);
};

export default globalErrorHandler;
