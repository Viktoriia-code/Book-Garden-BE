const Book = require("../models/bookModel");
const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// GET /books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

// GET /books/:bookId
const getBookById = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const book = await Book.findById(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// GET /books/new
const getNewBooks = async (req, res) => {
  const newBooks = await Book.find({}).sort({ createdAt: -1 }).limit(7);

  res.json(newBooks);
};

// GET /books/topsellers
const getTopBooks = async (req, res) => {
  const topBooks = await Book.find({}).sort({ rating: -1 }).limit(7);

  res.json(topBooks);
};

// GET /books/:genre
const getBooksByGenre = async (req, res) => {
  try {
    const genre = req.params.genre
    const booksByGenre = await Book.find({
      genre: { $regex: genre, $options: 'i' }
    })
    res.json(booksByGenre)
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books by genre" })
  }
}

// GET /books/search/:searchQuery
const getBooksBySearch = async (req, res) => {
  try {
    const query = req.params.searchQuery
    const books = await Book.find({
      $or: [
        { ISBN: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { language: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ]
    });
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: "Searching for books by query failed. Check your query" })
  }
}

// GET /books/unique/:fieldName
const getUniqueByFieldName = async (req, res) => {
  // retrieves unique values in book database by fieldName eq. :fieldName genre
  // returns every unique genre value that is listed in the database
  // (used for store filtering)

  try {
    const fieldName = req.params.fieldName;
    const uniqueValues = await Book.distinct(fieldName);
    res.json(uniqueValues);
  } catch (error) {
    res.status(400).json("Failed to get. Check that your :fieldName is a real field in the book model.")
  }
}

// POST /books
const createBook = async (req, res) => {
  try {
    const newBook = await Book.create({ ...req.body });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: "Failed to create book", error: error.message });
  }
};


// PATCH /books/:bookId
const updateBook = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update book" });
  }
};

// DELETE /books/:bookId
const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const deletedBook = await Book.findOneAndDelete({ _id: bookId });
    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
};

const getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params; // Extract bookId from request parameters

    // Fetch reviews for the book with the given bookId and populate user firstName and lastName
    const reviews = await Review.find({ book: bookId })
      .populate('user', 'firstName lastName') // Populate firstName and lastName from the User model
      .exec();

    // If no reviews are found, return a message
    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this book." });
    }

    // Return the reviews in the response
    return res.status(200).json(reviews);
  } catch (error) {
    // Handle errors and return a 500 response
    return res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  getNewBooks,
  getTopBooks,
  getBooksByGenre,
  getBooksBySearch,
  getUniqueByFieldName,
  createBook,
  updateBook,
  deleteBook,
  getReviewsByBookId,
};