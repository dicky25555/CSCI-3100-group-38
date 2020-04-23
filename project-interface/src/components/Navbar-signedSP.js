import React, { Component } from 'react';
import './Navbar.css';

import history from './../history';
import logo from './logo.png';
import profilebutton from './profile-button.png';
import logoutbutton from './logout-button.png';
import 'bootstrap/dist/css/bootstrap.css';

class NavbarSignedSP extends Component{
    logOutService = (e) =>{
        fetch("http://localhost:9000/api/service/logout",{
            method: 'POST',
            credentials: 'include'})
            .then( res => {
                history.push('/');
            })
    }

    render(){
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
                                <span class="service" style={{cursor:"pointer"}} onClick={() => history.push('/mainChatBox')}>Chatbox</span>
                            </td>
                            <td align="right" style={{paddingRight:"2%", cursor:"pointer"}}>
                                <img src={profilebutton} width="22%" style={{paddingTop: "5px", alignItems: "right", paddingBottom: "5px", cursor:"pointer"}} onClick={() => history.push('/setting')}/>
                                <img src={logoutbutton} width="22%" style={{paddingTop: "5px", alignItems: "right", paddingBottom: "5px", cursor:"pointer"}} onClick={e => this.logOutService(e)}/>                        
                            </td>

                        </tr>
                    </table>
                </div>
        );
    }
    
}

export default NavbarSignedSP;