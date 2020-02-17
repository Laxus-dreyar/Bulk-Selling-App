import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';

export default class Customer extends Component{
  
	constructor(props) {
		super(props);
		this.state = {
            username: this.props.location.user
        }
	}

	searchProducts = () => {
		this.props.history.push({
			pathname:'/login/customer/search-product',
			user: this.state.username
		});
	}
  
	viewProduct = () => {
		this.props.history.push({
			pathname:'/login/customer/products',
			user: this.state.username
		});
	}

	render() {
		return (
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
				<li className="navbar-item">
					<button type="button" onClick={this.searchProducts}>Search Products</button>
				</li>
				<li className="navbar-item">
					<button type="button" onClick={this.viewProduct}>View Products</button>
				</li>
				</ul>
			</div>
			<div>
				{this.state.username}
            </div>
			</nav>
			<br/>
		</div>
		)
	}
}