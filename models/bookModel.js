const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: false, default: 0 }, // Store average rating
    year: { type: Number, required: true },
    publisher: { type: String, required: false },
    ISBN: { type: String, required: false },
    binding: { type: String, required: false },
    pages: { type: Number, required: false },
    language: { type: String, required: true },
    image: { type: String, required: false },
    price: { type: Number, required: true }
  },  
  { timestamps: true }
);  

module.exports = mongoose.model("Book", bookSchema);