const express = require('express')
var app = express()

app.get('/ping', (req, res) => {
    res.send('pong');
  });
  app.listen(3002,()=>{
    console.log("this is running on port 3002")
})