import React from 'react';
import history from './history';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';

class serviceSpecific extends React.Component{
    

    render(){
        return(
            <div>
                <Navbar/>
                    <div class="row" style={{paddingTop:"20px"}}>
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <sub style={{color:"#5318FB"}}>Back to Search</sub>
                        </div>
                    </div>
            <div class="row" style={{borderBottom: "1px solid #DDD", paddingBottom:"60px", paddingTop:"60px"}}>
                <div class="col-md-1"></div>
                <div class="col-md-10">

                    <table>
                        <tr>
                            <td style={{width:"100px", textAlign:"right", paddingTop:"30px"}}>
                                <p class="header" style={{color:"#5318FB"}}> 9.7</p>

                            </td>
                            <td style={{paddingTop:"30px"}}>
                                <p class="header">Service name</p>
                            </td>
                            <td style={{paddingTop:"30px", width:"60px"}}>
                                <sub style={{color:"#5318FB"}}>BOOKMARK</sub>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"right", verticalAlign:"top", paddingRight:"20px"}}>
                                <sub>/10</sub>
                            </td>
                            <td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px"}}>
                                <sub>Category</sub> <br />Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" style={{textAlign:"right"}}>
                                <input type="submit" value="Order Service"/>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
            <div>
                    <div class="row" style={{paddingTop:"50px", paddingBottom:"30px", borderBottom: "1px solid #DDD"}}>
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <table align="center" width="60%">
                                <tr>
                                    <td>
                                        <p style={{fontSize: "18px", fontWeight: "bold"}}>Add your review</p>
                                        Tell the community your experience.
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px"}}>
                                        <input type="number" id="rating" name="rating" placeholder="10" style={{width:"50px"}} /><sub>/10</sub>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px"}}>
                                        <textarea id="review" placeholder="Write your review here" cols="100" rows="4"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:"right"}}>
                                        <input type="submit" value="Post"/>
                                    </td>
                                </tr>
                            </table>
                            
                            
                        
                    </div>
                </div>
            </div>


    <div class="row">

        <div class="col-md-1"></div>
        <div class="col-md-10">
            <table>
                <tr>
                    <td style={{width:"100px", textAlign:"right" ,paddingTop:"30px"}}>
                        <p class="header" style={{color:"#5318FB", fontSize:"30px"}}> 9<sub>/10</sub></p>

                    </td>
                    <td style={{paddingTop:"30px"}}>
                        <p style={{fontWeight:"bold"}}>Review1 Title</p>
                    </td>
                </tr>
                <tr>
                    <td style={{textAlign:"right", verticalAlign:"top", paddingRight:"20px"}}></td>
                    <td style={{paddingRight:"20px"}}>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style={{paddingBottom:"40px", textAlign:"right", borderBottom: "1px solid #ddd"}}>
                        <sub>Username</sub>
                    </td>
                </tr>
                
            </table>
        </div>
        </div>

                <Buttombar/>
            </div>
        );

    }
}

export default serviceSpecific;