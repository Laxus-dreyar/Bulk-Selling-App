import React, {Component} from 'react';
import axios from 'axios';

export default class SearchProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.user,
            searchvalue: ''
        }

        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onChangeSearchValue(event) {
        this.setState({ searchvalue: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.history.push({
            pathname:'/login/customer/search-product/result',
            user: this.state.username,
            name: this.state.searchvalue
        });

        this.setState({
            searchvalue: ''
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
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Search: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.searchvalue}
                                onChange={this.onChangeSearchValue}
                                />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Search Product" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}