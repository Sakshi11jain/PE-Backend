const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String }, // Optional
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST: Save feedback
router.post("/", async (req, res) => {
  const { name, email, feedback } = req.body;
  try {
    if (!name || !feedback) {
      return res.status(400).json({ error: "Name and feedback are required." });
    }
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

module.exports = router;