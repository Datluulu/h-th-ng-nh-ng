const express = require('express')
const app = express()
const mongoose = require('mongoose');


app.listen(3000 ,() =>{
    console.log("3000");
});

app.get('/', function (req, res) {
    res.send('Hellosa World')
  })


mongoose.connect('mongodb+srv://abc:dat1211dat@cluster0.fqavjt8.mongodb.net/adxl345?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("connected to mongo");
})
.catch(()=>{
    console.log("no");
})

