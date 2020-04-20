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
        }  
    } 
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
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
        if(data){
            var parsedData = JSON.parse(data);
            var choseCustomer = parsedData.customerName;
            console.log(data)
        }else{
            var choseCustomer = '(empty name)';
        }

        let customerArray = [];
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
                        <br />Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
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
						<p className="textmain"> Chatbox</p>
						<br /><br />
                    </div>
                </div>

                <br />
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <table>
                            {customerArray}
                        </table>
                    </div>
                    <div class="div3">
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <p class="text3">
                                    <br /><br /><br />
                                    We serve to make sure you get the service you need, <br />in the most convenient way possible
                                </p>
                            </div>
                        </div>
                    </div> 
                    </div>   
                <Buttombar/>
            </div>
        );
    }
}


export default mainChatBox;