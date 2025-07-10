const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    domain : {
        type : String,
        unique : true,
        required : true
    }
});

module.exports = mongoose.model("domain",domainSchema);