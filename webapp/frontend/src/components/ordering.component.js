import React, {Component} from 'react';
import axios from 'axios';

export default class OrderProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.user,
            productname: this.props.location.name,
            vendorname: this.props.location.vendorname,
            searchvalue: 0
        }

        this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeSearchValue(event) {
        this.setState({ searchvalue: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("searching")
        this.props.history.push({
            pathname:'/login/customer/search-product/result',
            user: this.state.username,
            name: this.state.searchvalue
        });

        this.setState({
            searchvalue: 0
        });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.vendorname}
                </div>
                <div>
                    {this.state.productname}
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
                        <input type="submit" value="Search Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}