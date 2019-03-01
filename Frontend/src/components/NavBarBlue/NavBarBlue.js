import React,{Component} from 'react';
import cookie from 'react-cookies';
import homeawaylogo_blue from '../../images/logo-bceheader-blue.svg'
import birhouselogo_blue from '../../images/birdhouse-bceheader-blue.svg'
import './NavBarBlue.css'


//create the  Component
class NavBar extends Component {
    constructor(props){
        super(props);  
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }

    render()
    {
        return(
            <div>
                <nav className="navbar navbar-blue navigation-bar">
        <div className="container-fluid">
            <div className="navbar-header">
            <a href = "/logo"><img src = {homeawaylogo_blue} height="50" width="200"></img></a>
            </div>
            <div className = "navbar navbar-blue nav navbar-right">
            <ul className="nav navbar-nav" >
            <li className="active"><a href="#"><font color="#0067db">TripBoards</font></a></li>
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#"><font color="#0067db">Login</font>
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                <li><a href="/profile">My profile</a></li>
                <li><a href="/landing" onClick = {this.handleLogout}>Logout</a></li>
                </ul>
            </li>
            <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#"><font color="#0067db">Help</font>
            <span className="caret"></span></a>
            <ul className="dropdown-menu">
            <li><a href="#">Visit help center</a></li>
            <li><a href="#">Owner Login</a></li>
            </ul>
            </li>
            <li>
            <a className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" href="/logo">List your property</a>
            </li>
            <li>
            <a href = "/logo"><img src = {birhouselogo_blue} height="45" width="45"></img></a>
            </li>
            </ul>
            </div>
        </div>
        </nav>
         </div>
        )
    }

}

export default NavBar;