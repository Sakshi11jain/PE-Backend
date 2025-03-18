const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  expectedAnswer: { type: String, required: true },
  feedbackCriteria: { type: String, required: true },
});

module.exports = (collectionName) => mongoose.model(collectionName, questionSchema, collectionName);
