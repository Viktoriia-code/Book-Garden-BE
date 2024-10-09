const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from app.js

describe('Book API', () => {
  let bookId;

  // Fetch an existing book ID from the database before testing
  beforeAll(async () => {
    const response = await request(app).get('/api/books');
    const books = response.body;

    if (books.length > 0) {
      bookId = books[0]._id; // Get the ID of the first book in the response
    } else {
      throw new Error('No books found in the database');
    }
  });

  // Test GET /books
  it('should fetch all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/:bookId
  it('should fetch a book by ID', async () => {
    const response = await request(app).get(`/api/books/${bookId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', bookId);
  });

  // Test GET /books/:bookId/reviews
  it('should fetch reviews by book ID', async () => {
    const response = await request(app).get(`/api/books/${bookId}/reviews`);
    
    if (response.body.length === undefined) {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: 'No reviews found for this book.' });
    } else {
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('user');
      expect(response.body[0]).toHaveProperty('comment');
    }
  });

  // Test GET /books/new
  it('should fetch new books', async () => {
    const response = await request(app).get('/api/books/new');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/topsellers
  it('should fetch top books', async () => {
    const response = await request(app).get('/api/books/topsellers');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/genre/:genre
  it('should fetch books by genre', async () => {
    const genre = 'Fiction'; // Example genre
    const response = await request(app).get(`/api/books/genre/${genre}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/search/:searchQuery
  it('should search books by query', async () => {
    const query = 'Test'; // Example search query
    const response = await request(app).get(`/api/books/search/${query}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/unique/:fieldName
  it('should fetch unique genres', async () => {
    const response = await request(app).get('/api/books/unique/genre');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
