import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';

import "./SearchResults.css"

//create the sidebar Component
class SearchResults extends Component {
    constructor(props){
        super(props);  
        this.state = {
            propertiesdata : [],
            imageView : []

        };
        this.handleViewPropertyDetails = this.handleViewPropertyDetails.bind(this);
    }

    componentDidMount(){
        
        var searchdata =  JSON.parse(localStorage.getItem('searchdata'));    
        this.setState(
            {
                propertiesdata : searchdata
            }
        )

        var imageArr = [];

        console.log(searchdata.length)
        

        for (let i = 0; i < searchdata.length; i++) {
            
            axios.post('http://localhost:3001/download/' + searchdata[i].picturelist.split(',')[0])
                .then(response => {
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    
                    var propertyArr = this.state.propertiesdata.slice();
                    propertyArr[i].picturelist = imagePreview;
                    this.setState({
                        propertiesdata: propertyArr
                    });
                });
        }
    }

    handleViewPropertyDetails = (pid,e) => 
    {
        console.log("Property id " + pid);
        localStorage.setItem('pid', pid);
    }

    render()
    {
        let details = this.state.propertiesdata.map((data,i) => {
            return(
                <table class="table">
                <tbody>
                <tr key={i}>
                    <div class = "container list-props">
                   
                    <div  class="row jumbotron-traveler">
                    <div class="column left"> 
                    <div><img class="imagesearch" src = {data.picturelist}/></div> 
                    </div>

                    <div class="column right container container-traveler">
                    <div><td><h3><a href = "/viewproperty" onClick = {this.handleViewPropertyDetails.bind(this,data.pid)}> {data.headline} </a></h3></td></div>
                    <div><td>{data.type}</td></div>
                    <div><td>No of bathrooms: {data.bathroom}</td></div>
                    <div><td>No of bedrooms :{data.bedroom}</td></div>
                    <div><td>Base Rate : {data.baserate}</td></div>
                    </div>
                    </div>

                    </div> 
                </tr>
                </tbody>
                </table>
            )
        })

        return(
            <div>
            <NavBarBlue></NavBarBlue>
            <div class="container">
                    <h2>List of Available Properties</h2>                    
                         {details}                    
             </div> 
            </div>
        )
    }

}

export default SearchResults;