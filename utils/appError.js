class AppError extends Error {
  constructor(message, statusCode, err) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.error = err;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
