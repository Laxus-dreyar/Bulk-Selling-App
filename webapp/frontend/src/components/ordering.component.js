import React, {Component} from 'react';
import axios from 'axios';

export default class OrderProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.user,
            productname: this.props.location.name,
            vendorname: this.props.location.vendorname,
            searchvalue: 0,
            count: this.props.location.count,
            quantity: this.props.location.quantity,
            status: 'waiting'
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

        if(this.state.count - this.state.searchvalue <=0){
            this.state.status = 'Ready'
        }

        const newOrder = {
            username: this.state.username,
            vendorname: this.state.vendorname,
            quantity: this.state.searchvalue,
            productname: this.state.productname,
            count: this.state.count - this.state.searchvalue,
            status: this.state.status
        }

        const upProduct = {
            username: this.state.username,
            vendorname: this.state.vendorname,
            productname: this.state.productname,
            count: this.state.count - this.state.searchvalue,
            status: this.state.status
        }

        console.log(upProduct.count);
        console.log(upProduct.status);
        axios.post('http://localhost:4000/addorder', newOrder)
             .then(res => console.log(res.data));
        
        
        axios.put('http://localhost:4000/updateorderdb',newOrder)
            .then(res => console.log(res.data));
        
        axios.put('http://localhost:4000/updateorder',upProduct)
            .then(res => console.log(res.data));
        
        alert("Order placed");

        this.setState({
            searchvalue: 0
        });

		this.props.history.push({
			pathname:'/login/customer/vendors-rate',
            user: this.state.username,
            productname: this.state.productname,
            vendorname: this.state.vendorname
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
                            <label>Quantity: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.searchvalue}
                                onChange={this.onChangeSearchValue}
                                />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Order Product" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}