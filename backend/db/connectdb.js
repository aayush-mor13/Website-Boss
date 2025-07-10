const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

const connectdb = async()=>{
    try{
        await mongoose.connect(url);
        console.log("Successfully connected to Database");
    }
    catch(error){
        console.error(`Error connecting to database : ${error}`);
    }
}

module.exports = connectdb;