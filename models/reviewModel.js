/* // The data model for review is as follows
{
  "userId": "12345",          // A unique identifier for the user who wrote the review
  "bookId": "54321",          // A unique identifier for the book that the revies is about
  "comment": "The product exceeded my expectations. I would highly recommend it to anyone looking for something durable and reliable.", // The actual review comment or feedback from the user
  "rating": 5                  // Rating given by the user (e.g., 1-5 stars)
  "createdAt": "2024-09-14T15:58:38.669Z",
  "updatedAt": "2024-09-14T15:58:38.669Z",
}
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Referencing the User model
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Book', // Referencing the Book model
    },
    comment: {
      type: String,
      required: [true, "Please provide a comment."],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required to evaluate the book."],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);