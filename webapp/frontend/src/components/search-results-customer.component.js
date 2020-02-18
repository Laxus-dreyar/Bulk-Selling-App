import React, {Component} from 'react';
import axios from 'axios';

export default class ProdList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            username: this.props.location.user,
            name: this.props.location.name
        }
    }

    orderProduct = (username,quantity1,count1) => {
        this.props.history.push({
            pathname:'/login/customer/search-product/result/order',
            user: this.state.username,
            name: this.state.name,
            vendorname: username,
            quantity: quantity1,
            count: count1
        });
    }

    componentDidMount() {
        const newProduct = {
            username: '',
            name: this.state.name,
            Price: 0,
            Quantity: 0
        };
        axios.post('http://localhost:4000/login/customer/search-product/result',newProduct)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Quantity Left to order</th>
                            <th>Status of Product</th>
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
                                    <td>{currentUser.count}</td>
                                    <td>{currentUser.status}</td>
                                    <td>{currentUser.rating}</td>
                                    <td><button type="button" onClick={() => this.orderProduct(currentUser.username,currentUser.quantity,currentUser.count)}>Order</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}