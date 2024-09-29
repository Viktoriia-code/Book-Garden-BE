const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' 
    },
    number: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Delivered" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);