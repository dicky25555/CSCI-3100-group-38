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
import "./signup.css";

class signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: '', 
            lastname: '', 
            email: '', 
            password: ''
        };
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const signUpForm = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);
    }
    render(){
    return (
        <div>
            <Navbar/>
            <div className="row">
                <div className="col-md-12">
                    <br /><br /><br /><br /><br />
                    <p className="text1">Receive the service you need</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <p className="text2">In Service On Sight we make sure everyone is hassle-free.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <br /><br />
                    <table width="100%">
                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.5)", height: "430px"}}>
                            <td>
                                <form action="">
                                    <center>
                                    <table border="0" width="85%">
                                        <tr>
                                            <td colspan="3">
                                                <p></p>
                                                <p style={{fontSize: "24px",fontWeight: "bold"}}>Sign up to have your own account</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input value={this.state.firstname} onChange={e => this.handleChange(e)} type="text" id="fname" name="firstname" placeholder="First Name"/>
                                            </td>
                                            <td width="1%"></td>
                                            <td>
                                                <input value={this.state.secondname} onChange={e => this.handleChange(e)} type="text" id="lname" name="lastname" placeholder="Last Name"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                <input value={this.state.email} onChange={e => this.handleChange(e)} type="text1" id="email" name="email" placeholder="Email Adress"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                <input value={this.state.password} onChange={e => this.handleChange(e)} type="text1" id="pwd" name="password" placeholder="Create password"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <input onClick={e => this.onSubmit(e)} type="submit" value="Sign up"/>
                                            </td>
                                            <td>
                                                <span className="signupprovider" style={{cursor:"pointer"}} onClick={() => history.push("/signupServiceProvider")}><u>Sign up as Service Provider</u></span>
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
    }
  }
  
  export default signup;