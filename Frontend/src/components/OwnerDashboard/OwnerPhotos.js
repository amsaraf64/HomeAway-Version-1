import React,{Component} from 'react';
import NavBarBlue from '../NavBarBlue/NavBarBlue';
import axios from 'axios';
import './SideBar.css'
import Redirect from 'react-router/Redirect';


//create the sidebar Component
class OwnerPhotos extends Component {
    constructor(props){
        super(props);  
        this.state = {
            description: '',
            /* selectedFile: '', */
             selectedFile : [], 
             images : ''
          };
          this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        console.log("Inside onchange")
        console.log(e.target.files);
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files
          })
          
        }else{
          this.setState({ 
              [e.target.name]: e.target.value
             });
        }
    }
  
    onSubmit = (e) => {
        console.log("Inside onSubmit");
      e.preventDefault();
      console.log("files-" + Object.keys(this.state.selectedFile).length);
      const { description, selectedFile} = this.state;
      let formData = new FormData();
      formData.append('description', description);
      for(let i = 0 ; i < Object.keys(this.state.selectedFile).length ; i++)
      {
      formData.append('selectedFile', selectedFile[i]);
      }
  
        axios.post('http://localhost:3001/photos', formData)
          .then((result) => {
            // access results...
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
                images : result.data
            }
            
            localStorage.setItem('propertydata', JSON.stringify(data));
          });
  
    }

    render()
    {


        const { description, selectedFile } = this.state;
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
            
            <div className="container col-lg-9">
                <div className = "location-form">

                <div class="checklist-header-container ">
                <h4><span>Add upto 5 photos of your property</span></h4><hr/>
                </div>
                <form onSubmit={this.onSubmit}>
                 <div class="photos-drop-inside">
                    <h2 class="photo-drop-title text-muted">Drop photos here</h2>
                    <h2 class="photo-drop-OR text-muted">or</h2>
                   
                 <div><label  for="uploadPhotoInput" name="description" value={description}
                    onChange={this.onChange} multiple class="photo-drop-button btn btn-default center-block">Select Photos to Upload</label>
                 <input type="file" id="uploadPhotoInput" multiple name="selectedFile" onChange={this.onChange}/>
                 </div>

                 <h2 class="photo-drop-error text-muted">Only JPEG images are supported</h2>
                 <div class="photo-drop-info small text-muted">0 of 50 uploaded. 6 are required. You can choose to upload more than one photo at a time.
                 </div>

                 </div>
               

             <div>
                <button type="submit" className="btn btn-primary btn-next"> Next</button> 
             </div>
            
           </form>
        

             </div>
            </div>
            
            </div>

            </div>
        )
    }

}

export default OwnerPhotos;