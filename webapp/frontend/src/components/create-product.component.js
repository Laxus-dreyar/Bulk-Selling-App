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
            count:0,
            ratingsum:0,
            ratingnumber:0
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
    
    showProducts = () => {
		this.props.history.push({
			pathname:'/login/vendor/products',
			user: this.state.username
		});
	}
  
	createProduct = () => {
		this.props.history.push({
			pathname:'/login/vendor/create',
			user: this.state.username
		});
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            price: this.state.price,
            quantity: this.state.quantity,
            name: this.state.name,
            status: this.state.status,
            count: this.state.quantity,
            ratingsum: this.state.ratingsum,
            ratingnumber: this.state.ratingnumber,
            rating: 0,
            vratingsum: 0,
            vratingnumber: 0,
            vrating: 0,
        }
        console.log(newUser.count);
        axios.post('http://localhost:4000/addproduct', newUser)
             .then(res => console.log(res.data));

        this.setState({
            price: 0,
            name: '',
            status: 'waiting',
            quantity:0,
            count:0,
            ratingsum:0,
            ratingnumber:0
        });
        alert("Product added");
    }

    render() {
        return (
            <div>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <button type="button" onClick={this.showProducts}>Show All Products</button>
                        </li>
                        <li className="navbar-item">
                            <button type="button" onClick={this.createProduct}>Create Products</button>
                        </li>
                        </ul>
                    </div>
                    <div>
                        {this.state.username}
                    </div>
                    </nav>
                    <br/>
                </div>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={this.onChangeName}
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
                            <input type="submit" value="Create Product" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}