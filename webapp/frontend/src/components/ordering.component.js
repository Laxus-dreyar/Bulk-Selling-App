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
            quantity: this.location.quantity,
            status: 'waiting'
        }

        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeSearchValue(event) {
        this.setState({ searchvalue: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newOrder = {
            username: this.state.username,
            vendorname: this.state.vendorname,
            quantity: this.state.searchvalue,
            productname: this.state.productname
        }

        if(this.state.count - this.state.searchvalue <=0){
            this.state.status = 'Ready'
        }

        const upProduct = {
            username: this.state.username,
            vendorname: this.state.vendorname,
            productname: this.state.productname,
            count: this.state.count - this.state.searchvalue,
            status: this.state.status
        }

        console.log(upProduct.count);
        axios.post('http://localhost:4000/addorder', newOrder)
             .then(res => console.log(res.data));
        
        axios.put('http://localhost:4000/updateorder',upProduct)
        this.setState({
            searchvalue: 0
        });

        alert("Order placed");

		this.props.history.push({
			pathname:'/login/customer',
			user: this.state.username
		});
    }

    render() {
        return (
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
        )
    }
}