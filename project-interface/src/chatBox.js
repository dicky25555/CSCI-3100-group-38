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
import './chatBox.css';


class chatBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            serviceName:'',
            location:''
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
        const { data } = this.props.location;
        if(data){
            var parsedData = JSON.parse(data);
            var customerName = parsedData.customerName;
            console.log(data)
        }else{
            var searchedName = '(empty name)';
        }

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
										<p style={{fontWeight:"bold", color:"white"}}>Customer name</p>
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
                <Navbar/>
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
									<p class="header" style={{fontSize:"25px"}}>Customer name</p>
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
}


export default chatBox;