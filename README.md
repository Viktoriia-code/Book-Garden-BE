# Book Garden (Backend)

<p align="center">
  <img src="https://github.com/user-attachments/assets/96c7e321-7db7-4b11-8797-f6f41499e954" alt="Logo-for-GitHub">
</p>

:books: "Book Garden" is an online bookshop dedicated to selling a wide range of new books.

This app was developed as part of "Web development" course at Metropolia UAS.

📅 August - October, 2024

## :computer: Technical stack overview
- Node.js and Express
- MongoDB and mongoose
- Cors middleware for cross-origin resource sharing
- JWT for authenticating and authorizing users
- colors module for styling console output
- seeder.js for populating the database with initial data
- validator module for checking emails and passwords
- swagger for API documentation
- dotenv for managing environment variables from a .env file into process.env
- cross-env for setting environment variables across different environments
- swagger for API documentation
- Jest and Supertest for testing API endpoints

## 🔧 How to run locally:

### 📌 Prerequisites:
Before you can run the application, ensure you have the following installed:
- Git (for cloning the repository)
- Node.js
- MongoDB

### 🏗️ Installation:
1) Clone the repository:
```
git clone https://github.com/Viktoriia-code/Book-Garden-BE.git
```

2) Move to the folder and install modules:
```
cd ./Book-Garden-BE
npm install
```

3) Populate the database with initial data:
```
npm run data:import
```

4) Run the application:
```
npm run dev
```

## :chart_with_upwards_trend: Database Seeding Commands:

:floppy_disk: To import data using seeder.js:
```
npm run data:import
```

🗑️ To destroy data using seeder.js:
```
npm run data:destroy
```

## API Documentation
The API is documented using the OpenAPI Specification (formerly known as Swagger).

### Accessing the API Documentation
You can view the API documentation in two ways:
1. **Swagger UI**:
- Navigate to the following URL in your browser:
[http://localhost:4000/api-docs/](http://localhost:4000/api-docs/) (Replace localhost:4000 with your server's address and port if different.)

2. **OpenAPI JSON**:
- The OpenAPI specification can be accessed directly in JSON format at:
[http://localhost:4000/utils/swagger.json](http://localhost:4000/api/swagger.json)
(Again, replace with your server's address and port if needed.)

## API Overview
- **Base URL**:

  The base URL for all API endpoints is: [http://localhost:4000/api/](http://localhost:4000/api/)

### Endpoints
- **Users**
    - **GET /users:** Get all users
    - **POST /users/register:** Register a new user
    - **POST /users/login:** Login user
    - **GET /users/{userId}:** Get user profile
    - **PATCH /users/{userId}:** Update user profile
    - **DELETE /users/{userId}:** Delete user
    - **PATCH /users/{userId}/password:** Update user password
    - **GET /users/favorites/{userId}:** Get user's favorite books
    - **POST /users/favorites:** Add book to user's favorites
    - **DELETE /users/favorites/{userId}/{bookId}:** Remove book from user's favorites
- **Books**
    - **GET /books:** Get all books
    - **POST /books:** Create a new book
    - **GET /books/new:** Get newly added books
    - **GET /books/topsellers:** Get top-selling books
    - **GET /books/{bookId}/reviews:** Get reviews for a book
    - **GET /books/{bookId}:** Get a book by its ID
    - **PATCH /books/{bookId}:** Update a book by its ID
    - **DELETE /books/{bookId}:** Delete a book by its ID
    - **GET /books/genre/{genre}:** Get books by genre
    - **GET /books/search/{searchQuery}:** Search books by query
    - **GET /books/unique/{fieldName}:** Get unique values by field name
- **Reviews**
    - **GET /reviews:** Get all reviews
    - **POST /reviews:** Create a new review
    - **GET /reviews/user/{userId}:** Get reviews by user ID
    - **PATCH /reviews/{reviewId}:** Update a review
    - **DELETE /reviews/{reviewId}:** Delete a review
- **Cart**
    - **GET /cart:** Get user's cart
    - **POST /cart/add:** Add a book to cart
    - **POST /cart/reduce:** Reduce book quantity
    - **DELETE /cart/remove:** Remove a book from cart
- **Orders**
    - **GET /orders/{userId}:** Get orders by user ID
    - **POST /orders:** Create a new order
- **Newsletter**
    - **POST /newsletter/add:** Create a new newsletter

![Sprint3-11_page-0001](https://github.com/user-attachments/assets/c3f77fbc-01f2-42e0-8d9a-46a391a14229)

### Authentication
Some endpoints require authentication. Ensure you provide a valid Bearer token in the Authorization header when making requests to protected routes.
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Database Models
![Sprint3-12_page-0001](https://github.com/user-attachments/assets/5fc4fddb-74cf-40f4-b684-e8d632059c34)

