/* // The data title for book is as follows
{
  id: 1,
  title: "The Great Gatsby",       // required field
  author: "F. Scott Fitzgerald",   // required field
  genre: "Fiction",                // required field
  description: "Sample text",      // required field
  rating: 5,                       // optional field
  year: 2024,                      // required field
  publisher: "Charles Scribner's Sons",  // optional field
  ISBN: "9780743273565",           // optional field
  binding: "Hardback",             // optional field
  pages: 218,                      // optional field
  language: "English",             // required field
  image: "/images/the-great-gatsby.jpg",  // optional field
  price: 35.50,                    // required field
}
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: false },
    year: { type: Number, required: true },
    publisher: { type: String, required: false },
    ISBN: { type: String, required: false },
    binding: { type: String, required: false },
    pages: { type: Number, required: false },
    language: { type: String, required: true },
    image: { type: String, required: false },
    price: { type: Number, required: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);