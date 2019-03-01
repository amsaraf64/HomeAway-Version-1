import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import './SideBar.css'

//create the sidebar Component
class OwnerDetails extends Component {
    constructor(props){
        super(props);  

        this.state = {         
            headline : null,
            type : null,
            description : null,
            bedroom : null,
            accomodate : null,
            bathroom : null
        };
/*         this.submitOwnerDetails = this.submitOwnerDetails.bind(this);
        this.detailsChangeHandler = this.detailsChangeHandler.bind(this); */
    }

    headlineChangeHandler = (e) => {
        this.setState({
            headline : e.target.value
        })
    }
    typeChangeHandler = (e) => {
        this.setState({
            type : e.target.value
        })
    }
    descriptionChangeHandler = (e) => {
        this.setState({
            description : e.target.value
        })
    }
    bedroomChangeHandler = (e) => {
        this.setState({
            bedroom : e.target.value
        })
    }
    accomodateChangeHandler = (e) => {
        this.setState({
            accomodate : e.target.value
        })
    }
    bathroomChangeHandler = (e) => {
        this.setState({
            bathroom : e.target.value
        })
    }

    submitOwnerDetails = (e) => {
        var propertydata = JSON.parse(localStorage.getItem('propertydata'));

        var data = {
            oemailid : document.cookie.substring(7),
            address : propertydata.address,
            headline : this.state.headline,
            type : this.state.type,
            description : this.state.description,
            bedroom : this.state.bedroom,
            accomodate : this.state.accomodate,
            bathroom : this.state.bathroom
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
            <a href="/photos">Photos</a>
            <a href="/pricing">Pricing</a>
            <a href="/ownerdashboard">Dashboard</a>
            </div>
            
            <div className="container container-owner col-lg-9">
                <div className = "location-form">

                <div class="checklist-header-container "><h4><span>Describe your propery</span></h4><hr/></div>

                <div>
                    <input type="text" onChange = {this.headlineChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerHeadlineInput" placeholder="Headline" value = {this.state.headline} ></input>
                </div>

                 <div>
                    <input type="text" onChange = {this.typeChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerPropertyTypeInput" placeholder="PropertyType"></input>
                </div>

                 <div>
                    <textarea onChange = {this.descriptionChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerPropertyDescInput" placeholder="Property Description"></textarea>
                </div>

                <div>
                    <input type="text" onChange = {this.bedroomChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerBedroomsInput" placeholder="Bedrooms"></input>
                </div>

                <div>
                    <input type="text" onChange = {this.accomodateChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerAccomodatesInput" placeholder="Accomodates"></input>
                </div>

                <div>
                    <input type="text" onChange = {this.bathroomChangeHandler} class="form-control-owner-details input-lg js-input-field" id="ownerBathroomInput" placeholder="Bathroom"></input>
                </div>


             <div>
                <a href = "/photos" onClick = {this.submitOwnerDetails} className="btn btn-primary btn-next">Next</a> 
             </div>

             </div>
            </div>
            
            </div>

            </div>
        )
    }

}

export default OwnerDetails;