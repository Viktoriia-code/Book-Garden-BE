const colors = require('colors');
const users = require('./data/users.js');
const books = require('./data/books.js');
const reviews = require('./data/reviews.js');
const User = require('./models/userModel.js');
const Book = require('./models/bookModel.js');
const Review = require('./models/reviewModel.js');
const Cart = require('./models/cartModel.js');
const Order = require('./models/orderModel.js');
const connectDB = require("./config/db");

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdBooks = await Book.insertMany(books);

    const sampleReviews = reviews.map(review => {
      return {
        ...review,
        user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id,
        book: createdBooks[Math.floor(Math.random() * createdBooks.length)]._id,
      };
    });

    await Review.insertMany(sampleReviews);

    // Now update the ratings for the books based on the inserted reviews
    for (const book of createdBooks) {
      const reviewsForBook = await Review.find({ book: book._id });
      const totalSum = reviewsForBook.reduce((acc, currReview) => acc + currReview.rating, 0);
      const newAverageRating = reviewsForBook.length > 0 ? (totalSum / reviewsForBook.length).toFixed(1) : 0;

      // Update the book's rating
      await Book.findByIdAndUpdate(book._id, { rating: parseFloat(newAverageRating) }, { new: true });
    }

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
};