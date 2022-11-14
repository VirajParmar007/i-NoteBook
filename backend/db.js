const mongoose = require('mongoose');
 const mongoURI = "mongodb://localhost:27017/i-Notebook"
 const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo sucessfuly")
    })
 }
 module.exports = connectToMongo