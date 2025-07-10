const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'admin',
        required : true
    }
})

module.exports = mongoose.model('user',userSchema);