import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import './App.css';


function Login() {
    return (
        <div>
            <Navbar/>
        </div>
    );
  }
  
  export default Login;