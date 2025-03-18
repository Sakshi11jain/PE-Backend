const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const faqData = require('./faqData.json');
const mcq = require('./mcq.json')

// Import Routes
const AuthRouter = require("./Routes/AuthRouter");
const feedbackRoutes = require("./Routes/Feedback");
const questionsRoutes = require("./Routes/questions");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//faqData
app.get('/api/faqs', (req, res) => {
  res.json(faqData);
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// API Routes
app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.use("/auth", AuthRouter);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/questions", questionsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//mcq questions
app.get('/api/mcq', (req, res) => {
  res.json(mcq);
});

