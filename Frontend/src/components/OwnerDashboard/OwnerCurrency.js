import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import './SideBar.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the sidebar Component
class OwnerCurrency extends Component {
    constructor(props){
        super(props); 
        this.state = {         
            baserate : null
        };
    }

    baserateChangeHandler = (e) => {
        this.setState({
            baserate : e.target.value
        })
    }

    submitBaseRate = (e) => {
        var propertydata = JSON.parse(localStorage.getItem('propertydata'));

        var data = {
            oemailid : document.cookie.substring(7),
            address : propertydata.address,
            headline :propertydata.headline,
            type : propertydata.type,
            description : propertydata.description,
            bedroom : propertydata.bedroom,
            accomodate : propertydata.accomodate,
            bathroom : propertydata.bathroom,
            startdate : propertydata.startdate,
            images : propertydata.images,
            enddate : propertydata.enddate,
            baserate : this.state.baserate
        }

        axios.post('http://localhost:3001/addProperty',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        propertAdded : true
                    })
                }else{
                    this.setState({
                        propertAdded : false
                    })
                }
            })
    }

    render()
    {

        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }

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
                <h4><span>Availability</span></h4><hr/>
                </div>

                
                <div class="row form-group">
                <div class="col-sm-12 col-md-7">               <label>Currency Type</label>
                    <select class="form-control-owner-details input-lg js-input-field" data-input-model-name="currencyType">
                            <option disabled="" hidden="" value="" selected="selected">Currency Type</option>
                            <option value="usd">USD</option>
                            <option value="euro">Euro</option>
                            <option value="other">Other</option>
                    </select>
                    </div>
                </div>

                <div>
                    <label>Nightly Base Rate</label>
                    <input type="text" onChange = {this.baserateChangeHandler} class="form-control-owner-details input-lg js-input-field" 
                    id="ownerStartDateInput" placeholder="$"></input>
                </div>

             <div>
                <a href="/listallproperties" onClick = {this.submitBaseRate} className="btn btn-primary btn-next">Next</a> 
             </div>

             </div>
            </div>
            
            </div>

            </div>
        )
    }

}

export default OwnerCurrency;