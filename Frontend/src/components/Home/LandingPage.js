import React,{Component} from 'react';
import homeawaylogo from '../../images/logo-homeaway-white.png';
import birhouselogo from '../../images/birdhouse-bceheader-white.svg';
import cookie from 'react-cookies';

//create the Landing Component
class LandingPage extends Component {
    constructor(props){
        super(props);  
    }
   
    render(){
        

        return(
            
        <div>
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
                <li><a href="/travelerlogin">Traveler Login</a></li>
                <li><a href="/ownerlogin">Owner Login</a></li>
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
        <input type = "text" class = "where"></input>

        <input type="date" class="form-landing"/>
        
    
        <input type="date" class="form-landing" />
        
        
        <input type = "text" class = "form-landing"></input>

        <button class="btn btn-primary btn-md searchbox-submit" type="button" tabindex="5" Link to = "/travelerlogin">
        Search
        </button>
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

export default LandingPage;
