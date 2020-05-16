import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history';
import Navbar from './components/Navbar';
import NavbarSigned from './components/Navbar-signed';
import Buttombar from './components/Buttombar';
import './searchPage.css';
import NavbarSignedSP from './components/Navbar-signedSP';


class searchPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signedDataSP:'',
            signedData:'',
            serviceName:'',
            location:'',
            serviceList: [],
        }  
    } 

    //Handle the changes of input in the search box
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //Submit serviceName and location that is typed on the search box and update the searchPage
    onSubmit = (e) =>{
        e.preventDefault();
        const signUpForm = {
            serviceName: this.state.serviceName,
            location: this.state.location
        }
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);
        
        this.getService(signUpForm);
        /*
        this.props.history.push({
            pathname: "/searchPage",
            data: dataJSON
        })
        */
       console.log(this.state.serviceList);
    }

    //get the data from the backend with the parameter from onSubmit and show the data
    getService(data){
        console.log(data.serviceName)
        this.setState({
            serviceList: []
        })
        fetch("http://localhost:9000/api/service?name=" + data.serviceName + "&address=" + data.location + "&limit=10&page=1", {
                credentials: 'include',
                method: 'GET',
                headers: {"Content-Type" : "application/json"}
            })
            .then(
                res => res.json().then( data => ({
                    data: data,
                    status: res.status
                })).then(res => {
                    console.log(res.status, res.data);
                    this.setState({
                        serviceList: res.data
                    })
                })
            )            
        console.log(this.state.serviceList)
        
    }
    /*
    Check whether the page is logged in as customer or service provider or none.
    If the page is a result of transition from main page with parameter for searching,
    it will query to the backend to get the data with the parameters
    */
    componentDidMount(){
        const {data} = this.props.location;
        
        console.log(data)
        
        //If there is searchBox data being passed from the main page,
        //it will query from the backend and show the data that is obtained
        if(data){
            var parsedData = JSON.parse(data)
            console.log(parsedData.serviceName)
            fetch("http://localhost:9000/api/service?name=" + parsedData.serviceName + "&address=" + parsedData.location + "&limit=10&page=1", {
                credentials: 'include',
                method: 'GET',
                headers: {"Content-Type" : "application/json"}
            })
            .then(
                res => res.json().then( data => ({
                    data: data,
                    status: res.status
                })).then(res => {
                    console.log(res.status, res.data);
                    this.setState({
                        serviceList: res.data
                    })
                })
            )  
        } else{
            fetch("http://localhost:9000/api/service?limit=25&page=1", {
                credentials: 'include',
                method: 'GET',
                headers: {"Content-Type" : "application/json"}
            })
            .then(
                res => res.json().then( data => ({
                    data: data,
                    status: res.status
                })).then(res => {
                    console.log(res.status, res.data);
                    this.setState({
                        serviceList: res.data
                    })
                })
            )  
        }      

        //Check whether the page is logged in as customer
        //If it has been logged in, the signedData will contain the customer's data
        
		fetch("http://localhost:9000/api/customer/profile", {
        credentials: 'include'})
        .then(
            res => res.json().then( data => ({
                data: data,
                status: res.status
            })).then(res => {
                console.log(res.stats, res.data);
                this.setState({
                    signedData: res.data
                })
            }

            )
        )
        
        //Check whether the page is logged in as service provider
        //If it has been logged in, the signedDataSP will contain the service provider's data
        
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
    
    serviceSpecific = (e, companyData) => {
        e.preventDefault();
        this.props.history.push({
            pathname:"/serviceSpecific",
            data: companyData
        })
    }
    //Test out list of services
    render(){
        const { data } = this.props.location;
        if(data){
            var parsedData = JSON.parse(data);
            var searchedName = parsedData.serviceName;
            var searchedLocation = parsedData.location;
            console.log(data)
        }else{
            var searchedName = '(empty name)';
            var searchedLocation = '(empty location)';
        }

        console.log(this.state.serviceList.length);
        var navigationBar = [];
        let servicesArray = [];
        for (let i = 0; i < this.state.serviceList.length; i++){

				servicesArray.push(
					<div>
					<tr>
		   
						<td style={{paddingTop:"30px"}}>
							<p class="header" style={{cursor: "pointer", color:"#5318FB"}} onClick={e => this.serviceSpecific(e, this.state.serviceList[i])}>{this.state.serviceList[i].name}</p>
						</td>

					</tr>
					<tr>
			
						<td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px"}}>
							<sub>{this.state.serviceList[i].category_id.name}</sub> <br />{this.state.serviceList[i].details}
						</td>
					</tr>
                    <tr>
						<td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd"}}>
							<br />{this.state.serviceList[i].address}
						</td>
					</tr>
                    <br/>
					</div>
                );
			
        }
		
        if (this.state.signedData){
            navigationBar.push(
                <div>
                    <NavbarSigned/>
                </div>
            )
        }else if(this.state.signedDataSP){
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

        return(
            <div>
                <div>
                    {navigationBar}
                </div>
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <br /><br /><br /><br /><br /><br /><br />
                        <table><tr><td><p class="textmain">Results for: </p></td><td><p className="textmain" style={{color:"#5318FB"}}>{searchedName} in {searchedLocation}</p></td></tr></table>
                        <p className="text2" style={{textAlign:"left"}}> Search again:</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <table width="100%" bgcolor="FFFFFF">
                            <tr style={{border: "1px solid rgba(0, 0, 0, 0.5)"}}>
                                <td>
                                    <form action="">
                                        <center>
                                            <table border="0" width="95%">
                                                <tr>
                                                    <td>
                                                        <p style={{fontSize: "18px", fontWeight: "bold"}}><br />Service</p>
                                                    </td>
                                                    <td>&nbsp; &nbsp;</td>
                                                    <td colspan="4">
                                                        <p style={{fontSize: "18px", fontWeight: "bold"}}><br />Location</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input value={this.state.serviceName} onChange={e => this.handleChange(e)} type="text1" id="sname" name="serviceName" placeholder="Enter service keyword"/>
                                                    </td>
                                                    <td>&nbsp; &nbsp;</td>
                                                    <td>
                                                        <input value={this.state.location} onChange={e => this.handleChange(e)} type="text1" id="loc" name="location" placeholder="Enter your city, e.g. Sheung Wan"/>
                                                    </td>
                                                    <td>&nbsp; &nbsp;</td>
                                                    <td colspan="2">
                                                        <input onClick={e => this.onSubmit(e)} type="submit" value="Search"/>
                                                    </td>
                                                </tr>
                                            </table>
                                        </center>
                                    </form>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <br /><br /><br /><br />
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <table>
                            {servicesArray}
                        </table>
                    </div>
                    <div class="div3">
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <p class="text3">
                                    <br /><br /><br />
                                    We serve to make sure you get the service you need, <br />in the most convenient way possible
                                </p>
                            </div>
                        </div>
                    </div> 
                    </div>   
                <Buttombar/>
            </div>
        );
    }
}


export default searchPage;
