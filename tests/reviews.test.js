const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from app.js
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');

let token;
let userId;
let bookId;
let reviewId;
let createdReviewIds = []; // Array to store created review IDs for cleanup

describe('Review API', () => {
  
  // Setup user, book, and authentication token
  beforeAll(async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'Str0ngP@ssword',
    };

    // Register a user and log in to get a token
    const registerResponse = await request(app)
      .post('/api/users/register')
      .send(testUser);
    
    token = registerResponse.body.token;
    userId = registerResponse.body.userId;

    const book = await Book.findOne();

    if (book) {
      bookId = book._id;  // Use the existing book ID
    } else {
      throw new Error('No books available in the database for the test'); // Fail the test if no books are available
    }
  });

  // Test POST /reviews
  it('should create a new review', async () => {
    const newReview = {
      user: userId,
      book: bookId,
      comment: 'Great book!',
      rating: 5,
    };

    const response = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(newReview);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('comment', 'Great book!');
    expect(response.body).toHaveProperty('rating', 5);

    reviewId = response.body._id;
    createdReviewIds.push(reviewId);
  });

  // Test GET /reviews
  it('should get all reviews', async () => {
    const response = await request(app)
      .get('/api/reviews');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /reviews/user/:userId
  it('should get reviews by user ID', async () => {
    const response = await request(app)
      .get(`/api/reviews/user/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('user', userId);
  });

  // Test PATCH /reviews/:reviewId
  it('should update an existing review', async () => {
    const updatedReviewData = {
      comment: 'Updated comment',
      rating: 4,
    };

    const response = await request(app)
      .patch(`/api/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedReviewData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('comment', 'Updated comment');
    expect(response.body).toHaveProperty('rating', 4);
  });

  // Test DELETE /reviews/:reviewId
  it('should delete a review by ID', async () => {
    const response = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Review deleted successfully');
  });

  // Cleanup: Remove created reviews and close DB connection
  afterAll(async () => {
    for (const reviewId of createdReviewIds) {
      await Review.findByIdAndDelete(reviewId);
    }

    await User.findByIdAndDelete(userId);
    await Book.findByIdAndDelete(bookId);

    mongoose.connection.close(); // Close the connection to the database
  });
});
