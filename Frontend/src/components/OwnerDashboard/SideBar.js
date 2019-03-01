import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './SideBar.css'

//create the sidebar Component
class SideBar extends Component {
    constructor(props){
        super(props);  
    }


    render()
    {
        
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }

        return(
            <div>
             {redirectVar}
            <NavBarBlue></NavBarBlue>
            
            <div className = "main-div-sidebar row">

            <div className = "col-lg-3 vertical-menu-owner">
            <h4>Welcome</h4>
            <a href="/location">Location</a>
            <a href="/details">Details</a>
            <a href="/bookingOptions">Booking Options</a>
            <a href="/photos">Photos</a>
            <a href="/pricing">Pricing</a>
            <a href="/ownerdashboard">Dashboard</a>
            </div>


            <div class=" col-lg-9 checklist-summary-header">
            <h1><span>Welcome! Verify the location of your rental</span></h1>
            <div><span>Just 7 steps remaining.</span></div>
            <div>
                <br></br> 
            <button className="btn btn-primary btn-md searchbox-submit continue-btn" type="button" tabindex="5">
            Continue
            </button>
            </div>
            </div>


            
            </div>

            </div>
        )
    }

}

export default SideBar;