const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    username: {
        type: String
    },
    productname: {
        type: String
    },
    vendorname: {
        type: String
    },
    quantity: {
        type: Number
    },
    status: {
        type: String
    },
    count: {
        type: Number
    }
});

module.exports = mongoose.model('Orders', Product,'orders');