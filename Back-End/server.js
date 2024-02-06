const express = require('express')
const  mongoose  = require('mongoose')
require('dotenv').config()
var app = express()
const startDatabase = async () => {

  try{
    mongoose.connect(process.env.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true })
  }
  catch{
    console.log(err)
  }
  }
  startDatabase()
  const isConnected = () => {
    return mongoose.connection.readyState === 1;
  }
  
app.get('/', (req, res) => {
    res.json({message: 'MongoDB',
    database: isConnected() ? 'connected' : 'disconnected'});
  });
app.listen(3000,()=>{
  console.log("running on port 3000")
})
