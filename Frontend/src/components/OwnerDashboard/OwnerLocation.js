import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './SideBar.css'

//create the sidebar Component
class OwnerLocation extends Component {
    constructor(props){
        super(props);  
        this.state = {         
            addressData : [],
            address : null
        };
        this.submitAddress = this.submitAddress.bind(this);
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
    }

    addressChangeHandler = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    submitAddress = (e) => {
        var data = {
            oemailid : document.cookie.substring(7),
            address : this.state.address
        }

        localStorage.setItem('propertydata', JSON.stringify(data));

/*         axios.post('http://localhost:3001/addlocation',data)
            .then(response => {
                if(response.status == 200){
                   window.alert("Address added!");
                }
            }) */
    }

    //get the students data from backend  

    render()
    {
        return(
            <div>
            <NavBarBlue></NavBarBlue>
            
            <div className = "main-div-sidebar row">

            <div className = "col-lg-3 vertical-menu-owner">
            <h4>Welcome</h4>
            <a href="/location">Location</a>
            <a href="/details">Details</a>
            <a href="/photos">Photos</a>
            <a href="/pricing">Pricing</a>
            <a href="/ownerdashboard">Dashboard</a>
            </div>
            
            <div className="container col-lg-9">
            <div className = "location-form">
                <div class="checklist-header-container ">
                <h4><span>Verify the location of your rental</span></h4><hr/>
                </div>

                <div className = "form-group">
                    <textarea className="form-control-owner-details input-lg js-input-field" onChange = {this.addressChangeHandler} id="ownerAddress" placeholder="Address"  rows="4"></textarea>
                </div>

                <div>
                    
                    <a href="/details" onClick = {this.submitAddress} className="btn btn-primary btn-next">Next</a> 
                </div>
            </div>
            </div>
            
            </div>

            </div>
        )
    }

}

export default OwnerLocation;