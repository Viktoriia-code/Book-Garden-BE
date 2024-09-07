/* // The data title for book is as follows
{
  id: 1,
  title: "The Great Gatsby",       // required field
  author: "F. Scott Fitzgerald",   // required field
  genre: "Fiction",                // required field
  rating: 5,                       // optional field
  year: 2024,                      // required field
  publisher: "Charles Scribner's Sons",  // optional field
  ISBN: "9780743273565",           // optional field
  binding: "Hardback",             // optional field
  pages: 218,                      // optional field
  language: "English",             // required field
}
 */

let bookArray = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    rating: 5,
    year: 2024,
    publisher: "Charles Scribner's Sons",
    ISBN: "9780743273565",
    binding: "Hardback",
    pages: 218,
    language: "English"
  },
  {
    id: 2,
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    genre: "Classic",
    rating: 5,
    year: 2024,
    publisher: "Example Publisher",
    ISBN: "1234567890123",
    binding: "Hardback",
    pages: 864,
    language: "English"
  },
];

let nextId = 3;

function getAll() {
  return bookArray;
}

function addOne(bookData) {
  // Check if any parameter is empty or undefined
  const { title, author, genre, year, language } = bookData;
  if (!title || !author || !genre || !year || !language ) {
    return false;
  }

  const newItem = {
    id: nextId++,
    title,
    author,
    genre,
    year,
    language,
    rating: 0,
    pages: 0,
    publisher: "",
    ISBN: "",
    binding: "",
    ...bookData,
  };

  bookArray.push(newItem);
  return newItem;
}

function findById(id) {
  const numericId = Number(id);
  const item = bookArray.find((item) => item.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const book = findById(id);
  if (book) {
    Object.assign(book, updatedData); // Update properties using Object.assign
    return book;
  }
  return false;
}

function deleteOneById(id) {
  const item = findById(id);
  if (item) {
    const initialLength = bookArray.length;
    bookArray = bookArray.filter((item) => item.id !== Number(id));
    return bookArray.length < initialLength; // Indicate successful deletion if the length has decreased
  }
  return false; // Return false if the item was not found
}

if (require.main === module) {
  // Test 1: Add a valid book
  let result = addOne({
    title: "Test book",
    author: "Test author",
    genre: "Test genre",
    year: 2021,
    language: "English"
  });
  console.log("Test 1 result:", result);
  console.assert(bookArray.length === 3, "Test 1 Failed: Should add one book");

  // Test 2: Add another valid book
  result = addOne({
    title: "Test book 2",
    author: "Test author 2",
    genre: "Test genre 2",
    year: 2022,
    language: "Spanish"
  });
  console.log("Test 2 result:", result);
  console.assert(bookArray.length === 4, "Test 2 Failed: Should add another book");

  // Test getAll function
  console.log("getAll called:", getAll());

  // Test findById function
  console.log("findById called:", findById(1));

  // Test updateOneById function
  console.log("updateOneById called:", updateOneById(1, { genre: "Updated genre", author: "Updated author" }));
  console.log("findById called after item updated:", findById(1));

  // Test deleteOneById function
  console.log("deleteOneById called:", deleteOneById(1));
  console.log("findById called after item deleted:", findById(1));
}

const Book = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = Book;