const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your app is exported in app.js
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Book = require('../models/bookModel');

let token;
let userId;
let bookId;
let book;
let anotherUserId;
let createdOrderId; // Store the created order ID
let createdCartId; // Store the created cart ID

beforeAll(async () => {
  // Clean the test database for orders and carts
  await Order.deleteMany({});
  await Cart.deleteMany({});

  // Register a user and log in to get a token
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'P@ssword123',
  };

  const registerResponse = await request(app)
    .post('/api/users/register')
    .send(testUser);

  token = registerResponse.body.token;
  userId = registerResponse.body.userId;

  book = await Book.findOne();

  if (book) {
    bookId = book._id;  // Use the existing book ID
  } else {
    throw new Error('No books available in the database for the test'); // Fail the test if no books are available
  }

  // Add the book to the cart for order testing
  const cartResponse = await request(app)
    .post('/api/cart/add')
    .set('Authorization', `Bearer ${token}`)
    .send({ bookId });
    
  createdCartId = cartResponse.body._id; // Store the created cart ID
});

describe('Order API', () => {

  it('should create an order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.user).toEqual(userId);
    expect(response.body.price).toBe(book.price); // Price based on the book added to the cart
    expect(response.body.status).toBe("processing"); // Initial status
    createdOrderId = response.body._id; // Store the created order ID
  });

  it('should retrieve orders by user ID', async () => {
    const response = await request(app)
      .get(`/api/orders/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // We expect one order to be present
    expect(response.body[0].user.toString()).toEqual(userId); // Check that the order belongs to the user
  });

  it('should return 404 when user has no orders', async () => {
    // Create a new user to test the no orders scenario
    const testUser = {
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'janesmith',
      email: 'janesmith@example.com',
      password: 'P@ssword123',
    };

    const registerResponse = await request(app)
      .post('/api/users/register')
      .send(testUser);

    const anotherUserToken = registerResponse.body.token;
    anotherUserId = registerResponse.body.userId;

    const response = await request(app)
      .get(`/api/orders/${anotherUserId}`)
      .set('Authorization', `Bearer ${anotherUserToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("The user doesn't have orders yet.");
  });

  it('should return 400 when trying to create an order with an empty cart', async () => {
    // Clear the cart to test empty cart scenario
    await Cart.deleteMany({});

    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Cart is empty");
  });

});

afterAll(async () => {
  // Delete only the created entities
  if (createdOrderId) {
    await Order.findByIdAndDelete(createdOrderId); // Delete the created order
  }
  
  if (createdCartId) {
    await Cart.findByIdAndDelete(createdCartId); // Delete the created cart
  }

  await User.findByIdAndDelete(userId); // Delete created user
  if (anotherUserId) {
    await User.findByIdAndDelete(anotherUserId); // Delete another user
  }
  
  await mongoose.connection.close(); // Close the database connection
});
