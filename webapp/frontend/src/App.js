import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Login from './components/login.component'
import Vendor from './components/vendor.component'
import ProductList from './components/product-list.component'
import CreateProduct from './components/create-product.component'
import Customer from './components/customer.component'
import SearchProduct from './components/search-product.component'
import SearchProductResult from './components/search-results-customer.component'
import OrderProduct from './components/ordering.component'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" exact component={CreateUser}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/login/vendor" exact component={Vendor}/>
        <Route path="/login/vendor/products" exact component={ProductList}/>
        <Route path="/login/vendor/create" exact component={CreateProduct}/>
        <Route path="/login/customer" exact component={Customer}/>
        <Route path="/login/customer/search-product" exact component={SearchProduct}/>
        <Route path="/login/customer/search-product/result" exact component={SearchProductResult}/>
        <Route path="/login/customer/search-product/result/order" exact component={OrderProduct}/>
        
      </div>
    </Router>
  );
}

export default App;
