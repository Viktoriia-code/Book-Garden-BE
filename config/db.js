require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;
    
    const conn = await mongoose.connect(MONGO_URI);
    if (process.env.NODE_ENV !== "test") {
      console.log(`MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    };
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;