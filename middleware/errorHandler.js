const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  response.status(500);
  response.json({
    message: error.message,
  })
}

module.exports = errorHandler;