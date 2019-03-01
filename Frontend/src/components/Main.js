import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import LandingPage from './Home/LandingPage';
import NavBarSignUp from './NavBarSignUp/NavBar';
import Profile from './Profile/Profile';
import TravelerSignUp from './UserSignUp/TravelerSignUp'
import OwnerSignUp from './UserSignUp/OwnerSignUp'
import NavBarBlue from './NavBarBlue/NavBarBlue';
import OwnerLogin from './Login/OwnerLogIn';
import TravelerLogin from './Login/TravelerLogin';
import SideBar from './OwnerDashboard/SideBar';
import OwnerLocation from './OwnerDashboard/OwnerLocation';
import OwnerDetails from './OwnerDashboard/OwnerDetails'
import OwnerPhotos from './OwnerDashboard/OwnerPhotos'
import OwnerPricing from './OwnerDashboard/OwnerPricing'
import OwnerCurrency from './OwnerDashboard/OwnerCurrency'
import SearchResults from './SearchResults/SearchResults';
import TravelerPropertyDetails from './TravelerPropertyDetails/TravelerPropertyDetails'
import OwnerDashboard from './OwnerDashboard/OwnerDashboard'
import MyTrips from './MyTrips/MyTrips'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/* <Route path="/" component={Landing}/> */}
                <Route path="/travelerlogin" component={TravelerLogin}/>
                <Route path="/ownerlogin" component={OwnerLogin}/>
                <Route path="/travelersignup" component={TravelerSignUp}/>
                <Route path="/ownersignup" component={OwnerSignUp}/>
                <Route path="/home" component={Home}/>
                <Route path="/landing" component={LandingPage}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/navbarsignup" component={NavBarSignUp}/>
                <Route path="/navbarblue" component={NavBarBlue}/>
                <Route path="/sidebar" component={SideBar}/>
                <Route path="/location" component={OwnerLocation}/>
                <Route path="/details" component={OwnerDetails}/>
                <Route path="/photos" component={OwnerPhotos}/>
                <Route path="/pricing" component={OwnerPricing}/>
                <Route path="/currency" component={OwnerCurrency}/>
                <Route path="/searchresults" component={SearchResults}/>
                <Route path="/viewproperty" component={TravelerPropertyDetails}/>
                <Route path="/mytrips" component={MyTrips}/>
                <Route path="/ownerdashboard" component={OwnerDashboard}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;
