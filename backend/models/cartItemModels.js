const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    userId:{
        type : String,
        required : true
    },
    companyId:{
        type : String,
        required : true
    },
    productId:{
        type : String,
        required : true
    },
    qty:{
        type: Number,
        required: true,
        min: 1
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("cartItem",cartItemSchema);