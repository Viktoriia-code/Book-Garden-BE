/* // The data model for user is as follows
{
  "firstName": "Matti",
  "lastName": "Seppänen",
  "password": "M@45mtg$",
  "username": "mattis",
  "email": "matti.seppanen@gmail.com"
}
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);