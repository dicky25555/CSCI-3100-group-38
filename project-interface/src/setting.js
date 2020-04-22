import React from 'react';
import history from './history';
import NavbarSignedSP from './components/Navbar-signedSP';
import NavbarSigned from './components/Navbar-signed';
import Buttombar from './components/Buttombar';
import "./signup.css";
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

class setting extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
            firstname: '', 
            lastname: '', 
            email: '', 
            customerPassword: '',
            formValid: false,
            apiResponse: '',
            signedData: '',
            signedDataSP: '',
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
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
	
    componentDidMount(){
        fetch("http://localhost:9000/api/customer/profile", {
        credentials: 'include'})
        .then(
            res => res.json().then( data => ({
                data: data,
                status: res.status
            })).then(res => {
                console.log(res.stats, res.data);
                this.setState({
                    signedData: res.data
                })
            }

            )
        )
        fetch("http://localhost:9000/api/service/profile", {
        credentials: 'include'})
        .then(
            res => res.json().then( data => ({
                data: data,
                status: res.status
            })).then(res => {
                console.log(res.stats, res.data);
                this.setState({
                    signedDataSP: res.data
                })
            }

            )
        )
    }

    validateChanges(value){
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
	

    onSubmitCustomer = (e, value) =>{
        e.preventDefault();
        this.validateChanges(value);
        if(this.state.formValid){
			if(value == 1){
                const signUpForm = {
                    name : this.state.firstname + " " + this.state.lastname,
                    details : "Newcomer"
                }
                var dataJSON = JSON.stringify(signUpForm);
				fetch("http://localhost:9000/api/customer/", {
                    method: 'PUT',
                    credentials: 'include',
                    body: dataJSON,
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.json())
                .then(
                    window.location.reload()
                )
			}else if(value == 2){
				const signUpForm = {
                    password: this.state.customerPassword
                }
                var dataJSON = JSON.stringify(signUpForm);
				fetch("http://localhost:9000/api/customer/", {
                    method: 'PUT',
                    credentials: 'include',
                    body: dataJSON,
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.json())
                .then(
                    window.location.reload()
                )
			}else if(value == 3){
				const signUpForm = {
                    password: this.state.customerPassword
                }
                var dataJSON = JSON.stringify(signUpForm);
				fetch("http://localhost:9000/api/customer/", {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.json())
                .then(
                    window.location.reload()
                )
			}
        }else{
            alert("Please check your form again!");
        }
    }
	

    logOutCustomer = (e) =>{
        fetch("http://localhost:9000/api/customer/logout",{
            method: 'POST',
            credentials: 'include'})
            .then( res => {
                this.props.history.push({
                    pathname:"/"
                })
            })
    }
    logOutService = (e) =>{
        fetch("http://localhost:9000/api/service/logout",{
            method: 'POST',
            credentials: 'include'})
            .then( res => {
                this.props.history.push({
                    pathname:"/"
                })
            })
    }
    render(){
        if(this.state.signedData){
            return(
            
                <div>

                    <NavbarSigned/>
                    <div className="div3" style={{height: "20%"}}>
                    <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <p class="text3"><br />
                            Hello {this.state.signedData.name} !!!
                        </p>
                        </div>
                    </div>
                    </div>
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
                                            <input onClick={e => this.onSubmitCustomer(e, 1)} type="submit" value="Confirm"/>
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
                                            <input onClick={e => this.onSubmitCustomer(e, 2)} type="submit" value="Confirm"/>
                                        </td>
                                    </tr>
                                    <br/><br/>
                                    <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.deleteAccount(e)} >Delete Account </p>
                                    <tr id="deleteAccount" style={{display:"none"}}>
                                        <td colspan="3">
                                            <input value={this.state.passwordConfirm} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwdConfirm" name="passwordConfirm" placeholder="Confirm your password" pattern=".{8,}" required/>
                                        </td>
                                        <td width="1%"></td>
                                        <td>
                                            <input onClick={e => this.onSubmitCustomer(e, 3)} type="submit" value="Confirm"/>
                                        </td>
                                    </tr>
                                    <br/><br/>
                                    <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.logOutCustomer(e)}>Log out </p>
                                    
                                </td>

                            </table>
                        </div>
                    </div>
                    <Buttombar/>
                </div>
            );
        } else if (this.state.signedDataSP){
            return(
                <div>
                    <NavbarSignedSP/>
                    <div class="row"> 
                        <div class="col-md-1"/>
                        <div class="col-md-10">
                            <br/>

                            <table>
                                <td style={{paddingTop:"30px"}}>
                                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.nameChange(e)}>Change your details </p>
                                        <tr id="newNames" style={{display:"none"}}>
                                            <td>
                                                <input value={this.state.firstname} onChange={e => this.handleChange(e)} className="inputStyle3" id="companyName" name="companyName" placeholder="Company Name" required/>
                                            </td>
                                            <td>
                                                <input value={this.state.firstname} onChange={e => this.handleChange(e)} className="inputStyle3" id="companyAddress" name="companyAddress" placeholder="Company Name" required/>
                                            </td>
                                            <td width="1%"></td>
                                            <td>
                                                <input onClick={e => this.onSubmitCustomer(e, 1)} type="submit" value="Confirm"/>
                                            </td>
                                        </tr>
                                        <br/><br/>
                                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.passwordChange(e)} >Change Password </p>
                                        <tr id="newPassword" style={{display:"none"}}>
                                            <td colspan="3">
                                                <input value={this.state.customerPassword} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwd" name="customerPassword" placeholder="New password" pattern=".{8,}" required/>
                                            </td>
                                            <td width="1%"></td>
                                            <td>
                                                <input onClick={e => this.onSubmitCustomer(e, 2)} type="submit" value="Confirm"/>
                                            </td>
                                        </tr>
                                        <br/><br/>
                                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.deleteAccount(e)} >Delete Account </p>
                                        <tr id="deleteAccount" style={{display:"none"}}>
                                            <td colspan="3">
                                                <input value={this.state.passwordConfirm} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwdConfirm" name="passwordConfirm" placeholder="Confirm your password" pattern=".{8,}" required/>
                                            </td>
                                            <td width="1%"></td>
                                            <td>
                                                <input onClick={e => this.onSubmitCustomer(e, 3)} type="submit" value="Confirm"/>
                                            </td>
                                        </tr>
                                        <br/><br/>
                                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.logOutCustomer(e)}>Log out </p>
                                        
                                    </td>


                            <td style={{paddingTop:"30px"}}>
                                <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} >Change your details </p>
                                <br/><br/>
                                <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} >Change Password </p>
                                <br/><br/>
                                <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} >Delete Account </p>
                                <br/><br/>
                                <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.logOutService(e)}>Log out </p>
                                
                            </td>

                            </table>
                        </div>
                    </div>
                    <Buttombar/>
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }
    }
}

export default setting;