const express = require('express');
const app = express();
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");

// Middleware to parse JSON
app.use(express.json());

app.use(logger);

// Use the bookRouter for all /books routes
app.use('/books', bookRouter);

// Use the userRouter for all /users routes
app.use('/users', userRouter);

app.use(notFound);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});