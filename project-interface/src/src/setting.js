import React from 'react';
import history from './history';
import NavbarSigned from './components/Navbar-signed';
import Buttombar from './components/Buttombar';
import "./signup.css";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

class setting extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
        <div>
            <NavbarSigned/>
            <div class="row"> 
                <div class="col-md-1"/>
                <div class="col-md-10">
                    <br/>

                    <table>

                    <td style={{paddingTop:"30px"}}>
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} >Change your name </p>
                        <br/><br/>
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} >Change Password </p>
                        <br/><br/>
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} >Delete Account </p>
                        <br/><br/>
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} >Log out </p>
                        
                    </td>

                    </table>
                </div>
            </div>
            <Buttombar/>
        </div>
        );
    }
}

export default setting;