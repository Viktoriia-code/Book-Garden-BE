const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from app.js
const User = require('../models/userModel'); // Your User model

let token;
let userId;
let testUser;
const createdUserIds = []; // Array to keep track of created user IDs

describe('User API', () => {
  
  // Register a user before running the tests
  beforeAll(async () => {
    testUser = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'Str0ngP@ssword'
    };

    const registerResponse = await request(app)
      .post('/api/users/register')
      .send(testUser);
    
    token = registerResponse.body.token;
    userId = registerResponse.body.userId;
    createdUserIds.push(userId); // Track the created user ID
  });

  // Test POST /users/register
  it('should register a new user', async () => {
    const newUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      email: 'janedoe@example.com',
      password: 'Str0ngP@ssword'
    };
    
    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userId');

    createdUserIds.push(response.body.userId); // Track the created user ID
  });

  // Test POST /users/login
  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: testUser.email, password: testUser.password });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userId');
  });

  // Test GET /users/:userId
  it('should get the user profile', async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', userId);
  });

  // Test PATCH /users/:userId
  it('should update the user profile', async () => {
    const updatedData = { firstName: 'Johnathan' };

    const response = await request(app)
      .patch(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('firstName', 'Johnathan');
  });

  // Test PATCH /users/:userId/password
  it('should update the user password', async () => {
    const response = await request(app)
      .patch(`/api/users/${userId}/password`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: testUser.password,
        newPassword: 'N3wStr0ngP@ssword'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Password updated successfully');
  });

  // Test GET /users/favorites/:userId
  it('should get the user favorites', async () => {
    const response = await request(app)
      .get(`/api/users/favorites/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test POST /users/favorites
  it('should add a book to user favorites', async () => {
    const bookId = new mongoose.Types.ObjectId(); // Mock book ID

    const response = await request(app)
      .post(`/api/users/favorites`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, bookId });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Book added to favorites');
  });

  // Test DELETE /users/favorites/:userId/:bookId
  it('should remove a book from user favorites', async () => {
    const bookId = new mongoose.Types.ObjectId(); // Mock book ID

    // First, add the book to favorites
    await request(app)
      .post(`/api/users/favorites`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, bookId });

    // Then, remove it
    const response = await request(app)
      .delete(`/api/users/favorites/${userId}/${bookId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Book removed from favorites');
  });

  // Test DELETE /users/:userId
  it('should delete the user', async () => {
    const response = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  // Cleanup - delete only created users
  afterAll(async () => {
    for (const id of createdUserIds) {
      await User.findByIdAndDelete(id);
    }
    mongoose.connection.close(); // Close the connection to the database
  });
});
