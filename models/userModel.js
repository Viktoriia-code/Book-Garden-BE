/* // The data model for user is as follows
{
  "firstName": "Matti",
  "lastName": "Seppänen",
  "password": "M@45mtg$",
  "username": "mattis",
  "email": "matti.seppanen@gmail.com"
}
 */

let userArray = [];

let nextId = 1;

function getAll() {
  return userArray;
}

function addOne(userData) {
  // Check if any parameter is empty or undefined
  const { firstName, lastName, password, username, email } = userData;
  if (!firstName || !lastName || !password || !username || !email ) {
    return false;
  }

  const newItem = {
    id: nextId++,
    ...userData,
  };

  userArray.push(newItem);
  return newItem;
}

function findById(id) {
  const numericId = Number(id);
  const item = userArray.find((item) => item.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const user = findById(id);
  if (user) {
    Object.assign(user, updatedData); // Update properties using Object.assign
    return user;
  }
  return false;
}

function deleteOneById(id) {
  const item = findById(id);
  if (item) {
    const initialLength = userArray.length;
    userArray = userArray.filter((item) => item.id !== Number(id));
    return userArray.length < initialLength; // Indicate successful deletion if the length has decreased
  }
  return false; // Return false if the item was not found
}

if (require.main === module) {
  // Test 1: Add a valid user
  let result = addOne({
    firstName: "Matti",
    lastName: "Seppänen",
    password: "M@45mtg$",
    username: "mattis",
    email: "matti.seppanen@gmail.com"
  });
  console.log("Test 1 result:", result);
  console.assert(userArray.length === 1, "Test 1 Failed: Should add one user");

  // Test 2: Add another valid user
  result = addOne({
    firstName: "Anna",
    lastName: "Kärkkäinen",
    password: "A#12xyz!",
    username: "anna_k",
    email: "anna.karkkainen@example.com",
  });
  console.log("Test 2 result:", result);
  console.assert(userArray.length === 2, "Test 2 Failed: Should add another user");

  // Test getAll function
  console.log("getAll called:", getAll());

  // Test findById function
  console.log("findById called:", findById(1));

  // Test updateOneById function
  console.log("updateOneById called:", updateOneById(1, { username: "MattiMatti" }));
  console.log("findById called after item updated:", findById(1));

  // Test deleteOneById function
  console.log("deleteOneById called:", deleteOneById(1));
  console.log("findById called after item deleted:", findById(1));
}

const User = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = User;