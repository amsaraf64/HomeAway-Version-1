import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies'
import './OwnerDashboard.css'

//create the sidebar Component
class OwnerDashboard extends Component {
    constructor(props){
        super(props);  
        this.state = {
            dashboarddata : []
        };
    }

    componentDidMount(){
        console.log("Inside compdidm")
            var data = {
                oemailid : document.cookie.substring(7)
            }
            console.log(data.oemailid);
            axios.get('http://localhost:3001/getownerdashboard/' + data.oemailid)
                .then(response => {
                this.setState({
                 dashboarddata : this.state.dashboarddata.concat(response.data)
               })
            });    
    }

    render()
    {
        let details = this.state.dashboarddata.map((data,i) => {
            return(
                
                <table >
                <tbody class="tableprops">
                <tr key={i}>
                    <div class = "container list-props">
                    <div><h3><td>{data.headline}</td></h3></div>
                    <div><td>Booked from : {data.startdate.substring(0,10)}</td></div>
                    <div><td>Booked till : {data.enddate.substring(0,10)}</td></div>
                    <div><td>Booked by : {data.temailid}</td></div> 
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
                    <h2>Dashboard</h2>  
                    <div className = "flex-container-ownerdasboard">                  
                         {details} 
                    </div>
                                       
             </div> 
            </div>
        )
    }

}

export default OwnerDashboard;