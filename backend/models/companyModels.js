const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    domain : {
        type : String,
        required : true
    },
    logo : {
        type : String,
        required : true
    },
    tagline : {
        type : String,
        unique : true,
        required : true
    },
    contact : {
        email : {
            type : String,
            unique : true,
            required : true
        },
        phone : {
            type : String,
            unique : true,
            required : true
        },
        address : {
            type : String,
            required : true
        }
    },
    primaryColor : {
        type : String,
        required : true
    },
    about : {
        // what is {company} (about)
        what : {
            type : String,
            required : true
        },
        year : {
            type : Number,
            required : true
        }
    }

});

module.exports = mongoose.model("company",companySchema);