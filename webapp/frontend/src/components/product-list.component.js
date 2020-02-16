import React, {Component} from 'react';
import axios from 'axios';

export default class ProdList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/login/vendor/products')
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