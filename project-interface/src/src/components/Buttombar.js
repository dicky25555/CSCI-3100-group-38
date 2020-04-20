import React from 'react';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


function Buttombar(){
    return (
        <div class="div4">
            <center>
                <br /><br /><br />
                <img src={logo} width="14%"/><br />
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <p></p>
                        <p class="line"></p>
                        <p class="copyright"><br />© CSCI3100 Group 38</p>
                    </div>
                </div>
            </center>
        </div>
    );
} 

export default Buttombar;