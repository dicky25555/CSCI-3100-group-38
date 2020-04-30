import React from 'react';
import history from './history';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import "./signup.css";

class signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: '', 
            lastname: '', 
            email: '', 
            password: '',
            formValid: false,
            apiResponse: '',
            signedData: '',
            signedDataSP: ''
        };
    }

	//Confirm sign up after validate.
    sendData(data){
        fetch("http://localhost:9000/api/customer/signup", {
            method: 'POST',
            body: data,
            headers: {"Content-Type": "application/json"}
        })
            .then(res=> res.text())
            .then(res => this.setState({apiResponse: res}))
            .catch(err => err);
    }

	//Handling changes
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }


	//Validate sign up after onClick
    validateSignUp(){
        var inputFirstName = document.getElementById("fname");
        var inputLastName = document.getElementById("lname");
        var inputEmail = document.getElementById("email");
        var inputPassword = document.getElementById("pwd");

        if(!inputFirstName.checkValidity()){
            alert("Check your first name !");
        } else if(!inputLastName.checkValidity()){
            alert("Check your last name !");
        } else if(!inputEmail.checkValidity()){
            alert("Check your email!");
        } else if(!inputPassword.checkValidity()){
            alert("Check your password, make sure it is at least 8 characters !");
        } else {
            this.state.formValid = true;
        }
    }


	//Handling sign up after onClick
    onSubmit = (e) =>{
        e.preventDefault();
        this.validateSignUp();
        if(this.state.formValid){
            const signUpForm = {
                username: this.state.email,
                name: this.state.firstname + " " + this.state.lastname,
                password: this.state.password,
                details : "Newcomer"
            }
            var dataJSON = JSON.stringify(signUpForm);
            console.log(dataJSON);
            document.getElementById("firstForm").innerHTML = document.getElementById("receipt").innerHTML;
            this.sendData(dataJSON);
        }else{
            alert("Please check your form again!");
        }
    }

    componentDidMount(){
		// Read whether customer users are signed in
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
		// Read whether SP users are signed in
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
    render(){
        if(!this.state.signedData && !this.state.signedDataSP){					//Confirming sign up are only for NON-SIGNED user.
            return (
                <div>
                    <Navbar/>
                    <div className="row" id="page">
                        <div className="col-md-12">
                            <br /><br /><br /><br /><br />
                            <p className="text1">Receive the service you need</p>
                        </div>
                    </div>
                    <div className="row" id="page">
                        <div className="col-md-12">
                            <p className="text2">In Service On Sight we make sure everyone is hassle-free.</p>
                        </div>
                    </div>
                    <div id="firstForm" className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <br /><br />
                            <table width="100%">
                                <tr style={{border: "1px solid rgba(0, 0, 0, 0.5)", height: "430px"}}>
                                    <td>
                                        <form action="">
                                            <center>
                                            <table border="0" width="85%">
                                                <tr>
                                                    <td colspan="3">
                                                        <p></p>
                                                        <p style={{fontSize: "24px",fontWeight: "bold"}}>Sign up to have your own account</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input value={this.state.firstname} onChange={e => this.handleChange(e)} className="inputStyle3" id="fname" name="firstname" placeholder="First Name" required/>
                                                    </td>
                                                    <td width="1%"></td>
                                                    <td>
                                                        <input value={this.state.secondname} onChange={e => this.handleChange(e)} className="inputStyle3" id="lname" name="lastname" placeholder="Last Name" required/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3">
                                                        <input value={this.state.email} onChange={e => this.handleChange(e)} className="inputStyle1" type="email" id="email" name="email" placeholder="Email Adress" required/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3">
                                                        <input value={this.state.password} onChange={e => this.handleChange(e)} type="password" className="inputStyle1" id="pwd" name="password" placeholder="Create password" pattern=".{8,}" required/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        <input onClick={e => this.onSubmit(e)} type="submit" value="Sign up"/>
                                                    </td>
                                                    <td>
                                                        <span className="signupprovider" style={{cursor:"pointer"}} onClick={() => history.push("/signupServiceProvider")}><u>Sign up as Service Provider</u></span>
                                                    </td>
                                                </tr>
                                            </table>
                                            </center>
                                        </form>
                                    </td>
                                </tr>
                            </table>
                            <br/><br/><br/>
                        </div>
                    </div>
                    <div className="row" id="receipt" style={{display:"None"}}>
                        <div class="col-md-12">
                            <br/><br/><br/>
                            <p className="text1" style={{color:"#5318FB"}}>Your registration is received</p>
                            <br/><br/><br/>
                        </div>
                    </div>
                    <div className="div3" id="page">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10">
                            <p className="text3"><br /><br /><br />
                                We serve to make sure you get the service you need, <br />in the most convenient way possible
                            </p>
                            </div>
                        </div>
                    </div>
                    <Buttombar/>
                </div>

            );
            } else{
                history.push('/')
                return(
                    <div></div>
                )
            }
    }
  }
  
  export default signup;