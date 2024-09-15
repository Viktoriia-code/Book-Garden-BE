/* // The data model for review is as follows
{
  "user_id": "12345",          // A unique identifier for the user who wrote the review
  "book_id": "54321",          // A unique identifier for the book that the revies is about
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
    user_id: { type: String, required: true },
    book_id: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);