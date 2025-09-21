export const errorHandler = (error, req, res, next) => {
  console.log('Error:', error);

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'Something went wrong on server',
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: 'The requested endpoint does not exist',
  });
};
