import React from 'react';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import history from './../history';
import logo from './logo.png';
import signupbutton from './signup-button.png';
import loginbutton from './login-button.png';

import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


function Navbar() {
    return (
            <div className="row" style={{backgroundColor:"white"}}>
                <table width="100%">
                    <tr style = {{border: "1px solid #D0D0D0"}}>
                        <td width="2%"></td>
                        <td width="17%">
                            <img src={logo} width="70%" style={{paddingLeft: "25px", cursor:"pointer"}} onClick={() => history.push('/')}/>
                        </td>
                        <td width="8%">
                            <span className="service" style={{cursor:'pointer'}} onClick={()=>history.push('/serviceCategories')}>Services</span>
                        </td>
                        <td width="32%">
                            <span className="signupprovider" style={{cursor:'pointer'}} onClick={() => history.push('/signupServiceProvider')}>Sign up as service provider</span>
                        </td>
                        <td align="right">
                            <img src={signupbutton} width="22%" style={{paddingTop: "5px", alignItems: "right", paddingBottom: "5px", cursor:"pointer"}} onClick={() => history.push('/signup')}/>
                            <img src={loginbutton} width="22%" style={{paddingTop: "5px", paddingBottom: "5px", alignItems: "right", cursor:"pointer"}} onClick={() => history.push('/login')}/>
                        </td>
                    </tr>
                </table>
            </div>

    );
}


export default Navbar;