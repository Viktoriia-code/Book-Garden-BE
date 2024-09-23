/* // The data model for user is as follows
{
  "firstName": "Matti",
  "lastName": "Seppänen",
  "password": "M@45mtg$",
  "username": "mattis",
  "email": "matti.seppanen@gmail.com",
  "hashedPassword": "$2b$10$YUY71ppq9N2TmHRMas5Cq.yEZNFXzE1C0mofUmTBhu9h/T2fZBn4y",
}
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, required: [true, "Please provide a password."] },
    hashedPassword: String,
    email: { 
      type: String, 
      required: [true, "Please provide an email."],
      unique: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);