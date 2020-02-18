const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    username: {
        type: String
    },
    name: {
        type: String
    },
    status: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    count: {
        type: Number
    },
    ratingsum: {
        type: Number
    },
    ratingnumber: {
        type: Number
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('Products', Product,'products');