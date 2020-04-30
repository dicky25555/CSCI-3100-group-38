import React, {Component} from 'react';
import Navbar from './components/Navbar';
import NavbarSigned from './components/Navbar-signed';
import Buttombar from './components/Buttombar';
import 'bootstrap/dist/css/bootstrap.css';
import './components/font/Montserrat-Regular.ttf';
import './serviceCategories.css';
import NavbarSignedSP from './components/Navbar-signedSP';

class serviceCategories extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoriesList : [],
            signedData: '',
            signedDataSP:''
        }
    }

    exportCategories = (e) =>{
        
    }

    componentDidMount(){
		// Read categories data from mongoose.
        fetch("http://localhost:9000/api/category")
        .then(
            res => res.json().then( data => ({
                data: data,
                status: res.status
            })).then(res => {
                console.log(res.status, res.data);
                this.setState({
                    categoriesList: res.data
                })
            })
        )

		// Read whether customer users are signed in
        fetch("http://localhost:9000/api/customer/profile", {
        credentials: 'include'})
        .then(
            res => res.json().then( data => ({
                data: data,
                status: res.status
            })).then(res => {
                console.log(res.status, res.data);
                this.setState({
                    signedData: res.data
                })
            }

            )
        )
		// Read whether SP users are signed in
        fetch("http://localhost:9000/api/service/profile", {
        credentials: 'include'})
        .then(
            res => res.json().then( data => ({
                data: data,
                status: res.status
            })).then(res => {
                console.log(res.stats, res.data);
                this.setState({
                    signedDataSP: res.data
                })
            }

            )
        )
    }

    getCategoriesList = (e, selectedCategories) => {
        e.preventDefault();
        console.log(selectedCategories )
        this.props.history.push({
            pathname: "/categoriesList",
            data: selectedCategories
        })
    }
    render(){
        var categoriesArray = [];
        var navigationBar = [];
        for(let i=0; i < this.state.categoriesList.length; i++){				//pushing searched categories services to the List for further showing.
            if(i%2 == 0){
                categoriesArray.push(
                    <div>
                                <tr>
                                    <td style={{paddingTop:"30px"}}>
                                        <p style={{fontWeight:"bold" ,color:"#5318fb", cursor:"pointer"}} onClick={e => this.getCategoriesList(e, this.state.categoriesList[i])}>{this.state.categoriesList[i].name}</p>
                                    </td>
                                </tr>
                    </div>
                );
            } else{
                categoriesArray.push(
                    <div>
                            <tr>
                                <td style={{paddingTop:"30px"}}>
                                    <p style={{fontWeight:"bold", color:"#5318fb", cursor:"pointer"}} onClick={e => this.getCategoriesList(e, this.state.categoriesList[i])}>{this.state.categoriesList[i].name}</p>
                                </td>
                            </tr>
                    </div>
                );
            }
        }
        if (this.state.signedData){							//Check which NavBar the site should show.
            navigationBar.push(
                <div>
                    <NavbarSigned/>
                </div>
            )
        }
        else if(this.state.signedDataSP){
            navigationBar.push(
                <div>
                    <NavbarSignedSP/>
                </div>
            )
        }
        else{
            navigationBar.push(
                <div>
                    <Navbar/>
                </div>
            )
        }
        return												//Returning service according to Categories with CSS.
            <div>
                <div>
                    {navigationBar}
                </div>
                <div class="row" style={{borderBottom: "1px solid #DDD", paddingBottom:"60px",paddingTop:"20px"}}>
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <br /><br /><br />
                        <p class="textmain">Categories</p>
                        <p class="text2" style={{textAlign:"left"}}>Search for the service you need from the following categories:</p>
                    </div>
                </div>
                <div class="row">
                    
                    <div class="col-md-1"></div>
                    <div class="col-md-4">
                        <table>
                            {categoriesArray}
                        </table>
                    </div>
                    <div class="col-md-1"></div>
                    
                </div>
                <Buttombar/>
            </div>
        );
    }
}

export default serviceCategories;