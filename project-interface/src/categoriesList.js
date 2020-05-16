import React, {Component} from 'react';
import NavbarSigned from './components/Navbar-signed';
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import 'bootstrap/dist/css/bootstrap.css';
import './components/font/Montserrat-Regular.ttf';
import './serviceCategories.css';
import NavbarSignedSP from './components/Navbar-signedSP';

class categoriesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiResponse: [],
            signedData: '',
            signedDataSP: ''
        }
        
    }
    returnPage = (e) => {
        this.props.history.push({
            pathname: "/serviceCategories",
        })
    }

    //Check whether the page has been logged in by customer or service provider
    
    componentDidMount(){
        const {data} = this.props.location;

        //Get the data from serviceCategories which contain the data regarding the selected category
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
                //Check whether the page is logged in as customer
                //If it has been logged in, the signedData will contain the customer's data
        
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

                //Check whether the page is logged in as service provider
                //If it has been logged in, the signedDataSP will contain the service provider's data
        
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

    }

    //Push to the serviceSpecific page if the company is selected
    goesSpecificService = (e, companyData) =>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/serviceSpecific",
            data: companyData
        })
    }

    render(){
        const { data } = this.props.location;
        var listOfCompanies = [];
        var navigationBar = [];
        if(data){
            console.log(data.name)
            var categoryName = data.name; 

            console.log(this.state.apiResponse.name)
            //Show all the companies based on category
            for(let count = 0; count<this.state.apiResponse.length; count++){
                listOfCompanies.push(
                    <div>
                        <tr>

                            <td style={{paddingTop:"30px"}}>
                                <p class="header" style={{cursor:"pointer"}} onClick={e => this.goesSpecificService(e, this.state.apiResponse[count])}>{this.state.apiResponse[count].name}</p>
                            </td>
                        </tr>

                        <tr>

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
        if (this.state.signedData){
            navigationBar.push(
                <div>
                    <NavbarSigned/>
                </div>
            )
        }else if(this.state.signedDataSP){
            navigationBar.push(
                <div>
                    <NavbarSignedSP/>
                </div>
            )
        }
        else{ 
            navigationBar.push(
                <div>
                    <Navbar/>
                </div>
            )
        }
        return(
            <div>
                <div>
                    {navigationBar}
                </div>
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
                    
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                    <table>
                        {listOfCompanies}
                    </table>
                    </div>
                </div>
                <Buttombar/>
            </div>
        );
    }
}

export default categoriesList;