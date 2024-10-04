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


// Pre-save middleware to update the book's average rating when a review is added or updated
reviewSchema.pre('save', async function (next) {
  const review = this;

  // Fetch the book associated with this review
  const book = await mongoose.model('Book').findById(review.book);
  
  if (!book) {
    return next(new Error('Book not found'));
  }

  // Get all reviews for this book, including the current one if it's an update
  const reviews = await mongoose.model('Review').find({ book: review.book });

  // If the review is an update, calculate the total sum of ratings,
  // adjusting for the current review
  const totalSum = reviews.reduce((acc, currReview) => acc + currReview.rating, 0);

  // If this is an updated review, subtract the old rating
  if (review.isModified('rating')) {
    const existingReview = await mongoose.model('Review').findById(review._id);
    if (existingReview) {
      totalSum -= existingReview.rating; // Remove the old rating
    }
  }

  // Add the new or updated rating
  const newAverageRating = ((totalSum + review.rating) / (reviews.length + (review.isNew ? 1 : 0))).toFixed(1);

  // Update the book's rating
  book.rating = parseFloat(newAverageRating);
  await book.save();

  next();
});

// Post-remove middleware to update the book's average rating when a review is deleted
reviewSchema.post('remove', async function (review) {
  const book = await mongoose.model('Book').findById(review.book);
  if (!book) {
    return next(new Error('Book not found'));
  }

  // Get all remaining reviews for this book
  const reviews = await mongoose.model('Review').find({ book: review.book });

  // Calculate the new average rating
  const totalSum = reviews.reduce((acc, currReview) => acc + currReview.rating, 0);
  const newAverageRating = reviews.length > 0 ? (totalSum / reviews.length).toFixed(1) : '0.0';

  // Update the book's rating
  book.rating = parseFloat(newAverageRating);
  await book.save();
});

module.exports = mongoose.model("Review", reviewSchema);