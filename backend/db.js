const mongoose = require("mongoose");

const mongoUri = "mongodb://127.0.0.1:27017/skynotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        // Call back function
        console.log("Connected to database")
    })
}

module.exports = connectToMongo;