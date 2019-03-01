import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from '../NavBarSignUp/NavBar';

//Define a Login Component
class OwnerLogin extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailid : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.emailidChangeHandler = this.emailidChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //emailid change handler to update state variable with the text entered by the user
    emailidChangeHandler = (e) => {
        this.setState({
            emailid : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            emailid : this.state.emailid,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
            <NavBar></NavBar>
            <div class = "main-login">
            
            <div class="login-header text-center col-md-12 traveler">
            <h1>Log in to HomeAway</h1>
            Need an account?     
            <a href="/ownersignup">Sign Up</a>
            </div>

            <div className="container">             
                <div className="login-form">
                    <div className="main-div">
                      
                    <div class="panel-heading">
                    <p class="panel-title">Account login</p>
                    </div>
                        <form  onSubmit = {this.submitLogin}>
                            <div className="form-group">
                                <input onChange = {this.emailidChangeHandler} type="email" className="form-control1" name="emailid" placeholder="Email address" required/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control1" name="password" placeholder="Password" required/>
                            </div>
                            <div>
                                <a href>Forgot password?</a>
                            </div>
                            <button className="btn btn-primary">Login</button> 
                            <div>
                            <input type = "checkbox" checked/>Keep me signed in
                            </div>

                            <h6><em> or</em></h6>

                            <button class="facebook-btn">
                            Login with Facebook
                            </button>

                            </form>

                        </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default OwnerLogin;
