import React, {Component} from 'react';
import axios from 'axios';

export default class ProdList extends Component {
    
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
            Quantity: 0
        };
        axios.post('http://localhost:4000/login/vendor/products',newProduct)
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
                            <th>Status of Product</th>
                            <th>Quantity Left to Order</th>
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