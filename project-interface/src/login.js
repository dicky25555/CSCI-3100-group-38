import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import './login.css';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            apiResponse: '',
            signedData: '',
            signedDataSP: ''
        }
    }

    //Check whether the page has been logged in by customer or service provider
    componentDidMount(){
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


    //Submit the data the email and password to the backend to check whether they are valid
    sendData(data){
        fetch("http://localhost:9000/api/customer/login", {
            method: 'POST',
            credentials: 'include',
            body: data,
            headers: {"Content-Type": "application/json"}
        })
        .then((response) => {
            console.log(response);
            this.state.apiResponse = response.ok;
            console.log(this.state.apiResponse);
            //if it is not valid, there will be an alert 
            if(!response.ok){
                alert('Your username or password is wrong');
            } else{
                const loggedInStatus ={
                    signedIn: response.ok,
                    username: this.state.email
                }
                var loggedInJSON = JSON.stringify(loggedInStatus);
 
                console.log(loggedInJSON)
                this.props.history.push({
                    pathname: "/",
                    data: loggedInJSON
                })
            }
        })
        .catch(
            error => null
        )
        console.log(this.state.apiResponse);
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //Get the username and password 
    onSubmit = (e) =>{
        e.preventDefault();
        const signUpForm = {
            username: this.state.email,
            password: this.state.password
        }
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);
        this.sendData(dataJSON);
        console.log(this.state.apiResponse);

    }



    render(){
        if(!this.state.signedData && !this.state.signedDataSP){

        
            return (
                <div>
                    <Navbar/>
                    <div class="row">
                        <div class="col-md-12">
                            <br /><br /><br /><br /><br />
                            <p class="text1">Log In as a Returning Customer</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p className="text2">In Service On Sight we make sure everyone is hassle-free.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-6">
                            <br /><br />
                            <table width="100%">
                                <tr style={{border: "1px solid rgba(0, 0, 0, 0.5)", height: "430px"}}>
                                    <td>
                                        <form action="">
                                            <center>
                                            <table border="0" width="85%">
                                                <tr>
                                                    <td colspan="2">
                                                        <p style={{fontSize: "24px",fontWeight: "bold"}}><br />Log In</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <br />
                                                        <input value={this.state.email} onChange={e => this.handleChange(e)} className="inputStyle1" type="email" id="email" name="email" placeholder="Email Adress"/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <input value={this.state.password} onChange={e => this.handleChange(e)}className="inputStyle1" type="password"  id="pwd" name="password" placeholder="Password"/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input  onClick={e => this.onSubmit(e)} type="submit" value="Log In"/>
                                                    </td>
                                                    <td width="40%">
                                                        <span className="signupprovider" style={{cursor:"pointer"}} onClick={() => history.push('/loginServiceProvider')}><u>Log in as Service Provider</u></span>
                                                    </td>
                                                </tr>
                                            </table>
                                            </center>
                                        </form>
                                    </td>
                                </tr>
                            </table>
                            <br/><br/><br/>
                        </div>
                    </div>
                    <div className="div3">
                        <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <p class="text3"><br /><br /><br />
                                We serve to make sure you get the service you need, <br />in the most convenient way possible
                            </p>
                            </div>
                        </div>
                    </div>
                    <Buttombar/>
                </div>
            );
        } else{
            this.props.history.push({
                pathname: "/"
            })
            return(
                <div></div>
            )
        }
    }
}

  export default Login;
