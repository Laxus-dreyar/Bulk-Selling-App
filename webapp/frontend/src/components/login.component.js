import React, {Component} from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email
        }

        axios.post('http://localhost:4000/check', newUser)
             .then(res => {
                    if(!res.data){
                        alert("INVALID CREDENTIALS");
                    }
                    else{
                        if(res.data.ty === "vendor")
                            this.props.history.push({
                                pathname:'/login/vendor',
                                user: newUser.username
                            });
                        else if(res.data.ty === "customer")
                            this.props.history.push({
                                pathname:'/login/customer',
                                user: newUser.username
                            });
                    }
                });

        this.setState({
            username: '',
            email: ''
        });
    }

    render() {
        
        const responseFacebook = (response) => {
            console.log(response);
            this.props.history.push({
                pathname:'/login/vendor',
                user: response.name
            });
        }
        
        const responseGoogle = (response) => {
            console.log(response);
        }

        return (
            <div>
                <div className>
                    <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

                    <FacebookLogin
                    appId="501917003852044" //APP ID NOT CREATED YET
                    fields="name,email,picture"
                    callback={responseFacebook}
                    />
                    <br/>
                    <br/>

                    <br/>
                    <br/>
                </div>
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
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}