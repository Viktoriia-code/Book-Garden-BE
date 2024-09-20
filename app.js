const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// express app
const app = express();

connectDB();

// middleware for cross-origin resource sharing
app.use(cors());

// middleware to parse JSON
app.use(express.json());

// middleware to log requests
app.use(requestLogger);

// Use the bookRouter for all /books routes
app.use('/api/books', bookRouter);

// Use the userRouter for all /users routes
app.use('/api/users', userRouter);

// Use the reviewRouter for all /reviews routes
app.use('/api/reviews', reviewRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});