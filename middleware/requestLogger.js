const requestLogger = (request, response, next) => {
  const currentDate = new Date();
  const readableDate = currentDate.toLocaleDateString('en-GB') + ', ' + currentDate.toLocaleTimeString('en-US');
  console.log('Timestamp: ', readableDate);
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
}

module.exports = requestLogger;