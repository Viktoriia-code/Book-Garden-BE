const bcrypt = require('bcrypt');

const users = [
  {
    "firstName": "Matti",
    "lastName": "Seppänen",
    "hashedPassword": bcrypt.hashSync("M@45mtg$", 10),
    "username": "mattis",
    "email": "matti.seppanen@gmail.com"
  },
  {
    "firstName": "Sara",
    "lastName": "Koskinen",
    "hashedPassword": bcrypt.hashSync("S@r4Pwd1!", 10),
    "username": "sarako",
    "email": "sara.koskinen@gmail.com"
  },
  {
    "firstName": "John",
    "lastName": "Doe",
    "hashedPassword": bcrypt.hashSync("J0hnD03#", 10),
    "username": "johndoe",
    "email": "john.doe@gmail.com"
  },
  {
    "firstName": "Amina",
    "lastName": "Hassan",
    "hashedPassword": bcrypt.hashSync("Amin@123", 10),
    "username": "aminah",
    "email": "amina.hassan@gmail.com"
  },
  {
    "firstName": "Lucas",
    "lastName": "Niemi",
    "hashedPassword": bcrypt.hashSync("Luc@sL23", 10),
    "username": "lucasn",
    "email": "lucas.niemi@gmail.com"
  }
];

module.exports = users;