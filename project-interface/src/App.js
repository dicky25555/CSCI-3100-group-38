import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NavbarSigned from './components/Navbar-signed';
import NavbarSignedSP from './components/Navbar-signedSP';
import Buttombar from './components/Buttombar';
import './components/font/Montserrat-Regular.ttf';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            signedData: '',
            signedDataSP: '',
            serviceName: '',
            location: ''
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

    componentDidMount(){
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

    render(){

        const { data } = this.props.location;
        if(data){
            var parsedData = JSON.parse(data);
            this.state.email = data.username;
            this.state.signedIn = true;
            console.log(parsedData);
        }
        console.log(this.state.signedData);
        var navigationBar = [];
        if (!this.state.signedData && !this.state.signedDataSP){
            navigationBar.push(
                <div>
                    <Navbar/>
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
                    <NavbarSigned/>
                </div>
            )
        }
        return (
            <div>
                <div>
                    {navigationBar}
                </div>
                <div class="row" style={{backgroundColor:"black"}}>
                <div class="col-md-1"></div>
                <div class="col-md-10">

                    <br /><br /><br /><br /><br /><br /><br />
                    <p class="textmain" style={{color:"white"}}>Search the service you need</p>
                </div>
            </div>

            <div class="row" style={{backgroundColor:"black", paddingBottom:"300px"}}>
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <br /><br />
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
                                                    <p style={{fontSize: "18px",fontWeight: "bold"}}><br />Location</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{paddingBottom:"20px"}}>
                                                    <input value={this.state.serviceName} onChange={e => this.handleChange(e)} type="text1" id="sname" name="serviceName" placeholder="Enter service keyword"/>
                                                </td>
                                                <td>&nbsp; &nbsp;</td>
                                                <td style={{paddingBottom:"20px"}}>
                                                    <input value={this.state.location} onChange={e => this.handleChange(e)} type="text1" id="loc" name="location" placeholder="Enter your city, e.g. Sheung Wan"/>
                                                </td>
                                                <td>&nbsp; &nbsp;</td>
                                                <td colspan="2" style={{paddingBottom:"20px"}}>
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
            <Buttombar/>
            </div>

        );
    }
}

export default App;
