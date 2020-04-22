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
            signedData: '',
            bookmarkList: []
        }  
    } 
    removeBookmark = (e, id) => {
        fetch("http://localhost:9000/api/bookmark/" + id, {
            credentials: 'include',
            method: 'DELETE',
            headers: {"Content-Type" : "application/json"}
        })
        .then(
            res => console.log(res)
        )
        .then(
            window.location.reload()
        )
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
        console.log(this.state.signedData)
        fetch("http://localhost:9000/api/bookmark?customer_id=" + this.state.signedData._id + "&limit=10&page=1",{
            credentials: 'include',
            method: 'GET',
            headers: {"Content-Type" : "application/json"}
        }).then(res => res.json()
            .then(data => ({
                data: data,
                status: res.status
            }))
            .then(res => {
                console.log(res.status, res.data)
                this.setState({
                bookmarkList: res.data
            })
        })
        )
        }


    //Test out list of services
    render(){
        console.log(this.state.signedData)
        let bookmarkArray = [];
        
        console.log(this.state.bookmarkList);
    
        console.log(this.state.bookmarkList)
        if(this.state.signedData){
            if(this.state.bookmarkList){
            for (let i = 0; i < this.state.bookmarkList.length; i++){
                bookmarkArray.push(
                    <div>
                        <tr>
                            <td style={{width:"100px", textAlign:"right", paddingTop:"30px"}}>
                                <p class="header" style={{color:"#5318FB"}}>9.7</p>
                            </td>
                            <td style={{paddingTop:"30px"}}>
                                <p class="header">{this.state.bookmarkList[i].service_id.name}</p>
                            </td>
                            <td style={{paddingTop:"30px", width:"60px"}}>
                                <sub style={{color:"#5318FB", cursor:"pointer"}} onClick={e => this.removeBookmark(e, this.state.bookmarkList[i]._id)}>REMOVE</sub>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"right", verticalAlign:"top", paddingRight:"20px", borderBottom: "1px solid #ddd"}}>
                                <sub>/10</sub>
                            </td>
                            <td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px", borderBottom:"1px solid #ddd"}}>
                                <sub>Category</sub> <br />{this.state.bookmarkList[i].service_id.details}
                            </td>
                        </tr>
                    </div>
                );
            }
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