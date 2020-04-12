import React from 'react';
import logo from './logo.png';

function Buttombar(){
    return (
        <div className="buttom-bar">
            <div class="header-center">
                <a>
                    <img src={logo} className='App-logo' alt='logo' height="5px"/>
                </a>
            </div>
        </div>
    );
} 

export default Buttombar;