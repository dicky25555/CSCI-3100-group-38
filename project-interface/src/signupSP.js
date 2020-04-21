import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Movesignbutton from './components/move-sign-button.png';
import history from './history';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import "./signup.css";
import { render } from '@testing-library/react';

class signupSP extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: '', 
            lastname: '', 
            email: '', 
            password: '',
            ID: '',
            companyName: '',
            category: '',
            address: '',
            description: '',
            formValid : false,
            categoriesList: [],  
        };
    }

    sendData(data){
        fetch("http://localhost:9000/api/service/signup", {
            method: 'POST',
            body: data,
            headers: {"Content-Type": "application/json"}
        })
            .then(res=> res.text())
            .then(res => this.setState({apiResponse: res}))

            console.log(this.state.categoriesList)
            
        
    }

    componentDidMount(){
        fetch("http://localhost:9000/api/category")
        .then(
            res => res.json().then( data => ({
                data: data,
                status: res.status
            })).then(res => {
                console.log(res.status, res.data);
                this.setState({
                    categoriesList: res.data
                })
            })
        )
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmitFirst = (e) =>{
        //f.preventDefault();
        console.log("Test")
        document.getElementById("firstForm").innerHTML = document.getElementById("secondForm").innerHTML;
        e.preventDefault();
    
    }


    validateSignUp(){
        var inputFirstName = document.getElementById("fname");
        var inputLastName = document.getElementById("lname");
        var inputEmail = document.getElementById("email");
        var inputPassword = document.getElementById("pwd");
        var inputID = document.getElementById("ID");
        var inputCompanyName = document.getElementById("companyName");
        var inputCategory = document.getElementById("category");
        var inputAddress = document.getElementById("address");
        var inputDescription = document.getElementById("description");

        if(!inputEmail.checkValidity()){
            alert("Check your email!");
        } else if(!inputPassword.checkValidity()){
            alert("Check your password, make sure it is at least 8 characters !");
        } else if(!inputID.checkValidity()){
            alert("Check your ID !");
        } else if(!inputCompanyName.checkValidity()){
            alert("Check your company name !");
        } else if(!inputCategory.checkValidity()){
            alert("Check your category !"); 
        } else if(!inputAddress.checkValidity()){
            alert("Check your address !");
        } else if(!inputDescription.checkValidity()){
            alert("Check your descriptions !");
        } else {
            this.state.formValid = true;
        }
    }

    onFinish = (e) =>{
        e.preventDefault();
        this.validateSignUp();
        
        var categoryOption = document.getElementById("category");
        var selectedCategory = categoryOption.options[categoryOption.selectedIndex].value;
        console.log(selectedCategory)

        if(this.state.formValid){
            e.preventDefault();
            console.log("test")
            const signUpForm = { 
                username: this.state.email, 
                password: this.state.password,
                name: this.state.companyName,
                category_id: selectedCategory,
                address: this.state.address,
                details: this.state.description
            }
            
            console.log(signUpForm);
            var dataJSON = JSON.stringify(signUpForm);
            console.log(dataJSON);
            this.sendData(dataJSON);
            document.getElementById("firstForm").innerHTML = document.getElementById("receipt").innerHTML;
        }else{
            alert("Please check your form again!");
        }
    }



    render(){
        
        var categoriesOptionArray = [];
        for (let count = 0; count < this.state.categoriesList.length; count++){
            categoriesOptionArray.push(
                <option value={this.state.categoriesList[count]._id}>{this.state.categoriesList[count].name}</option>
            
            )
        }

        return(
            <div>
                <Navbar/>
                <div class="row">
                    <div class="col-md-12">
                        <br /><br /><br /><br /><br />
                        <p class="text1">Let your business reach thousands</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p class="text2">In Service On Sight we make sure everyone is hassle-free.</p>
                    </div>
                </div>
                <div id="firstForm" class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <br /><br />
                        <table width="100%">
                            <tr  style={{border: "1px solid rgba(0, 0, 0, 0.5)", height: "900px"}}>
                                <td>
                                    <form action="">
                                        <center>
                                        <table border="0" width="85%">
                                            <tr>
                                                <td colspan="2"><p></p></td>
                                                <td>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <p></p><p style={{fontSize: "24px", fontWeight: "bold"}}>Let us know about you and your business!</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <input value={this.state.email} onChange={e => this.handleChange(e)} className="inputStyle3"type="email" id="email" name="email" placeholder="Email Adress" required/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <input value={this.state.password} onChange={e => this.handleChange(e)} type="password" className="inputStyle3" id="pwd" name="password" pattern=".{8,}" placeholder="Create password" required/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <input value={this.state.ID} onChange={e => this.handleChange(e)} className="inputStyle3" id="ID" name="ID" placeholder="ID card Number" required/>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td>
                                                <input value={this.state.companyName} onChange={e => this.handleChange(e)} className="inputStyle3" id="companyName" name="companyName" placeholder="Company Name" required/>
                                            </td>
                                            <td width="1%"></td>
                                            <td>
                                                <select className="inputStyle3" id="category" name="category" required>
                                                    <option value="">- Select Category -</option>
                                                    {categoriesOptionArray}
                                                </select>
                                            </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <input className="inputStyle1" value={this.state.address} onChange={e => this.handleChange(e)} id="address" name="address" placeholder="Address" required/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3">
                                                    <textarea value={this.state.description} onChange={e => this.handleChange(e)} className="inputStyle2" id="description" name="description" placeholder="Description" required/>
                                                </td>
                                            </tr>
                                            <tr></tr>
                                            <tr>
                                                <td colspan="2"><br />
                                                <input type="submit" onClick={e => this.onFinish(e)} value="Sign up"/>
                                                </td>
                                                <td><br />
                                                    <span className="signupcustomer" style={{cursor:"pointer"}} onClick={() => history.push("/signup")}><u>Sign up as a customer</u></span>
                                                </td>
                                            </tr>
                                        </table>
                                        </center>
                                    </form>
                                </td>
                            </tr>
                        </table>
                        <br/><br/>
                    </div>
                </div>
                
                <div className="row" id="receipt" style={{display:"None"}}>
                    <div class="col-md-12">
                        <br/><br/><br/>
                        <p className="text1" style={{color:"#5318FB"}}>Your registration is received</p>
                        <br/><br/><br/>
                    </div>
                </div>
                <div class="div3">
                <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <p class="text3"><br /><br /><br />
                        We serve to make sure you get the service you need, <br />in the most convenient way possible
                    </p>
                    </div>
                </div>
            </div>
                <Buttombar/>
            </div>
        );
    }
}

export default signupSP;