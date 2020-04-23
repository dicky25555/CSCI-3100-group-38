import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history';
import NavbarSigned from './components/Navbar-signed';
import NavbarSignedSP from './components/Navbar-signedSP';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import './chatBox.css';

import openSocket from 'socket.io-client';

//const socket = openSocket('http://localhost:9000'); <-- required module and to connect, very important, only initialize after loggedin
//socket.emit('setOnline', {id: "5e9fe6b981c18930549abdf6", status: 'C'});  <-- Determine that user online, status is C for customer or S
//socket.emit('receive', msg => {}); <-- upon receiving msg, msg can be consisting of {msg.origin: returns userid of origin, msg.content: msg}
//socket.emit('sendMessage', dest, msg) <-- send msg to server before send to dest. dest is user id of destination user, msg can be consisting of {msg.origin: returns userid of origin, msg.content: msg}
//socket.emit('disconnect', function(){}) <-- disconnect after logged out

class chatBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            serviceName:'',
            location:'',
            signedData: '',
            signedDataSP: ''
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
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const signUpForm = {
            customerName: this.state.customerName
        }
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);

        this.props.history.push({
            pathname: "/searchPage",
            data: dataJSON
        })
    }

    clickService = (e, value)=>{
        console.log(value)
    }

    //Test out list of services
    render(){
        const {data} = this.props.location;
        console.log(data);
        if(data){
        var navigationBar = [];
        if(this.state.signedData){
            navigationBar.push(
                <div>
                    <NavbarSigned/>
                </div>
            )
                let chatBoxArray = [];
                for (let i = 0; i < 3; i++){
                    chatBoxArray.push(
                        <div>
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-6">
                                    <table>
                                        <tr>

                                            <td style={{paddingTop:"30px"}}>
                                                <p style={{fontWeight:"bold", color:"white"}}>{data.name}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style={{color:"white"}}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                            </div>

                            <div class="row">
                                <div class="col-md-5"></div>
                                <div class="col-md-6">
                                    <table>
                                        <tr>

                                            <td style={{paddingTop:"30px", textAlign:"right"}}>
                                                <p style={{fontWeight:"bold", textAlign:"right", color:"white"}}>You</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}>
                                                <p style={{color:"white", textAlign:"right"}}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                        </div>
                    );
                }

                return(
                    <div>
                        {navigationBar}
                        <div class="row" style={{paddingTop:"20px"}}>
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <sub style={{color:"#5318FB"}}>Back</sub>
                            </div>
                        </div>

                        <div class="row" style={{borderBottom : "1px solid #ddd"}}>
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <p class="textmain">Chatbox</p>
                                <br /><br /><br />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <table>
                                    <tr>
                                        <td style={{paddingTop:"50px"}}>
                                            <p class="header" style={{fontSize:"25px"}}>{data.name}</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <div style={{overflowY:"scroll", overflowX:"hidden", maxHeight:"350px", backgroundColor:"black"}}>
                                    {chatBoxArray}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="row" style={{paddingTop:"50px", paddingBottom:"30px", borderBottom: "1px solid #ddd"}}>
                                <div class="col-md-1"></div>
                                <div class="col-md-10">
                                    <table align="center" width="100%">
                                        <tr>
                                            <td colspan="2">
                                                <p style={{fontSize: "18px", fontWeight: "bold"}}>Send message</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{paddingBottom:"10px", verticalAlign:"bottom"}}>
                                                <textarea style={{resize:"none"}} id="message" placeholder="Write your message here." cols="140" rows="2" ></textarea>
                                            </td>
                                            <td style={{textAlign:"right", verticalAlign:"bottom"}}>
                                                <input type="submit" value="Send" />
                                            </td>
                                        </tr>
                                    </table>



                                </div>
                            </div>
                        </div>

                        <Buttombar/>
                    </div>
                );

        }
        else if(this.state.signedDataSP){
            navigationBar.push(
                <div>
                    <NavbarSigned/>
                </div>
            )
            return(
                <div></div>
            )
        } else{
            return(
                <div></div>
            )
        }
    }else{
        this.props.history.push({
            pathname: "/mainChatBox"
        })
        return(
            <div></div>
        )
    }

    }
}


export default chatBox;
