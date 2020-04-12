import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';


function Signup() {
    return (
        <div>
            <Navbar/>
            <div>
                <h4>This is sign up page</h4>
            </div>
        </div>

    );
  }
  
  export default Signup;