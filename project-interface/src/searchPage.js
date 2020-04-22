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


class searchPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            serviceName:'',
            location:'',
            serviceList: [],
        }  
    } 
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const signUpForm = {
            serviceName: this.state.serviceName,
            location: this.state.location
        }
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);

        this.props.history.push({
            pathname: "/searchPage",
            data: dataJSON
        })
    }

    clickService = (e, value)=>{
        console.log(value)
        e.preventDefault();
        const getService = {
            service_id: value,
        }
        var dataJSON = JSON.stringify(getService);
        console.log(dataJSON);

        this.props.history.push({
            pathname: "/serviceSpecific",
            data: dataJSON
        })
    }
    sendData(data){
        fetch("http://localhost:9000/api/bookmark", {
            method: 'POST',
            body: data,
            headers: {"Content-Type": "application/json"}
        })
            .then(res=> res.text())
            .then(res => this.setState({apiResponse: res}))

            console.log(this.state.categoriesList)
            
        
    }
    bookmarkService = (e, value)=>{
        console.log(value)
        e.preventDefault();
        const getService = {
            service_id: value,
        }
        var dataJSON = JSON.stringify(getService);
        console.log(dataJSON);

        this.sendData(dataJSON);
    }
    componentDidMount(){
        fetch("http://localhost:9000/api/service")
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
    }
    
    sendData(){

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

        var navigationBar = [];
        let servicesArray = [];
        for (let i = 0; i < this.state.serviceList.length; i++){
			if(this.state.serviceList[i].name == searchedName){
				servicesArray.push(
					<div>
					<tr>
		   
						<td style={{paddingTop:"30px"}}>
							<p class="header" style={{cursor: "pointer"}} onClick={e => this.clickService(e,this.state.serviceList[i]._id)}>this.state.serviceList[i].name</p>
						</td>
						<td style={{paddingTop:"30px", width:"60px"}}>
							<sub style={{color:"#5318FB"}} onClick={e => this.bookmarkService(e,this.state.serviceList[i]._id)}>BOOKMARK</sub>
						</td>
					</tr>
					<tr>
			
						<td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd"}}>
							<sub>serviceList[i].category_id.name</sub> <br />serviceList[i].details
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
