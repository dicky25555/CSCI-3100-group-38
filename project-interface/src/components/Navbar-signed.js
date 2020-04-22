import React from 'react';
import './Navbar.css';

import history from './../history';
import logo from './logo.png';
import profilebutton from './profile-button.png';

import 'bootstrap/dist/css/bootstrap.css';

function NavbarSigned(){
    return(
        <div className="row" style={{backgroundColor:"white"}}>
                <table width="100%">
                    <tr width= "100%"style = {{border: "1px solid #D0D0D0"}}>
                        
                        <td width="27%" style={{paddingLeft: "2%"}}>
                            <img src={logo} width="70%" style={{paddingLeft: "25px", cursor:"pointer"}} onClick={() => history.push('/')}/>
                        </td>
                        <td width="12%">
                            <span class="service" style={{cursor:"pointer"}} onClick={() => history.push('/serviceCategories')}>Services</span>
                        </td>
                        <td width="12%">
                            <span class="service" style={{cursor:"pointer"}} onClick={() => history.push('/bookmarkPage')}>Bookmarks</span>
                        </td>
                        <td width="12%">
                            <span class="service" style={{cursor:"pointer"}} onClick={() => history.push('/mainChatBox')}>Chatbox</span>
                        </td>
                        <td align="right" style={{paddingRight:"2%", cursor:"pointer"}} onClick={() => history.push('/setting')}>
                            <img src={profilebutton} width="22%" style={{paddingTop: "5px", alignItems: "right", paddingBottom: "5px", cursor:"pointer"}} onClick={() => history.push('/signup')}/>
                        </td>

                    </tr>
                </table>
            </div>
    );
    
}

export default NavbarSigned;