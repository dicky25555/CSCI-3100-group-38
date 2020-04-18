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
import './searchPage.css';


class searchPage extends React.Component{
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
            serviceName: this.state.serviceName,
            location: this.state.location
        }
        var dataJSON = JSON.stringify(signUpForm);
        console.log(dataJSON);

        this.props.history.push({
            pathname: "/searchPage",
            data: dataJSON
        })
    }

    clickService = (e)=>{

    }

    //Test out list of services
    render(){
        const { data } = this.props.location;
        if(data){
            var parsedData = JSON.parse(data);
            var searchedName = parsedData.serviceName;
            var searchedLocation = parsedData.location;
            console.log(data)
        }else{
            var searchedName = '(empty name)';
            var searchedLocation = '(empty location)';
        }

        let servicesArray = [];
        for (let i = 0; i < 10; i++){
            servicesArray.push(
                <div>
                <tr>
                    <td style={{width:"100px", textAlign:"right", paddingTop:"30px"}}>
                        <p class="header" style={{color:"#5318FB"}}>9.7</p>
                    </td>
                    <td style={{paddingTop:"30px"}}>
                        <p class="header" style={{cursor: "pointer"}} onClick={e => this.clickService(e)}>Service name</p>
                    </td>
                    <td style={{paddingTop:"30px", width:"60px"}}>
                        <sub style={{color:"#5318FB"}}>BOOKMARK</sub>
                    </td>
                </tr>
                <tr>
                    <td style= {{textAlign:"right", verticalAlign:"top", paddingRight:"20px", borderBottom: "1px solid #ddd"}}>
                        <sub>/10</sub>
                    </td>
                    <td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd"}}>
                        <sub>Category</sub> <br />Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
                    </td>
                </tr>
                </div>
            );
        }

        return(
            <div>
                <Navbar/>
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <br /><br /><br /><br /><br /><br /><br />
                        <table><tr><td><p class="textmain">Results for: </p></td><td><p className="textmain" style={{color:"#5318FB"}}>{searchedName} in {searchedLocation}</p></td></tr></table>
                        <p className="text2" style={{textAlign:"left"}}> Search again:</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <table width="100%" bgcolor="FFFFFF">
                            <tr style={{border: "1px solid rgba(0, 0, 0, 0.5)"}}>
                                <td>
                                    <form action="">
                                        <center>
                                            <table border="0" width="95%">
                                                <tr>
                                                    <td>
                                                        <p style={{fontSize: "18px", fontWeight: "bold"}}><br />Service</p>
                                                    </td>
                                                    <td>&nbsp; &nbsp;</td>
                                                    <td colspan="4">
                                                        <p style={{fontSize: "18px", fontWeight: "bold"}}><br />Location</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input value={this.state.serviceName} onChange={e => this.handleChange(e)} type="text1" id="sname" name="serviceName" placeholder="Enter service keyword"/>
                                                    </td>
                                                    <td>&nbsp; &nbsp;</td>
                                                    <td>
                                                        <input value={this.state.location} onChange={e => this.handleChange(e)} type="text1" id="loc" name="location" placeholder="Enter your city, e.g. Sheung Wan"/>
                                                    </td>
                                                    <td>&nbsp; &nbsp;</td>
                                                    <td colspan="2">
                                                        <input onClick={e => this.onSubmit(e)} type="submit" value="Search"/>
                                                    </td>
                                                </tr>
                                            </table>
                                        </center>
                                    </form>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <br /><br /><br /><br />
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <table>
                            {servicesArray}
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


export default searchPage;