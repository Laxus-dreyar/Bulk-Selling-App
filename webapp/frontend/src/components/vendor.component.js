import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import ProductList from './product-list.component'
import CreateProduct from './create-product.component'


function Vendor() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/login/vendor/products" className="navbar-brand">Vendor</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/login/vendor/products" className="nav-link">Products</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login/vendor/create" className="nav-link">Create Product</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br/>

        <Route path="/login/vendor/products" exact component={ProductList}/>
        <Route path="/login/vendor/create" exact component={CreateProduct}/>
        
      </div>
    </Router>
  );
}

export default Vendor;
