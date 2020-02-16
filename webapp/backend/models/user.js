const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    ty: {
        type: String
    }
});

module.exports = mongoose.model('User', User,'user');