import React, {Component} from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.user,
            price: 0,
            name: '',
            status: 'waiting',
            quantity:0,
            count:0
        }

        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            price: this.state.price,
            quantity: this.state.quantity,
            name: this.state.name,
            status: this.state.status,
            count: this.state.quantity
        }
        console.log(newUser.count);
        axios.post('http://localhost:4000/addproduct', newUser)
             .then(res => console.log(res.data));

        this.setState({
            price: 0,
            name: '',
            status: 'waiting',
            quantity:0,
            count:0
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <label>quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
                <div>
                    {this.state.username}
                </div>
            </div>
        )
    }
}