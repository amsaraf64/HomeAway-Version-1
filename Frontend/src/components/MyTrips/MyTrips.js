import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies'
import './MyTrips.css'

//create the sidebar Component
class MyTrips extends Component {
    constructor(props){
        super(props);  
        this.state = {
            tripsdata : []
        };
    }

    componentDidMount(){
            var data = {
                temailid : document.cookie.substring(7)
            }
            axios.get('http://localhost:3001/getmytrips/' + data.temailid)
                .then(response => {
                this.setState({
                 tripsdata : this.state.tripsdata.concat(response.data)
               })
            });    
    }

    render()
    {
        let details = this.state.tripsdata.map((data,i) => {
            return(
                
                <table >
                <tbody class="tableprops">
                <tr key={i}>
                    <div class = "container list-props">
                    <div><td><h2>{data.headline}</h2></td></div>
                    <div><td>Trip start : {data.startdate.substring(0,10)}</td></div>
                    <div><td>Trip end :{data.enddate.substring(0,10)}</td></div>
                    <div><td>Property owner : {data.oemailid}</td></div> 
                    </div> 
                    <br></br>
                </tr>
                </tbody>
                </table>
            )
        })

        return(
            <div>
            <NavBarBlue></NavBarBlue>
            <div class="container">
                    <h2>List of Trips</h2>  
                    <div className = "flex-container-mytrips">                  
                         {details} 
                    </div>
                                       
             </div> 
            </div>
        )
    }

}

export default MyTrips;