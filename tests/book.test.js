// book.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from app.js

beforeAll(async () => {
  // Connect to a test database before all tests run
  await mongoose.connect(process.env.TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up the database after tests are complete
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Book API', () => {
  let bookId;

  // Test GET /books
  it('should fetch all books', async () => {
    const response = await request(app).get('/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/:bookId
  it('should fetch a book by ID', async () => {
    const response = await request(app).get(`/books/${bookId}`);
    expect(response.statusCode).toBe(404); // Assuming bookId is not set yet, expecting not found
  });

  // Test GET /books/new
  it('should fetch new books', async () => {
    const response = await request(app).get('/books/new');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/topsellers
  it('should fetch top books', async () => {
    const response = await request(app).get('/books/topsellers');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/genre/:genre
  it('should fetch books by genre', async () => {
    const genre = 'Fiction'; // Example genre
    const response = await request(app).get(`/books/genre/${genre}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/search/:searchQuery
  it('should search books by query', async () => {
    const query = 'Test'; // Example search query
    const response = await request(app).get(`/books/search/${query}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /books/unique/:fieldName
  it('should fetch unique genres', async () => {
    const response = await request(app).get('/books/unique/genre');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
