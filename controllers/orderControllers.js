const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// GET /orders/:userId
const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Check if the userId in the params matches the authenticated user's ID
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "You are not allowed to see other users' orders" });
    }

    // Find all orders associated with the given user ID
    const orders = await Order.find({ user: userId });

    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "The user doesn't have orders yet." });
    }
  } catch (error) {
    console.error("Error retrieving orders:", error.message);
    res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
  }
};

// POST /orders
const createOrder = async (req, res) => {
  const user = req.user._id;

  try {
    // Find the user's cart
    let cart = await Cart.findOne({ user }).populate('products.book');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Extract data from the cart
    const totalPrice = cart.products.reduce((total, product) => total + product.book.price * product.quantity, 0);

    // Create a new order based on the cart data
    const newOrder = await Order.create({
      user,
      number: `ORD-${Date.now()}`, // Example of generating an order number
      price: totalPrice,
      status: "processing"
    });

    // Once the order is created, delete the user's cart
    await Cart.deleteOne({ user });

    // Respond with the newly created order
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error: error.message });
  }
};

module.exports = {
  getOrdersByUserId,
  createOrder
};