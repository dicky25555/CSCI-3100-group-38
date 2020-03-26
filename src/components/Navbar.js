import React from 'react';
import logo from './logo.png';

const logoStyle = {

};

function Navbar() {
    return (
        <div class='Nav-bar'>
        <div class='header-left' align='left'>
      <img src={logo} className='App-logo' alt='Logo' />
     
          </div>
    <div class='header-right' align='right'>
    <br></br>
        <button>Log in</button>
          <a></a>
          <button>Sign Up</button>
        </div>
        </div>
    );
}

export default Navbar;