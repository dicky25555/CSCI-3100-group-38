import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Movesignbutton from './components/move-sign-button.png';
import history from './history';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import "./signup.css";
import { render } from '@testing-library/react';

class signupSP extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: '', 
            lastname: '', 
            email: '', 
            password: '',
            ID: '',

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
            password: this.state.password,
            ID: this.state.ID
        }
        console.log(signUpForm);
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div class="row">
                    <div class="col-md-12">
                        <br /><br /><br /><br /><br />
                        <p class="text1">Let your business reach thousands</p>
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
                            <tr style={{border: "1px solid rgba(0, 0, 0, 0.5)", height: "550px"}}>
                                <td>
                                    <form action="">
                                        <center>
                                        <table border="0" width="85%">
                                            <tr>
                                                <td colspan="2"><p></p></td>
                                                <td>
                                                    <img src={Movesignbutton} align="right" width="20%"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <p></p><p style={{fontSize: "24px", fontWeight: "bold"}}>Sign up to start!</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input value={this.state.firstname} onChange={e => this.handleChange(e)} type="text" id="fname" name="firstname" placeholder="First Name"/>
                                                </td>
                                                <td width="1%"></td>
                                                <td><input value={this.state.lastname} onChange={e => this.handleChange(e)} type="text" id="lname" name="lastname" placeholder="Last Name"/></td>
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
                                                <td colspan="3">
                                                    <input value={this.state.ID} onChange={e => this.handleChange(e)}type="text1" id="idcard" name="idcardnum" placeholder="ID card number"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><br />
                                                <input type="submit" onClick={(e) => this.onSubmit(e)} value="Sign up"/>
                                                </td>
                                                <td><br />
                                                    <span className="signupcustomer" style={{cursor:"pointer"}} onClick={() => history.push("/signup")}><u>Sign up as a customer</u></span>
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
                    <p class="text3"><br /><br /><br />
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

export default signupSP;