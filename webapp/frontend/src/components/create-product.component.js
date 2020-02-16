import React, {Component} from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            price: 0,
            name: '',
            quantity:0
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
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
            name: this.state.name
        }

        axios.post('http://localhost:4000/addproduct', newUser)
             .then(res => console.log(res.data));

        this.setState({
            username: '',
            price: 0,
            name: '',
            quantity:0
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
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
                        <input type="submit" value="Create Profuct" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}