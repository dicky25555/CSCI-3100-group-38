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
        this.state = {
            firstname: '', 
            lastname: '', 
            email: '', 
            password: '',
            formValid: false,
            apiResponse: ''
        };

    }
	
	
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
	
    logOut = (e) =>{
        fetch("http://localhost:9000/api/customer/logout",{
            method: 'POST',
            credentials: 'inc	lude'})
            .then( res => {
                this.props.history.push({
                    pathname:"/"
                })
            })
    }
	
	nameChange = (e) =>{
		var box = document.getElementById("newNames");
		
		if (box.style.display === "none") {
			box.style.display = "block";
		} else {
			box.style.display = "none";
		}
    }
	
	passwordChange = (e) =>{
		var box = document.getElementById("newPassword");
		
		if (box.style.display === "none") {
			box.style.display = "block";
		} else {
			box.style.display = "none";
		}
    }
	
	deleteAccount = (e) =>{
		var box = document.getElementById("deleteAccount");
		
		if (box.style.display === "none") {
			box.style.display = "block";
		} else {
			box.style.display = "none";
		}
    }
	
	validateSignUp(value){
        var inputFirstName = document.getElementById("fname");
        var inputLastName = document.getElementById("lname");
        var inputPassword = document.getElementById("pwd");
        var inputPasswordConfirm = document.getElementById("pwdConfirm");

		if(value == 1){        
			if(!inputFirstName.checkValidity()){
            alert("Check your first name !");
			} else if(!inputLastName.checkValidity()){
				alert("Check your last name !");
			} else
				this.state.formValid = true;
		}else if(value == 2){ 
			if(!inputPassword.checkValidity()){
				alert("Check your password, make sure it is at least 8 characters !");
			} else {
				this.state.formValid = true;
			}
		}else if(value == 3){ 
			if(!inputPasswordConfirm.checkValidity()){
				alert("Check your password, make sure it is at least 8 characters !");
			}  else {
				this.state.formValid = true;
			}
		}
    }
	
    onSubmit = (e, value) =>{
        e.preventDefault();
        this.validateSignUp(value);
        if(this.state.formValid){
			if(value == 1){
				
			}else if(value == 2){
				
			}else if(value == 3){
				
			}
        }else{
            alert("Please check your form again!");
        }
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
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.nameChange(e)}>Change your name </p>
						<tr id="newNames" style={{display:"none"}}>
							<td>
								<input value={this.state.firstname} onChange={e => this.handleChange(e)} className="inputStyle3" id="fname" name="firstname" placeholder="First Name" required/>
							</td>
							<td width="1%"></td>
							<td>
								<input value={this.state.secondname} onChange={e => this.handleChange(e)} className="inputStyle3" id="lname" name="lastname" placeholder="Last Name" required/>
							</td>
							<td width="1%"></td>
							<td>
								<input onClick={e => this.onSubmit(e, 1)} type="submit" value="Confirm"/>
							</td>
						</tr>
                        <br/><br/>
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.passwordChange(e)} >Change Password </p>
						<tr id="newPassword" style={{display:"none"}}>
							<td colspan="3">
								<input value={this.state.password} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwd" name="password" placeholder="New password" pattern=".{8,}" required/>
							</td>
							<td width="1%"></td>
							<td>
								<input onClick={e => this.onSubmit(e, 2)} type="submit" value="Confirm"/>
							</td>
						</tr>
                        <br/><br/>
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.deleteAccount(e)} >Delete Account </p>
						<tr id="deleteAccount" style={{display:"none"}}>
							<td colspan="3">
								<input value={this.state.password} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwdConfirm" name="password" placeholder="Confirm your password" pattern=".{8,}" required/>
							</td>
							<td width="1%"></td>
							<td>
								<input onClick={e => this.onSubmit(e, 3)} type="submit" value="Confirm"/>
							</td>
						</tr>
                        <br/><br/>
                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.logOut(e)}>Log out </p>
                        
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