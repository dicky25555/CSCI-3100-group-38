import React from 'react';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import history from './../history'
import logo from './logo.png';

const logoStyle = {

};

function Navbar() {
    return (
      <div class='Nav-bar'>
        <div class="header-left">    
            <a>
                <img src={logo} className='App-logo' alt='Logo'/>        
            </a>
            <a>
                
            </a>
            <a>

            </a>
        </div>
        <div class="header-right">
            <br></br>
            <a>
                <button className = 'Navbar-button-login' onClick={() => history.push('/login')}>Log in</button>
            </a>
            <a>
                <button className = 'Navbar-button-signup'onClick={() => history.push('/signup')}>Sign Up</button>
            </a>
        </div>
      </div>

    );
}

function Login(){
  return <div>Login page</div>
}

export default Navbar;