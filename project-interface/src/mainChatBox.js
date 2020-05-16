import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import './mainChatBox.css';
import NavbarSigned from './components/Navbar-signed';
import NavbarSignedSP from './components/Navbar-signedSP';


class mainChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            customerName:'',
            signedData: '',
            signedDataSP:'',
            previousChat: []
        }  
    } 
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //Check whether the page has been logged in by customer or service provider

    componentDidMount(){
        //Check whether the page is logged in as customer
        //If it has been logged in, the signedData will contain the customer's data
        
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
        
        //Check whether the page is logged in as service provider
        //If it has been logged in, the signedDataSP will contain the service provider's data
        
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
        
        //Get the data of previous chats 
        fetch("http://localhost:9000/api/chat/", {
                credentials: 'include'})
            .then(
                res => res.json().then( data => ({
                    data: data,
                    status: res.status
                })).then(res => {
                    console.log(res.stats, res.data);
                    this.setState({
                        previousChat: res.data
                    })
                }

                )
            )
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const signUpForm = {
            customerName: this.state.customerName,
        }
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);

        this.props.history.push({
            pathname: "/mainChatBox",
            data: dataJSON
        })
    }

    //Goes to chat page 
    goesChat = (e, data)=>{
        this.props.history.push({
            pathname:'/chatBox',
            data: data
        })
    }

    clickService = (e, value)=>{
        console.log(value)
    }


    render(){

        let customerArray = [];
        if(this.state.signedData){
            //Get all the lists of chats
            for (let i = 0; i < this.state.previousChat.length; i++){
                customerArray.push(

                    <div>
                        <tr>
                            <td style={{paddingTop:"50px"}}>
                                <p class="header" style={{fontSize:"25px"}} onClick={e => this.goesChat(e, this.state.previousChat[i].service_id)}>{this.state.previousChat[i].service_id.name}</p>
                            </td>
                        </tr>
                        <tr>
                            <td style= {{paddingBottom:"40px",paddingRight:"20px", borderBottom: "1px solid #ddd"}}>
                                {this.state.previousChat[i].content}
                            </td>
                        </tr>
                    </div>
                );
            }

            return(
                <div>
                    <NavbarSigned/>
                    <div class="row" style={{borderBottom : "1px solid #ddd"}}>
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <br /><br /><br /><br /><br /><br /><br />
                            <p class="textmain"> Chatbox</p>
                            <br /><br /><br />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <table>
                                {customerArray}
                            </table>
                        </div>
                    </div>   
                    <Buttombar/>
                </div>
            );
        } else if(this.state.signedDataSP){
            for (let i = 0; i < this.state.previousChat.length; i++){
                customerArray.push(
                    //customer boxes
                    <div>
                        <tr>
                            <td style={{paddingTop:"50px"}}>
                                <p class="header" style={{fontSize:"25px"}} onClick={e => this.goesChat(e, this.state.previousChat[i].customer_id)}>{this.state.previousChat[i].customer_id.name}</p>
                            </td>
                        </tr>
                        <tr>
                            <td style= {{paddingBottom:"40px",paddingRight:"20px", borderBottom: "1px solid #ddd"}}>
                                {this.state.previousChat[i].content}
                            </td>
                        </tr>
                    </div>
                );
            }

            return(
                <div>
                    <NavbarSignedSP/>
                    <div class="row" style={{borderBottom : "1px solid #ddd"}}>
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <br /><br /><br /><br /><br /><br /><br />
                            <p class="textmain"> Chatbox</p>
                            <br /><br /><br />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <table>
                                {customerArray}
                            </table>
                        </div>
                    </div>   
                    <Buttombar/>
                </div>
            );
        } else{
            return(
                <div></div>
            )
        }
    
    }
}


export default mainChatBox;