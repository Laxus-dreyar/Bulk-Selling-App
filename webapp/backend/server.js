const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');
let Order = require('./models/orders');

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

//search waiting products
userRoutes.route('/login/vendor/productswait').post(function(req, res) {
    let pro = req.body.username;
    let stat = req.body.status;
    console.log(stat);
    Product.find({username:pro ,status:stat},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

//search rating products
userRoutes.route('/login/customer/products-rating').post(function(req, res) {
    let pro = req.body.vendorname;
    let pname = req.body.productname;
    console.log(pname);
    Product.findOne({username:pro ,name:pname},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

//search rating vendors
userRoutes.route('/login/customer/vendor-rating').post(function(req, res) {
    let pro = req.body.vendorname;
    Product.findOne({username:pro},function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
});

//search ordered products by specific username
userRoutes.route('/login/customer/products').post(function(req, res) {
    let pro = req.body.username;
    Order.find({username:pro},function(err, orders) {
        if (err) {
            console.log(err);
        } else {
            res.json(orders);
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

// Adding a new product
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

// Adding a new order
userRoutes.route('/addorder').post(function(req, res) {
    let order = new Order(req.body);
    order.save()
        .then(product => {
            res.status(200).json({'Order': 'Order added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

//Update order in database based on quantity
userRoutes.route('/updateorder').put(function(req, res) {
    let vendorname = req.body.vendorname;
    let productname = req.body.productname;
    let quantity = req.body.count;
    let status = req.body.status;
    Product.updateOne({username: `${vendorname}`,name: `${productname}`},{count: `${quantity}`,status: `${status}`},function(err,products){
        if (err) {
            console.log("not updated");
        } else {
            res.json(products);
        }
    })
});

//Rate orders in products db
userRoutes.route('/rateorderdb').put(function(req, res) {
    let vendorname1 = req.body.vendorname;
    let productname1 = req.body.productname;
    let ratsum = req.body.ratingsum;
    let ratnum = req.body.ratingnumber;
    let rat = req.body.rating;
    console.log(rat);
    Product.updateOne({username: `${vendorname1}`,name: `${productname1}`},{ratingsum: `${ratsum}`,ratingnumber: `${ratnum}`,rating: `${rat}`},function(err,orders){
        if (err) {
            console.log("not updated");
        } else {
            res.json(orders);
        }
    })
});

//Rate vendors in products db
userRoutes.route('/ratevendordb').put(function(req, res) {
    let vendorname1 = req.body.vendorname;
    let productname1 = req.body.productname;
    let ratsum = req.body.ratingsum;
    let ratnum = req.body.ratingnumber;
    let rat = req.body.rating;
    console.log(rat);
    Product.updateMany({username: `${vendorname1}`},{vratingsum: `${ratsum}`,vratingnumber: `${ratnum}`,vrating: `${rat}`},function(err,orders){
        if (err) {
            console.log("not updated");
        } else {
            res.json(orders);
        }
    })
});

//Update order in orders db
userRoutes.route('/updateorderdb').put(function(req, res) {
    let vendorname1 = req.body.vendorname;
    let productname1 = req.body.productname;
    let quantity1 = req.body.count;
    let status = req.body.status;
    Order.updateMany({vendorname: `${vendorname1}`,productname: `${productname1}`},{count: `${quantity1}`,status: `${status}`},function(err,orders){
        if (err) {
            console.log("not updated");
        } else {
            res.json(orders);
        }
    })
});

//Update order in orders db via specific use
userRoutes.route('/editorder').put(function(req, res) {
    let vendorname = req.body.vendorname;
    let productname1 = req.body.productname;
    let quantity = req.body.count;
    let status = req.body.status;
    let quantity2 = req.body.quant;
    let user = req.body.username;
    let initia = req.body.inti
    Order.updateOne({username: `${user}`,productname: `${productname1}`, quantity: `${initia}`},{count: `${quantity}`,status: `${status}`,quantity: `${quantity2}`},function(err,products){
        if (err) {
            console.log("not updated");
        } else {
            res.json(products);
        }
    })
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
