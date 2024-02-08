const express = require('express');
const router = require('./route');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const startDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

startDatabase();

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

const checkDatabaseConnection = (req, res, next) => {
  if (!isConnected()) {
    return res.status(500).json({ message: 'Database is not connected' });
  }
  next();
};

app.use(express.json());
app.use(checkDatabaseConnection);
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 