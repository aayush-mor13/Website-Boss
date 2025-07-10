const mongoose = require('mongoose');

const companyUserSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    companyUserRole : {
        type : String,
        enum : ['adminCompany','userCompany'],
        default : 'userCompany',
        required : true
    },
    companyId : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('companyUser',companyUserSchema);