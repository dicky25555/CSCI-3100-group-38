import React, {Component} from 'react';
import Navbar from './components/Navbar';
import NavbarSigned from './components/Navbar-signed';
import Buttombar from './components/Buttombar';
import 'bootstrap/dist/css/bootstrap.css';
import './components/font/Montserrat-Regular.ttf';
import './serviceCategories.css';

class serviceCategories extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoriesList : [],
            signedData: ''
        }
    }

    exportCategories = (e) =>{
        
    }

    componentDidMount(){
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
        for(let i=0; i < this.state.categoriesList.length; i++){
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
        if (!this.state.signedData){
            navigationBar.push(
                <div>
                    <Navbar/>
                </div>
            )
        }
        else{
            navigationBar.push(
                <div>
                    <NavbarSigned/>
                </div>
            )
        }
        return(
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