import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history';
import Navbar from './components/Navbar';
import NavbarSigned from './components/Navbar-signed';
import Buttombar from './components/Buttombar';
import './bookmarkPage.css';


class bookmarkPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            serviceName:'',
            location:'',
            signedData: ''
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
                        })
                    )
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
        var navigationBar = [];
        let bookmarkArray = [];
        if(this.state.signedData){
            for (let i = 0; i < 3; i++){
                bookmarkArray.push(
                    <div>
                        <tr>
                            <td style={{width:"100px", textAlign:"right", paddingTop:"30px"}}>
                                <p class="header" style={{color:"#5318FB"}}>9.7</p>
                            </td>
                            <td style={{paddingTop:"30px"}}>
                                <p class="header">Service name</p>
                            </td>
                            <td style={{paddingTop:"30px", width:"60px"}}>
                                <sub style={{color:"#5318FB"}}>REMOVE</sub>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"right", verticalAlign:"top", paddingRight:"20px", borderBottom: "1px solid #ddd"}}>
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
                    <NavbarSigned/>
                    <div class="row" style={{borderBottom:"1px solid #ddd"}}>
                        <div class="col-md-1"></div>
                        <div class="col-md-10">

                            <br /><br /><br /><br /><br /><br /><br />
                            <p class="textmain">Bookmarked by you </p>

                            <br /><br /><br />
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <table>
                                {bookmarkArray}
                            </table>
                        </div>
                    </div>
                    
                    <Buttombar/>
                </div>
            );
        }else {
            return(
                <div>
                    <Navbar/>
                    <Buttombar/>
                </div>
            )
        }
    }
}


export default bookmarkPage;