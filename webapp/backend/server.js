const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//search products by specific username
userRoutes.route('/login/vendor/products').post(function(req, res) {
    let pro = req.body.username;
    Product.find({username:pro},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

//search products by specific name
userRoutes.route('/login/customer/search-product/result').post(function(req, res) {
    let pro = req.body.name;
    Product.find({name:pro},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new user
userRoutes.route('/addproduct').post(function(req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Check a user in database
userRoutes.route('/check').post(function(req, res) {
    let bod = req.body;
    User.findOne(bod, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
