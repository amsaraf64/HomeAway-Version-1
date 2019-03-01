import React,{Component} from 'react';
import homeawaylogo from '../../images/logo-homeaway-white.png';
import birhouselogo from '../../images/birdhouse-bceheader-white.svg';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router';

//create the Landing Component
class Home extends Component {
    constructor(props){
        super(props);  
        this.state = {         
            searchData : [],
            destination : null,
            start_date : null,
            end_date : null,
            accomodates : null,
            isOwner : false
        };
    }

    
    searchResultsHandler = (e) => {
        var data = {
            emailid : document.cookie.substring(7),
            destination : this.state.destination,
            start_date : this.state.start_date,
            end_date : this.state.end_date,
            accomodates : this.state.accomodates
        }
        console.log("Inside search results")

        localStorage.setItem('searchdata', JSON.stringify(data));

        console.log(data)

        axios.post('http://localhost:3001/searchproperties',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        searched : true,
                        searchData : this.state.searchData.concat(response.data)
                    })
                     localStorage.setItem('searchdata', JSON.stringify(this.state.searchData));
                }else{
                    this.setState({
                        searched : false
                    })
                }
            })
    }
   
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    handleDestination = (e) => {
        this.setState({
            destination : e.target.value
        })
    }

    handleStartDate = (e) => {
        this.setState({
            start_date : e.target.value
        })
    }

    handleEndDate = (e) => {
        this.setState({
            end_date : e.target.value
        })
    }

    handleAccomodates = (e) => {
        this.setState({
            accomodates : e.target.value
        })
    }

    handlerListProperties = (e) => {

        var emailid = document.cookie.substring(7);

        axios.get('http://localhost:3001/getusertype/'+ emailid)
            .then(response => {
                console.log(response.data[0].usertype);
                if(response.status == 200 && response.data[0].usertype == "owner"){
                    this.setState({
                        isOwner : true
                    })
                }else{
                    this.setState({
                        isOwner : false
                    })
                }
            })
    }
    

    render(){
        let redirectVar = null;
/*         if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/landing"/>
        } */
        return(       
        <div>
        {redirectVar}
        <div class="bg">

        <nav class="navbar navigation-bar">
        <div class="container-fluid">
            <div class="navbar-header">
            <a href = "/home"><img src = {homeawaylogo} height="50" width="200"></img></a>
            </div>
            <div class = "navbar nav navbar-right">
            <ul class="nav navbar-nav" >
            <li class="active"><a href="#"><font color="white">TripBoards</font></a></li>
            

            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">Login</font>
                <span class="caret"></span></a>
                <ul class="dropdown-menu">
                <li><a href="/profile">My profile</a></li>
                <li><a href="/landing" onClick = {this.handleLogout}>Logout</a></li>
                </ul>
            </li>
        
            <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><font color="white">Help</font>
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
            <li><a href="/help">Visit help center</a></li>
            </ul>
            </li>
            <li>
            <a class="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" href="/sidebar">List your property</a>
            {/* <button class="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" onClick = {this.handlerListProperties}>List your property</button> */}
            </li>
            <li>
            <a href = "/home"><img src = {birhouselogo} height="45" width="45"></img></a>
            </li>
            </ul>
            </div>
        </div>
        </nav>
       
        <div class="jumbotron">
        
        <div className = "home-inputs">

        <div class="container">
            <h2 class="display-3"><font color="white">Book beach houses, cabins,<br></br> condos and more, worldwide</font></h2>
        </div>

        <br></br><br></br>
        <form>
        <input type = "text" onChange = {this.handleDestination} class = "where"></input>

        <input type="date" onChange = {this.handleStartDate} class="form-landing"/>
        
    
        <input type="date" onChange = {this.handleEndDate} class="form-landing" />
        
        
        <input type = "text" onChange = {this.handleAccomodates} class = "form-landing"></input>

        <a href="/searchresults" onClick={this.searchResultsHandler} class="btn btn-primary btn-md searchbox-submit" type="button" tabindex="5">
        Search
        </a>
        </form>

        </div>
        </div>


        <div class="page-footer font-small pt-4 footer-flex">

        {/*     <div class="container-fluid text-center text-md-left"> */}

            {/* <div class="row"> */}

                <div class="left-class">
                <h4 class><font color="white"><b>Your whole vacation starts here</b></font></h4>
                <p><font color="white">Choose a rental from the world's best selection</font></p>
                </div>

                <div class="middle-class">
                    <h4 class><font color="white"><b>Book and stay with confidence</b></font></h4>
                    <p><font color="white">Secure payments, peace of mind</font></p>
                </div>

                <div class="right-class">
                    <h4 class><font color="white"><b>Your vacation your way</b></font></h4>
                    <p><font color="white">More space, more privacy, no compromises</font></p>       
                </div>

         {/*    </div> */}
            
       {/*      </div> */}


        </div>

        </div>
        </div>
        )
    }
}

export default Home;
