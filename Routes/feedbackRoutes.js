const express = require("express");
const router = express.Router();
const Feedback = require("../Models/Feedback");

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

// GET: Fetch all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching feedbacks" });
  }
});

module.exports = router;
