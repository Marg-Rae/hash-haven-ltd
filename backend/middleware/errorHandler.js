export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    status = 400;
  }

  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
};
