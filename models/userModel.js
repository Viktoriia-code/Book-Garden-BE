require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

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
    favorites: { 
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], // Array of favorite book IDs
      default: [] 
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
userSchema.statics.register = async function(firstName, lastName, username, email, password) {
  // validation
  if (!email || !password || !firstName || !lastName || !username) {
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

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ 
    firstName,
    lastName,
    username,
    email, 
    hashedPassword: hash });

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