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
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: false },
    hashedPassword: { type: String, required: true },
    email: { 
      type: String, 
      required: [true, "Please provide an email."],
      unique: true 
    },
    isAdmin: { 
      type: Boolean, 
      required: false, 
      default: false, 
    }
  },
  { timestamps: true }
);

// static register method
userSchema.statics.register = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  };
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  };
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  };

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use')
  };

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  };

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  };

  const match = await bcrypt.compare(password, user.hashedPassword)
  if (!match) {
    throw Error('Incorrect password')
  };

  return user;
}

module.exports = mongoose.model("User", userSchema);