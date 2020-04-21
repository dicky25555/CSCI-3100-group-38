import React, {Component} from 'react';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import 'bootstrap/dist/css/bootstrap.css';
import './components/font/Montserrat-Regular.ttf';
import './serviceCategories.css';

class categoriesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiResponse: []
        }
        
    }
    returnPage = (e) => {
        this.props.history.push({
            pathname: "/serviceCategories",
        })
    }

    componentDidMount(){
        const {data} = this.props.location;
        if(data){
            fetch("http://localhost:9000/api/service?category_id=" + data._id +"&limit=10&page=1")
                .then(
                    res => res.json().then( data => ({
                        data: data,
                        status: res.status
                    })).then(res => {
                        console.log(res.status, res.data);
                        this.setState({
                            apiResponse: res.data
                        })
                    })
                )
        }
    }
    render(){
        const { data } = this.props.location;
        var listOfCompanies = []
        if(data){
            console.log(data.name)
            var categoryName = data.name; 

            console.log(this.state.apiResponse.name)
            for(let count = 0; count<this.state.apiResponse.length; count++){
                listOfCompanies.push(
                    <div>
                        <tr>
                            <td style={{width:"100px", textAlign:"right" ,paddingTop:"30px"}}>
                                <p class="header" style={{color:"#5318FB"}}>9.7</p>

                            </td>
                            <td style={{paddingTop:"30px"}}>
                                <p class="header">{this.state.apiResponse[count].name}</p>
                            </td>
                            <td style={{paddingTop:"30px", width:"60px"}}>
                                <sub style={{color:"#5318FB"}}>BOOKMARK</sub>
                            </td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"right", verticalAlign:"top", paddingRight:"20px",borderBottom: "1px solid #ddd"}}>
                                <sub>/10</sub>
                            </td>
                            <td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px",borderBottom: "1px solid #ddd"}}>
                                <sub>{categoryName}</sub> 
                                <br />{this.state.apiResponse[count].details}
                            </td>
                        </tr>
                    </div>
                )
            }

        }else{
            this.returnPage();
        }
        return(
            <div>
                <Navbar/>
                <div class="row" style={{paddingTop:"20px"}}>
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <sub style={{color:"#5318FB", cursor:"pointer"}} onClick={e => this.returnPage(e)}>Back to Search</sub>
                    </div>
                </div>
                <div class="row" style={{borderBottom: "1px solid #DDD", paddingBottom:"60px"}}>
                    <div class="col-md-1"></div>
                    <div class="col-md-10">

                        <br /><br /><br />
                        <table><tr><td><p class="textmain">Services in </p></td><td><p class="textmain" style={{color:"#5318FB"}}>{categoryName}</p></td></tr></table>

                        <p class="text2" style={{textAlign:"left"}}>Available services we have in your chosen category.</p>
                    </div>
            
                </div>
                <div class="row">
                    <table>
                        {listOfCompanies}
                    </table>
                </div>
                <Buttombar/>
            </div>
        );
    }
}

export default categoriesList;