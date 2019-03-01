import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Profile.css'
import avatar from '../../images/avatar.png';

//create the Landing Component
class Profile extends Component {
    constructor(props){
        super(props);         
        this.state = {         
            profileData : [],
            imageView : '',
            profilepic : '',
            emailid : document.cookie.substring(7),
            firstname : null,
            lastname : null,
            aboutme : null,
            school : null,
            company : null,
            languages : null,
            citycountry : null,
            gender : null
        };
    };

        //get the students data from backend  
        componentDidMount(){
            console.log(this.state.emailid);
            axios.get('http://localhost:3001/getprofile/' + this.state.emailid)
                    .then((response,err) => {
                         console.log("Profile Data: " + JSON.stringify(response.data));
                    this.setState({
                        profileData : this.state.profileData.concat(response.data)
                    });

                    this.state.profileData.map(profile => { 
                        this.setState(
                            {
                                firstname : profile.firstname,
                                lastname : profile.lastname,
                                aboutme : profile.aboutme,
                                citycountry : profile.citycountry,
                                company : profile.company,
                                hometown : profile.hometown,
                                school : profile.school,
                                languages : profile.languages,
                                gender : profile.gender,
                                profilepic : profile.profilepic
                            }
                        );
                        
                    });

                    axios.post('http://localhost:3001/download/' + this.state.profilepic)
                    .then(response => {
                        let imagePreview = 'data:image/jpg;base64, ' + response.data;
                         this.setState({
                           imageView : imagePreview
                         });
     /*                    this.setState({
                            profilepic : imagePreview
                        } 
                            )*/
                    }); 

                });

                
        }

    handleAboutMe = (e) => {
        this.setState({
            aboutme : e.target.value
        })
    }

    handleCityCountry = (e) => {
        this.setState({
            citycountry : e.target.value
        })
    }

    handleCompany = (e) => {
        this.setState({
            company : e.target.value
        })
    }

    handleSchool = (e) => {
        this.setState({
            school : e.target.value
        })
    }

    handleHomeTown = (e) => {
        this.setState({
            hometown : e.target.value
        })
    }

    handleLanguages = (e) => {
            this.setState({
                languages : e.target.value
            })
    }

    handleGender = (e) => {
        this.setState({
            gender : e.target.value
        })
    }

    onChange = (e) => {
        console.log("Inside profile on change" + e.target.files[0])
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files[0]
          })

        }else{
          this.setState({ [e.target.name]: e.target.value });
        }

        let formData = new FormData();
 
        formData.append('selectedFile', e.target.files[0]);
      /*   formData.append('emailid',this.state.emailid); */
        
        axios.post('http://localhost:3001/photos', formData)
            .then((result) => {

                if(result.status == 200)
                {        
                axios.post('http://localhost:3001/download/'+ result.data)
                .then(response => {
                    console.log("Image Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    
                    this.setState({
                        imageView : imagePreview
                    })             
                })
                 }
            });
    }
  

    handleUpdateProfile = (e) => {

        var data = {
            emailid : document.cookie.substring(7),
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            aboutme :  this.state.aboutme,
            citycountry : this.state.citycountry,
            company : this.state.company,
            hometown : this.state.hometown,
            languages : this.state.languages,
            school : this.state.school,
            gender : this.state.gender,
            profilepic : this.state.profilepic
        }
        console.log(this.state.profilepic)

        axios.post('http://localhost:3001/updateprofile',data)
            .then(response => {
                if(response.status == 200){
                    this.setState({
                        profileCreated : true
                    })
                }else{
                    this.setState({
                        profileCreated : false
                    })
                }
            })
    }


    render()
    {   
        const { description, selectedFile } = this.state;

        let profileDetails = this.state.profileData.map(profile => {
            return(
                <form>
                <div className = "profile-form-inner">
                    <h3>Profile Information</h3>

                <div>
                    <input type="text" class="form-control input-lg js-input-field" id="profileFirstNameInput" placeholder="First name" value={profile.firstname} ></input>
                </div>

                 <div>
                    <input type="text" class="form-control input-lg js-input-field" id="profileLastNameInput" placeholder="Last name" value={profile.lastname} ></input>
                </div>

                 <div>
                    <textarea onChange = {this.handleAboutMe} class="form-control input-lg js-input-field" id="profileAboutMeInput" placeholder = "About Me" value={this.state.aboutme} rows="4" required=""></textarea>
                </div>

                <div>
                    <input type="text" onChange = {this.handleCityCountry} class="form-control input-lg js-input-field" id="profileCityCountryInput" placeholder="My City, My Country" value={this.state.citycountry}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleCompany} class="form-control input-lg js-input-field" id="profileCompanyInput" placeholder="Company" value={this.state.company}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleSchool} class="form-control input-lg js-input-field" id="profileSchoolInput" placeholder="School" value={this.state.school}></input>
                </div>

                <div>
                    <input type="text" onChange = {this.handleHomeTown} class="form-control input-lg js-input-field" id="profileHomeTownInput" placeholder="HomeTown" value={this.state.hometown}></input>
                </div>

                 <div>
                    <input type="text" onChange = {this.handleLanguages} class="form-control input-lg js-input-field" id="profileLanguagesInput" placeholder="Languages" value={this.state.languages}></input>
                </div>
                
                <div>
                    <input type="text" onChange = {this.handleGender} class="form-control input-lg js-input-field" id="profileLanguagesInput" placeholder="Gender" value={this.state.gender}></input>
                </div>
              
            </div>

            <div>
            <button onClick = {this.handleUpdateProfile} class="btn btn-primary btn-md searchbox-submit save-btn" type="button" tabindex="5">
            Update input
            </button>
            </div>

            </form>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/travelerlogin"/>
        }

        return(
            <div>
            <NavBarBlue></NavBarBlue>
            <div class="topnav">
                <a href="#inbox" class="active">Profile</a>
                <a href="/mytrips">My trips</a>
                <a href="#inbox">Inbox</a>
                <a href="#account">Account</a>
            </div>
            
            
            <div class="text-center">
                    
                    <div>
                    <label  for="uploadPhotoInput" name="description" value={description}
                    onChange={this.onChange} multiple ><img src={this.state.imageView} class="avatar img-circle img-thumbnail" alt="avatar"></img>
                    </label>
                    <input type="file" id="uploadPhotoInput" name="selectedFile" onChange={this.onChange} multiple/>
                    </div>
                    <h2 class="user-name">{this.state.firstname}</h2>
                    <p class="text-muted"><span class="user-location"></span>Member since 2018</p>
            </div>

            <div className = "profile-form-main">
              {profileDetails}
            </div>
            
            </div>
        )
    }

}

export default Profile;