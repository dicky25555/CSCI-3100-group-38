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
            companyName:'',
            companyAddress: '',
            servicePassword: '',
            firstname: '', 
            lastname: '', 
            email: '', 
            customerPassword: '',
            formValid: false,
            apiResponse: '',
            signedData: '',
            signedDataSP: ''
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

    //Check whether the page has been logged in by customer or service provider    
    componentDidMount(){
        //Check whether the page is logged in as customer
        //If it has been logged in, the signedData will contain the customer's data
        
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

        
        //Check whether the page is logged in as service provider
        //If it has been logged in, the signedDataSP will contain the service provider's data
        
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
                console.log(res.data)
            }
            )
        )
        
    }

    validateChangesCustomer(value){
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
		}
    }
	

    onSubmitCustomer = (e, value) =>{
        e.preventDefault();
        this.validateChangesCustomer(value);
        if(this.state.signedDataSP){
        }
        else if(this.state.signedData){
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
    
    onSubmit = (e, value) =>{
        e.preventDefault();
        this.validateChangesCustomer(value);
        //If the page is signed in as service provider 
        if(this.state.signedDataSP){
            //Change company details
            if(value == 1){
                const signUpForm = {
                    name : this.state.companyName ,
                    address : this.state.companyAddress
                }
                var dataJSON = JSON.stringify(signUpForm);
                fetch("http://localhost:9000/api/service/", {
                    method: 'PUT',
                    credentials: 'include',
                    body: dataJSON,
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.json())
                .then(
                    window.location.reload()
                )
            }else if(value == 2){
                //Change service provider's password
                const signUpForm = {
                    password: this.state.servicePassword
                }
                var dataJSON = JSON.stringify(signUpForm);
                fetch("http://localhost:9000/api/service/", {
                    method: 'PUT',
                    credentials: 'include',
                    body: dataJSON,
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.json())
                .then(
                    window.location.reload()
                )
            }else if(value == 3){
                //Delete service provider's account
                fetch("http://localhost:9000/api/service/", {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.json())
                .then(
                    window.location.reload()
                )
            }
        }
        
        //If the page is signed in as customer
        else if(this.state.signedData){
			if(value == 1){
                //Change customer's name 
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
                //Change customer's password
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
                //Delete customer's account
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

    //Logout as customer and return to home page
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

    //Logout as service provier and return to home page
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
        console.log(this.state.signedDataSP);

        //If the page is signed in as customer
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
                                    <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.onSubmitCustomer(e, 3)} >Delete Account </p>
                                    <tr id="deleteAccount" onClick={e => this.onSubmit(e, 3)} style={{display:"none"}}>
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
        } 
        else 
        if (this.state.signedDataSP){
            //If the page is signed is as service provider
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
                                                <input value={this.state.companyName} onChange={e => this.handleChange(e)} className="inputStyle3" id="companyName" name="companyName" placeholder="Company Name" required/>
                                            </td>
                                            <td>
                                                <input value={this.state.companyAddress} onChange={e => this.handleChange(e)} className="inputStyle3" id="companyAddress" name="companyAddress" placeholder="Company Address" required/>
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
                                                <input value={this.state.customerPassword} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwd" name="customerPassword" placeholder="New password" pattern=".{8,}" required/>
                                            </td>
                                            <td width="1%"></td>
                                            <td>
                                                <input onClick={e => this.onSubmit(e, 2)} type="submit" value="Confirm"/>
                                            </td>
                                        </tr>
                                        <br/><br/>
                                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.onSubmit(e, 3)} >Delete Account </p>
                                        
                                        <br/><br/>
                                        <p class="header" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd" , cursor: "pointer"}} onClick={e => this.logOutCustomer(e)}>Log out </p>
                                        
                                    </td>


                            

                            </table>
                        </div>
                    </div>
                    <Buttombar/>
                </div>
            )
        }else {
            // If the page is neither signed in as customer and service provider, 
            // will return to home page immediately 
            return(
                <div></div>
            )
        }
    }
}

export default setting;