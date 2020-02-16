import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';

export default class Vendor extends Component{
  
	constructor(props) {
		super(props);
		this.state = {
            username: ''
        }
	}

	showProducts = () => {
		this.props.history.push("/login/vendor/products");
	}
  
	createProduct = () => {
		this.props.history.push('/login/vendor/create');
	}

	render() {
		return (
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
				<li className="navbar-item">
					<button type="button" onClick={this.showProducts}>Show Products</button>
				</li>
				<li className="navbar-item">
					<button type="button" onClick={this.createProduct}>Create Products</button>
				</li>
				</ul>
			</div>
			</nav>
			<br/>
		</div>
		)
	}
}