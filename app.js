const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const connectDB = require('./config/db'); // Import your connectDB function

// Routers:
const bookRouter = require('./routes/bookRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const wishlistRouter = require('./routes/wishlistRouter'); // Include your wishlist router

// Middleware:
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const requireAuth = require('./middleware/requireAuth');

// express app
const app = express();

// Connect to MongoDB
connectDB();

// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Serve the OpenAPI JSON
app.get('/api/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, './utils/swagger.json'));
});

// middleware for cross-origin resource sharing
app.use(cors());

// middleware to parse JSON
app.use(express.json());

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// middleware to log requests
app.use(requestLogger);

// Define the protected route
app.get("/api/protectedroute", requireAuth, async (req, res) => {
  res.status(200).json({ message: "Protected route accessed successfully", user: req.user });
});

// Use the bookRouter for all /books routes
app.use('/api/books', bookRouter);

// Use the userRouter for all /users routes
app.use('/api/users', userRouter);

// Use the reviewRouter for all /reviews routes
app.use('/api/reviews', reviewRouter);

// Use the cartRouter for all /cart routes
app.use('/api/cart', cartRouter);

// Use the orderRouter for all /orders routes
app.use('/api/orders', orderRouter);

// Use the wishlistRouter for all /wishlist routes
app.use('/api/wishlist', wishlistRouter); // Include your wishlist router

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
