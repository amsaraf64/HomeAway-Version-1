import React,{Component} from 'react';
import homeawaylogo_blue from '../../images/logo-bceheader-blue.svg'
import birhouselogo_blue from '../../images/birdhouse-bceheader-blue.svg'


//create the Landing Component
class NavBar extends Component {
    constructor(props){
        super(props);  
    }

    render()
    {
        return(
            <div>
                <nav class="navbar navbar-white">
                    <div className="container-fluid">
                    <div className="navbar-header">
                    <img src = {homeawaylogo_blue} height="50" width="200"></img>
                </div>
                    <ul className="nav navbar-nav navbar-right">
                    &nbsp;&nbsp;&nbsp;&nbsp;<li><img src = {birhouselogo_blue} height="50" width="50"></img></li>
                    </ul>

                </div>
                </nav>
            
            </div>
        )
    }

}

export default NavBar;