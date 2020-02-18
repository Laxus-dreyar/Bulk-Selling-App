import React, {Component} from 'react';
import axios from 'axios';

export default class WaitProductList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            username: this.props.location.user
        }
    }

    componentDidMount() {
        const newProduct = {
            username: this.state.username,
            name: '',
            Price: 0,
            status: 'waiting',
            Quantity: 0
        };
        axios.post('http://localhost:4000/login/vendor/productswait',newProduct)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    showWaitProducts = () => {
		this.props.history.push({
			pathname:'/login/vendor/waitproducts',
			user: this.state.username
		});
    }
    
    showReadyProducts = () => {
		this.props.history.push({
			pathname:'/login/vendor/readyproducts',
			user: this.state.username
		});
	}

	showCanceledProducts = () => {
		this.props.history.push({
			pathname:'/login/vendor/canceledproducts',
			user: this.state.username
		});
	}

	showDispatchedProducts = () => {
		this.props.history.push({
			pathname:'/login/vendor/dispatchedproducts',
			user: this.state.username
		});
    }
    
    showProducts = () => {
		this.props.history.push({
			pathname:'/login/vendor/products',
			user: this.state.username
		});
	}
  
	createProduct = () => {
		this.props.history.push({
			pathname:'/login/vendor/create',
			user: this.state.username
		});
    }
    
    cancelProduct = (name,count1) => {
        const upProduct = {
            vendorname: this.state.username,
            productname: name,
            count: count1,
            status: 'canceled',
        }
        axios.put('http://localhost:4000/updateorderdb',upProduct)
            .then(res => console.log(res.data));
        
        axios.put('http://localhost:4000/updateorder',upProduct)
            .then(res => console.log(res.data));
        alert("canceled");
        this.props.history.push({
			pathname:'/login/vendor',
			user: this.state.username
		});
    }

    render() {
        return (
            <div>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <button type="button" onClick={this.showProducts}>Show All Products</button>
                        </li>
                        <li className="navbar-item">
                            <button type="button" onClick={this.showWaitProducts}>Show Waiting Products</button>
                        </li>
                        <li>
                            <button type="button" onClick={this.showReadyProducts}>Show Ready Products</button>
                        </li>
                        <li>
                            <button type="button" onClick={this.showDispatchedProducts}>Show Dispatched Products</button>
                        </li>
                        <li>
                            <button type="button" onClick={this.showCanceledProducts}>Show Canceled Products</button>
                        </li>
                        <li className="navbar-item">
                            <button type="button" onClick={this.createProduct}>Create Products</button>
                        </li>
                        </ul>
                    </div>
                    <div>
                        {this.state.username}
                    </div>
                    </nav>
                    <br/>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Status of Product</th>
                                <th>Quantity Left to Order</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.products.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser.username}</td>
                                        <td>{currentUser.name}</td>
                                        <td>{currentUser.price}</td>
                                        <td>{currentUser.quantity}</td>
                                        <td>{currentUser.status}</td>
                                        <td>{currentUser.count}</td>
                                        <td>{currentUser.rating}</td>
                                        <td><button type="button" onClick={() => this.cancelProduct(currentUser.name,currentUser.count)}>Cancel</button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}