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

class loginSP extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signedData: '',
            signedDataSP: '',
            email:'',
            password:'',
            apiResponse: ''
        }
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

    sendData(data){
        fetch("http://localhost:9000/api/service/login", {
            method: 'POST',
            credentials: 'include',
            body: data,
            headers: {"Content-Type": "application/json"}
        })
        .then((response) => {
            console.log(response);
            this.state.apiResponse = response.ok;
            console.log(this.state.apiResponse);
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
            return(
                <div>
                    <Navbar/>
                    <div class="row">
                        <div class="col-md-12">
                            <br /><br /><br /><br /><br />
                            <p class="text1">Log In as a Service Provider</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p class="text2">In Service On Sight we make sure everyone is hassle-free.</p>
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
                                                        <input value={this.state.email} onChange={e => this.handleChange(e)} type="email" className="inputStyle1" id="email" name="email" placeholder="Email Adress" required/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <input value={this.state.password} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwd" name="password" placeholder="Password" required/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input onClick={e => this.onSubmit(e)} type="submit" value="Log In"/>
                                                    </td>
                                                    <td width="40%">
                                                        <span class="signupprovider" style={{cursor:"pointer"}} onClick={() => history.push('/login')}><u>Log in as Returning Customer</u></span>
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
                        <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <p className="text3"><br /><br /><br />
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

export default loginSP;