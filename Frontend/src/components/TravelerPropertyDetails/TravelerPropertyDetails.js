import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {Alert, Button} from 'react-bootstrap'
import "./TravelerPropertyDetails.css"

//create the sidebar Component
class TravelerPropertyDetails extends Component {
    constructor(props){
        super(props);  
        this.state = {
            propertyData : [],
            imageView : []

        };
        
    }

    componentDidMount(){
        var pid = localStorage.getItem('pid');
        console.log("pid" + pid);
        axios.get('http://localhost:3001/fetchpropertydetails/'+pid)
        .then(response => {
            if(response.status == 200){
                this.setState({
                    propertyData : this.state.propertyData.concat(response.data),
                })
                this.state.propertyData.map(property => { 
                    this.setState(
                        {
                            pid : property.pid,
                            start_date : property.startdate,
                            end_date : property.enddate,
                            accomodates : property.accomodates,
                            oemailid : property.oemailid ,
                            picturelist : property.picturelist                 
                        }
                    );

                    
                })
                console.log(this.state.picturelist);
                var photoList = this.state.picturelist.split(',');
      
                var imageArr = [];
                for (let i = 0; i < photoList.length; i++) {
                  axios.post('http://localhost:3001/download/' + photoList[i])
                      .then(response => {
                          //console.log("Imgae Res : ", response);
                          let imagePreview = 'data:image/jpg;base64, ' + response.data;
                           imageArr.push(imagePreview); 
                         /*  const propertyArr = this.state.Properties.slice();
                          propertyArr[i].Photos = imagePreview; */
                          this.setState({
                              /* Properties: propertyArr, */
                            imageView : imageArr
                          });
                      }); 
              }
            }    
        })


    }

    handleBookNow = (e) => {

        var data = {
            temailid : document.cookie.substring(7), 
            oemailid : this.state.oemailid,
            pid : this.state.pid,
            start_date : this.state.start_date,
            end_date : this.state.end_date,
            accomodates : this.state.accomodates
        }
        console.log(data);
        
        axios.post('http://localhost:3001/addbooking',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        booked : true
                    })
                }else{
                    this.setState({
                        booked : false
                    })
                }
            })
}
    render()
    {
        let imageArray = this.state.imageView.map((value) => {
            return(
                <p><img src={value}></img></p>
            )
        })

        let details = this.state.propertyData.map((property,i) => {
            return(
                <div props-div>
                <div className = "list-props props-group-traveler ">
                    <div>
                     <h2>{property.baserate}$</h2>
                     Per Night
                      </div>
                      <br></br>

                    <div className = "props-group-traveler">
                    <h3> 
                    {property.headline}
                    </h3>
                    </div>

                    <br></br>
                    <table className = "traveler-table">

                    <tr>
                    <div className = "props-group-traveler"> 
                    <td>Check-in </td>
                    <td>Check-out </td>
                   
                    </div>

                    <div className = "props-group-traveler">
                    <td>{property.startdate.substring(0,10)}</td>
                    <td>{property.enddate.substring(0,10)} </td>
                     </div>
                    
                    </tr>

                    <tr>
                    <div className = "props-group-traveler"> 
                    <td>Number of guests</td>
                    <td>{property.accomodates}</td>
                    </div>
                    </tr>

                    </table>
                    <br></br>
                    
                    <div>
                    <button onClick = {this.handleBookNow} onclick="toggle_visibility('foo')" class="btn btn-primary btn-md searchbox-submit save-btn" type="button" tabindex="5">Book Now</button>
                    </div>

                </div>
                </div>
            )
        })

        let alert = null;
        if(this.state.booked)
        {
         alert = 
         <Alert className="alert" bsStyle="success">
        <h4>You're all set!</h4>
        <p>
        Booking successful
        </p>
        <p>
          <Button bsStyle="success">Take this action</Button>
        </p>
      </Alert>
        }

        return(
            <div>
            <NavBarBlue></NavBarBlue>
            <div  class="row jumbotron jumbotron-traveler">
            <div class="column left">
                <Carousel showThumbs={false} className = "carousel">
                {imageArray}
                </Carousel>
            </div>
                <div class="column right container container-traveler">
                {details}  
            </div>

            {alert}

            </div>
           
            </div>
        )
    }

}

export default TravelerPropertyDetails;