import React, {Component} from 'react';
import axios from 'axios';

export default class RateProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.user,
            productname: this.props.location.name,
            vendorname: this.props.location.vendorname,
            searchvalue: 0,
            ratingsum: 10,
            ratingnumber: 5,
            rating: 5,
            temp: '',
            rew: 'not changed'
        }

        this.onChangeTempValue = this.onChangeTempValue.bind(this);
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
    
    onChangeTempValue(event) {
        this.setState({ temp: event.target.value });
    }

    onChangeSearchValue(event) {
        this.setState({ searchvalue: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const newProduct = {
            username: this.state.username,
            vendorname: this.state.vendorname,
            quantity: this.state.searchvalue,
            productname: this.state.productname,
            ratingsum: this.state.ratingsum,
            ratingnumber: this.state.ratingnumber,
            rating: this.state.rating,
            status: this.state.status,
            rew: this.state.rew
        }

        axios.post('http://localhost:4000/login/customer/products-rating',newProduct)
             .then(response => {
                 console.log(response.data);
                 this.setState({
                     ratingsum: response.data.ratingsum,
                     rating: response.data.rating,
                     ratingnumber: response.data.ratingnumber,
                     rew: response.data.review
                    });
            
        
            console.log(this.state.ratingsum);
            console.log(this.state.rating);
            console.log(this.state.ratingnumber);
            console.log(this.state.rew);
            this.setState({
                ratingsum : Number(this.state.ratingsum) + Number(this.state.searchvalue)
            });
            console.log(this.state.ratingsum);
            this.setState({
                ratingnumber : this.state.ratingnumber + 1
            });
            console.log(this.state.ratingnumber);
            this.setState({
                rating : this.state.ratingsum/this.state.ratingnumber
            });
            this.setState({
                rew : this.state.rew + "     ,      " + this.state.temp
            });
            console.log(this.state.rating);
            console.log(this.state.rew);
            const newOrder = {
                username: this.state.username,
                vendorname: this.state.vendorname,
                quantity: this.state.searchvalue,
                productname: this.state.productname,
                ratingsum: this.state.ratingsum,
                ratingnumber: this.state.ratingnumber,
                rating: this.state.rating,
                status: this.state.status,
                rew: this.state.rew
            }
            
            console.log(newOrder.rating);
            console.log(newOrder.rew);
            axios.put('http://localhost:4000/rateorderdb',newOrder)
                .then(res => console.log(res.data));

            alert("Rating given");

            this.setState({
                searchvalue: 0
            });

            this.props.history.push({
                pathname:'/login/customer',
                user: this.state.username
            });
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
                    <div>
                        VENDORNAME: {this.state.vendorname}
                    </div>
                    <div>
                        PRODUCTNAME: {this.state.productname}
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Review: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.temp}
                                onChange={this.onChangeTempValue}
                                />  
                        </div>
                        <div className="form-group">
                            <label>Rating:</label>
                            <select type="text" value={this.state.searchvalue} onChange={this.onChangeSearchValue}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Rate" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}