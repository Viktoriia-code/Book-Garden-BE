const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming the app is exported in your app.js
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');

let token;
let userId;
let bookId;

beforeAll(async () => {
  // Clean the test database for carts
  await Cart.deleteMany({});
  
  // Register a user and log in to get a token
  const testUser = {
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'janedoe@example.com',
    password: 'P@ssword123',
  };

  const registerResponse = await request(app)
    .post('/api/users/register')
    .send(testUser);

  token = registerResponse.body.token;
  userId = registerResponse.body.userId;

  // Get an existing book from the database
  const existingBook = await Book.findOne();
  if (!existingBook) {
    throw new Error('No books available in the database for the test');
  }

  bookId = existingBook._id;
});

afterAll(async () => {
  const cart = await Cart.findOne({ user: userId }); // Find the cart for the user
  if (cart) {
    await Cart.findByIdAndDelete(cart._id); // Delete the created cart
  }
  await User.findByIdAndDelete(userId); // Delete created user
  await mongoose.connection.close();
});

describe('Cart API', () => {
  it('should add a book to the cart', async () => {
    const response = await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookId });

    expect(response.status).toBe(201);
    expect(response.body.products).toHaveLength(1);
    expect(response.body.products[0].book.toString()).toEqual(bookId.toString());
  });

  it('should retrieve the cart', async () => {
    const response = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(1);
    expect(response.body.products[0].book._id.toString()).toEqual(bookId.toString());
  });

  it('should add a book to the cart again to increase quantity', async () => {
    // Add the same book to the cart again to increase its quantity
    const response = await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookId });

    expect(response.status).toBe(201);
    expect(response.body.products).toHaveLength(1);
    expect(response.body.products[0].quantity).toBe(2); // Quantity should now be 2
  });

  it('should reduce the book quantity in the cart', async () => {
    const response = await request(app)
      .post('/api/cart/reduce')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookId });

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(1); // The cart should still contain the book
    expect(response.body.products[0].quantity).toBe(1); // Quantity should now be 1
  });

  it('should remove the book from the cart', async () => {
    // Reduce the book quantity to remove it from the cart
    const response = await request(app)
      .post('/api/cart/reduce')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Cart is empty and has been removed");
  });

  it('should return 404 when cart is empty', async () => {
    const response = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Cart is empty");
  });
});

