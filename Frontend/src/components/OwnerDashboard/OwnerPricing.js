import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import './SideBar.css'

//create the sidebar Component
class OwnerPricing extends Component {
    constructor(props){
        super(props);  
        this.state = {         
            startdate : null,
            enddate : null
        };
        this.startDateHandler = this.startDateHandler.bind(this);
        this.endDateHandler = this.endDateHandler.bind(this);
        this.submitAvailability = this.submitAvailability.bind(this);
    }

    startDateHandler = (e) => {
        this.setState({
            startdate : e.target.value
        })
    }
    endDateHandler = (e) => {
        this.setState({
            enddate : e.target.value
        })
    }

    submitAvailability = (e) => {
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
            images : propertydata.images,
            startdate : this.state.startdate,
            enddate : this.state.enddate
        }

        localStorage.setItem('propertydata', JSON.stringify(data));

    }

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
            <a href="/bookingOptions">Booking Options</a>
            <a href="/photos">Photos</a>
            <a href="/pricing">Pricing</a>
            <a href="/ownerdashboard">Dashboard</a>
            </div>
            
            <div className="container col-lg-9">
                <div className = "location-form">

                <div className="checklist-header-container ">
                <h4><span>Availability</span></h4><hr/>
                </div>

                <div>
                    <label>Start Date</label>
                    <input type="date" onChange = {this.startDateHandler} class="form-control-owner-details input-lg js-input-field" 
                    id="ownerStartDateInput" placeholder="Start Date"></input>
                </div>

                <div>
                    <label>&nbsp;End Date</label>
                    <input type="date" onChange = {this.endDateHandler} class="form-control-owner-details input-lg js-input-field" 
                    id="ownerEndDateInput" placeholder="End Date"></input>
                </div>
            
                

             <div>
                <a href="/currency" onClick = {this.submitAvailability} className="btn btn-primary btn-next" href = "/currency">Next</a> 
             </div>

             </div>
            </div>
            
            </div>

            </div>
        )
    }

}

export default OwnerPricing;