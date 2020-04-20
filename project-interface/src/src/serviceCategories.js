import React, {Component} from 'react';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import 'bootstrap/dist/css/bootstrap.css';
import './components/font/Montserrat-Regular.ttf';
import './serviceCategories.css';

class serviceCategories extends Component{
    exportCategories = (e) =>{
        
    }

    render(){
        let categoriesArray = [];
        for(let i=0; i < 9; i++){
            if(i%2 == 0){
                categoriesArray.push(
                    <div>
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <table>
                                <tr>
                                    <td style={{paddingTop:"30px"}}>
                                        <p style={{fontWeight:"bold" ,color:"#5318fb"}}>Category {i + 1}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                );
            } else{
                categoriesArray.push(
                    <div>
                    <div class="col-md-1"></div>
                    <div class="col-md-4">
                        <table>
                            <tr>
                                <td style={{paddingTop:"30px"}}>
                                    <p style={{fontWeight:"bold", color:"#5318fb"}}>Category 2</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-1"></div>
                    </div>
                );
            }
        }
        return(
            <div>
                <Navbar/>
                <div class="row" style={{borderBottom: "1px solid #DDD", paddingBottom:"60px",paddingTop:"20px"}}>
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <br /><br /><br />
                        <p class="textmain">Categories</p>
                        <p class="text2" style={{textAlign:"left"}}>Search for the service you need from the following categories:</p>
                    </div>
                </div>
                <div class="row">
                    
                    <div class="col-md-1"></div>
                    <div class="col-md-4">
                        <table>
                            <tr>

                                <td style={{paddingTop:"30px"}}>
                                    <p style={{fontWeight:"bold", color:"#5318fb"}}>Category 2</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-1"></div>
                    
                </div>
                <Buttombar/>
            </div>
        );
    }
}

export default serviceCategories;