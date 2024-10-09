const Newsletter = require("../models/newsletterModel");
const validator = require('validator');

const createNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please provide a valid email." });
  };

  try {
    const newSubscription = new Newsletter({ email });
    await newSubscription.save(); 
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createNewsletter };