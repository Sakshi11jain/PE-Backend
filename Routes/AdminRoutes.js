const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Feedback = require("../Models/Feedback");

const ADMIN_PASSWORD = "111"; // Change this to a secure password

// Middleware to check admin password
const checkAdmin = (req, res, next) => {
  const { password } = req.headers;
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};


// Get All Signed-up Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Get All Feedbacks
router.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}, "createdAt name email feedback");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching feedbacks" });
  }
});

module.exports = router;
