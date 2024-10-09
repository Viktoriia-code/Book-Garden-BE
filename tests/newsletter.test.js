const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your Express app is exported from app.js
const Newsletter = require('../models/newsletterModel');

let createdEmails = []; // Array to track created email subscriptions

afterAll(async () => {
  await Newsletter.deleteMany({ _id: { $in: createdEmails } });
  await mongoose.connection.close();
});

describe('Newsletter API', () => {
  it('should subscribe a new user to the newsletter', async () => {
    const newUser = {
      email: 'testuser@example.com',
    };

    const response = await request(app)
      .post('/api/newsletter/add')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(newUser.email);

    createdEmails.push(response.body._id); // Store the created email ID
  });

  it('should not allow duplicate subscriptions', async () => {
    const newUser = {
      email: 'duplicateuser@example.com',
    };

    // First subscription should succeed
    const firstResponse = await request(app)
      .post('/api/newsletter/add')
      .send(newUser);

    expect(firstResponse.status).toBe(201);
    expect(firstResponse.body).toHaveProperty('_id');
    expect(firstResponse.body.email).toBe(newUser.email);

    createdEmails.push(firstResponse.body._id); // Store the created email ID

    // Second subscription should fail
    const secondResponse = await request(app)
      .post('/api/newsletter/add')
      .send(newUser);

    expect(secondResponse.status).toBe(400);
    expect(secondResponse.body.message).toMatch(/duplicate key error/); // Check for the specific error message
  });

  it('should return an error for missing email', async () => {
    const response = await request(app)
      .post('/api/newsletter/add')
      .send({}); // Sending an empty body

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please provide an email."); // Ensure the error message is as expected
  });

  it('should return an error for invalid email format', async () => {
    const invalidEmailUser = {
      email: 'invalid-email-format', // Not a valid email format
    };

    const response = await request(app)
      .post('/api/newsletter/add')
      .send(invalidEmailUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Please provide a valid email."); // Adjust based on the actual error message
  });
});
