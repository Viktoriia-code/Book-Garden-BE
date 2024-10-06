const Wishlist = require("../models/wishlistModel");
const Book = require("../models/bookModel"); // Assuming you have a book model
const mongoose = require("mongoose");

// GET /wishlist
const getWishlist = async (req, res) => {
  const user = req.user._id;
  
  try {
    const wishlist = await Wishlist.findOne({ user });

    if (wishlist && wishlist.products && wishlist.products.length > 0) {
      res.status(200).json(wishlist);
    } else {
      res.status(404).json({ message: "wishlist is empty" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve wishlist" });
  }
};


// POST /wishlist/add
const addBookToWishlist = async (req, res) => {
  const { bookId } = req.body;
  const user = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    let wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      wishlist = new Wishlist({ user, products: [] });
    }

    // Check if the book is already in the wishlist
    const existingBookIndex = wishlist.products.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (existingBookIndex >= 0) {
      wishlist.products[existingBookIndex].quantity += 1;
    } else {
      wishlist.products.push({ book: bookId, quantity: 1 });
    }

    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book to wishlist" });
  }
};



// POST /wishlist/remove
const removeBookFromWishlist = async (req, res) => {
  const { bookId } = req.body;
  const user = req.user._id;

  // Validate the book ID
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Find the index of the book in the wishlist
    const bookIndex = wishlist.products.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in wishlist" });
    }

    // Remove the book completely from the wishlist
    wishlist.products.splice(bookIndex, 1);

    // Check if the wishlist is empty after the removal
    if (wishlist.products.length === 0) {
      // If the wishlist is empty, remove it from the database
      await Wishlist.deleteOne({ _id: wishlist._id });
      return res.status(200).json({ message: "Wishlist is empty and has been removed" });
    } else {
      // Otherwise, save the updated wishlist
      await wishlist.save();
      return res.status(200).json(wishlist);
    }
  } catch (error) {
    console.error("Error removing book from wishlist:", error.message);
    res.status(500).json({ message: "Failed to remove book from wishlist", error: error.message });
  }
};

module.exports = {
  getWishlist,
  addBookToWishlist,
  removeBookFromWishlist,
};