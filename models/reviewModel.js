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

let reviewArray = [];

let nextId = 1;

function getAll() {
  return reviewArray;
}

function addOne(reviewData) {
  // Check if any parameter is empty or undefined
  const { user_id, book_id, comment, rating } = reviewData;
  if (!user_id || !book_id || !comment || !rating ) {
    return false;
  }

  const newItem = {
    id: nextId++,
    ...reviewData,
  };

  reviewArray.push(newItem);
  return newItem;
}

function findById(id) {
  const numericId = Number(id);
  const item = reviewArray.find((item) => item.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const review = findById(id);
  if (review) {
    Object.assign(review, updatedData); // Update properties using Object.assign
    return review;
  }
  return false;
}

function deleteOneById(id) {
  const item = findById(id);
  if (item) {
    const initialLength = reviewArray.length;
    reviewArray = reviewArray.filter((item) => item.id !== Number(id));
    return reviewArray.length < initialLength; // Indicate successful deletion if the length has decreased
  }
  return false; // Return false if the item was not found
}

if (require.main === module) {
  // Test 1: Add a valid review
  let result = addOne({
    user_id: "12345",
    book_id: "54321",
    comment: "Test comment 1",
    rating: 5 
  });
  console.log("Test 1 result:", result);
  console.assert(reviewArray.length === 1, "Test 1 Failed: Should add one review");

  // Test 2: Add another valid review
  result = addOne({
    user_id: "12345",
    book_id: "56789",
    comment: "Test comment 2",
    rating: 4
  });
  console.log("Test 2 result:", result);
  console.assert(reviewArray.length === 2, "Test 2 Failed: Should add another review");

  // Test getAll function
  console.log("getAll called:", getAll());

  // Test findById function
  console.log("findById called:", findById(1));

  // Test updateOneById function
  console.log("updateOneById called:", updateOneById(1, { rating: 1 }));
  console.log("findById called after item updated:", findById(1));

  // Test deleteOneById function
  console.log("deleteOneById called:", deleteOneById(1));
  console.log("findById called after item deleted:", findById(1));
}

const Review = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = Review;