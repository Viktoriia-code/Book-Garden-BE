const Cart = require("../models/cartModel");
const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// GET /cart
const getCart = async (req, res) => {
  const user = req.user._id;
  try {
    const cart = await Cart.findOne({ user }).populate({
      path: 'products.book',
      model: 'Book',
    });

    if (cart && cart.products && cart.products.length > 0) {
      res.status(200).json(cart);  
    } else {
      res.status(404).json({ message: "Cart is empty" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};


// POST /cart/add
const addBookToCart = async (req, res) => {
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

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, products: [] });
    }

    // Check if the book is already in the cart
    const existingBookIndex = cart.products.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (existingBookIndex >= 0) {
      cart.products[existingBookIndex].quantity += 1;
    } else {
      cart.products.push({ book: bookId, quantity: 1 });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book to cart" });
  }
};

// POST /cart/reduce
const reduceBookQuantity = async (req, res) => {
  const { bookId } = req.body;
  const user = req.user._id;

  // Validate the book ID
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the book in the cart
    const bookIndex = cart.products.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }

    // Decrease quantity or remove the book
    if (cart.products[bookIndex].quantity > 1) {
      cart.products[bookIndex].quantity -= 1;
    } else {
      cart.products.splice(bookIndex, 1);
    }

    // Check if the cart is empty after the removal
    if (cart.products.length === 0) {
      // If the cart is empty, remove it from the database
      await Cart.deleteOne({ _id: cart._id });
      return res.status(200).json({ message: "Cart is empty and has been removed" });
    } else {
      // Otherwise, save the updated cart
      await cart.save();
      return res.status(200).json(cart);
    }
  } catch (error) {
    console.error("Error removing book from cart:", error.message);
    res.status(500).json({ message: "Failed to remove book from cart", error: error.message });
  }
};

// POST /cart/remove
const removeBookFromCart = async (req, res) => {
  const { bookId } = req.body;
  const user = req.user._id;

  // Validate the book ID
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the book in the cart
    const bookIndex = cart.products.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }

    // Remove the book completely from the cart
    cart.products.splice(bookIndex, 1);

    // Check if the cart is empty after the removal
    if (cart.products.length === 0) {
      // If the cart is empty, remove it from the database
      await Cart.deleteOne({ _id: cart._id });
      return res.status(200).json({ message: "Cart is empty and has been removed" });
    } else {
      // Otherwise, save the updated cart
      await cart.save();
      return res.status(200).json(cart);
    }
  } catch (error) {
    console.error("Error removing book from cart:", error.message);
    res.status(500).json({ message: "Failed to remove book from cart", error: error.message });
  }
};

module.exports = {
  getCart,
  addBookToCart,
  reduceBookQuantity,
  removeBookFromCart,
};