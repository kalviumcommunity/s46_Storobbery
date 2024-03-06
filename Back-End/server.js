const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const { User, Data } = require('./model');
const path = require('path'); // Import path module
const router = require("./route");

const app = express();
const port = process.env.PORT || 5000; // Use process.env.PORT for Heroku or default to 5000

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", router); // Your API routes

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Serve index.html for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// MongoDB connection
mongoose.connect(process.env.mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
