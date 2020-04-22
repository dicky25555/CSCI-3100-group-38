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


class mainChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            customerName:'',
            signedData: '',
            signedDataSP:''
        }  
    } 
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
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

    clickService = (e, value)=>{
        console.log(value)
    }

    //Test out list of services
    render(){
        const { data } = this.props.location;
        console.log(data);
        let customerArray = [];
        
        if(this.state.signedData){
            for (let i = 0; i < 3; i++){
                customerArray.push(
                    //customer boxes
                    <div>
                        <tr>
                            <td style={{paddingTop:"50px"}}>
                                <p class="header" style={{fontSize:"25px"}}>Customer name</p>
                            </td>
                        </tr>
                        <tr>
                            <td style= {{paddingBottom:"40px",paddingRight:"20px", borderBottom: "1px solid #ddd"}}>
                                You: Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
                            </td>
                        </tr>
                    </div>
                );
            }

            return(
                <div>
                    <Navbar/>
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
            return(
                <div></div>
            )
        } else{
            return(
                <div></div>
            )
        }
    
    }
}


export default mainChatBox;