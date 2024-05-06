
const router = require("./route");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const {User,Data} = require('./model')
const express = require("express")
const app = express()
const port = 4000;


const startDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

startDatabase();

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

const checkDatabaseConnection = (req, res, next) => {
  if (!isConnected()) {
    return res.status(500).json({ message: "Database is not connected" });
    next();
  }
};
app.use(cors())
app.use(express.json());
// app.use(checkDatabaseConnection);
app.use("/", router);

app.get("/", (req, res) => {  
  res.json({message: 'MongoDB',
  database: isConnected() ? 'connected' : 'disconnected'});
  // res.json({ hello: "hello" });
});

app.get("/ping", (req, res) => {
  res.send("Welcome to asap project")
})

app.get('/api/incidents', async (req, res) => {
  try {
    const incidents = await Data.find();
    res.json(incidents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.listen(port,()=>{
  console.log(`Server is running on port ${port}.. `)
})


