const Book = require("../models/bookModel");

// GET /books
const getAllBooks = (req, res) => {
  const books = Book.getAll();
  res.json(books);
};

// POST /books
const createBook = (req, res) => {
  console.log("body",req.body);
  
  const newBook = Book.addOne({ ...req.body }); // Spread the req.body object

  if (newBook) {
    res.json(newBook);
  } else {
    // Handle error (e.g., failed to create book)
    res.status(500).json({ message: "Failed to create book" });
  }
};

// GET /books/:bookId
const getBookById = (req, res) => {
  const bookId = req.params.bookId;
  const book = Book.findById(bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// PUT /books/:bookId
const updateBook = (req, res) => {
  const bookId = req.params.bookId;
  const updatedBook = Book.updateOneById(bookId, { ...req.body }); // Spread the req.body object

  if (updatedBook) {
    res.json(updatedBook);
  } else {
    // Handle update failure (e.g., book not found)
    res.status(404).json({ message: "Book not found" });
  }
};

// DELETE /books/:bookId
const deleteBook = (req, res) => {
  const bookId = req.params.bookId;
  const isDeleted = Book.deleteOneById(bookId);

  if (isDeleted) {
    res.json({ message: "Book deleted successfully" });
  } else {
    // Handle deletion failure (e.g., book not found)
    res.status(404).json({ message: "Book not found" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};