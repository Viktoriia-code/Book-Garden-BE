const colors = require('colors');
const users = require('./data/users.js');
const books = require('./data/books.js');
const User = require('./models/userModel.js');
const Book = require('./models/bookModel.js');
const Review = require('./models/reviewModel.js');
const connectDB = require("./config/db");

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await Review.deleteMany();

    await User.insertMany(users);
    await Book.insertMany(books);

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