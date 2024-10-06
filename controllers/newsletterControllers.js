const Newsletter = require("../models/newsletterModel");

const createNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscription = new Newsletter({ email });
    await newSubscription.save(); 
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createNewsletter };