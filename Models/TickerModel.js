const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const database = {
    uri: "mongodb://127.0.0.1:27017/",
    name: "textsearch",
    user: "",
    password: "",
    options: {},
};

database.collectionName = 'ticker'

const Ticker = mongoose.model(
    database.collectionName,
    new Schema({
        ticker: String,
        companyName: String,      
        sector:String,
        industry:String,
        mc: Number,
        description:String,        
          
    })
)

module.exports = Ticker