const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        book: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'Book',
        },
        quantity: { 
          type: Number, 
          required: true,
          min: 1,
          default: 1 
        },
        _id: false,
      }
    ] 
  }
);

module.exports = mongoose.model("Cart", CartSchema);