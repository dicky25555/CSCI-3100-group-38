import React from 'react';
import history from './history';
import NavbarSigned from './components/Navbar-signed'
import Navbar from './components/Navbar';
import Buttombar from './components/Buttombar';
import NavbarSignedSP from './components/Navbar-signedSP';

class serviceSpecific extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            signedDataSP:'',
            signedData: '',
            reviewText: '',
            rating: '',
            reviewData:[]
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    returnPage = (e) => {
        this.props.history.push({
            pathname: "/serviceCategories",
        })
    }

    returnPrevious = (e, category) => {
        this.props.history.push({
            pathname: "/categoriesList",
            data: category,
            headers: {"Content-Type": "application/json"}
        })
    }

    submitBookmark(data){
        fetch("http://localhost:9000/api/bookmark/", {
            credentials: 'include',
            method: 'POST',
            body: data,
            headers: {"Content-Type": "application/json"}
        }).then(
            res => res.json()
        ).then(
            res => console.log(res)
        )
    }

    bookmarkService = (e, serviceId) => {
        if(this.state.signedData){
            console.log(this.state.signedData._id)
            console.log(serviceId)
            const data = {
                service_id: serviceId,
                customer_id: this.state.signedData._id
            }
            console.log(data)
            var dataJSON = JSON.stringify(data)
            console.log(dataJSON)
            this.submitBookmark(dataJSON)
        }else{
            alert("You have to signed in as customer");
        }
    }

    postReview = (e, serviceId) => {
        e.preventDefault();
        console.log(this.state.reviewText);
        console.log(this.state.rating);
        console.log(serviceId);
        if(this.state.signedData){
            if (this.state.reviewText && this.state.rating ){
                const data = {
                    service_id: serviceId,
                    rating: this.state.rating,
                    customer_review: this.state.reviewText
                }
                var dataJSON = JSON.stringify(data);
                fetch("http://localhost:9000/api/review/",{
                    credentials: 'include',
                    method: 'POST',
                    body: dataJSON,
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.text())
                .then(res => console.log(res))
                .then(fetch("http://localhost:9000/api/review?service_id=" + serviceId + "&limit=10&page=1",{
                    credentials: 'include',
                    method: 'GET',
                    headers: {"Content-Type" : "application/json"}
                }).then(res => res.json()
                .then(data => ({
                    data: data,
                    status: res.status
                })))
                .then(res =>{
                    console.log(res.status, res.data)
                    this.setState({
                        reviewText: '',
                        reviewData: res.data
                    })
                }))

            } else{
                alert("Input your review accordingly!")
            }
        } else{
            alert("You have to sign in as customer");
        }
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
        const { data } = this.props.location;
        
        if(data){
            fetch("http://localhost:9000/api/review?service_id=" + data._id + "&limit=10&page=1",{
                credentials: 'include',
                method: 'GET',
                headers: {"Content-Type" : "application/json"}
            }).then(res => res.json()
            .then(data => ({
                data: data,
                status: res.status
            })))
            .then(res =>{
                console.log(res.status, res.data)
                this.setState({
                    reviewData: res.data
                })
            })

            console.log(this.state.reviewData)
        }
    }

    goesToChat = (e, data)=>{
        if(this.state.signedData){
        this.props.history.push({
            pathname:'/chatbox',
            data: data
        })    
        }else{
            alert("You have to signed in as customer");
        }
    }

    render(){
        var reviewList = [];
        const { data } = this.props.location;
        if(data){
            var navigationBar = [];
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

            for(let count = 0; count < this.state.reviewData.length; count++){
                var reviewerName = ''
                if(this.state.reviewData[count].customer_id){
                    reviewerName = this.state.reviewData[count].customer_id.name
                }else {
                    reviewerName = 'Former User'
                }
                reviewList.push(
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10">
                            <table>
                                <tr>
                                    <td style={{width:"100px", textAlign:"right" ,paddingTop:"30px"}}>
                                        <p class="header" style={{color:"#5318FB", fontSize:"30px"}}> {this.state.reviewData[count].rating}<sub>/10</sub></p>

                                    </td>
                                    <td style={{paddingTop:"30px"}}>
                                        <p style={{fontWeight:"bold"}}>{reviewerName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign:"right", verticalAlign:"top", paddingRight:"20px"}}></td>
                                    <td style={{paddingRight:"20px"}}>
                                        {this.state.reviewData[count].customer_review}
                                    </td>
                                </tr>
                                
                            </table>
                        </div>
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
                                <sub style={{color:"#5318FB", cursor:"pointer"}} onClick={e => this.returnPrevious(e, data.category_id)}>Back to Search</sub>
                            </div>
                        </div>
                <div class="row" style={{borderBottom: "1px solid #DDD", paddingBottom:"60px", paddingTop:"60px"}}>
                    <div class="col-md-1"></div>
                    <div class="col-md-10">

                        <table>
                            <tr>

                                <td style={{paddingTop:"30px"}}>
                                    <p class="header">{data.name}</p>
                                </td>
                                <td style={{paddingTop:"30px", width:"60px"}}>
                                    <sub style={{color:"#5318FB", cursor:"pointer"}} onClick={e => this.bookmarkService(e, data._id)}>BOOKMARK</sub>
                                </td>
                            </tr>
                            <tr>

                                <td colspan="2" style={{paddingBottom:"40px", paddingRight:"20px"}}>
                                    <sub>{data.category_id.name}</sub> 
                                    <br />{data.details}
                                </td>
                            </tr>
                            <tr>
                                    <td colspan="3" style={{textAlign:"right"}}>
                                        <input type="submit" onClick={e => this.goesToChat(e, data)} value="Chat Them"/>
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
                                            <input type="number" value={this.state.rating} onChange={e => this.handleChange(e)} id="rating" name="rating" min="0" max="10" placeholder="10" style={{width:"50px"}} /><sub>/10</sub>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px"}}>
                                            <textarea value={this.state.reviewText} onChange={e => this.handleChange(e)} name="reviewText"  id="reviewText" placeholder="Write your review here" cols="100" rows="4"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign:"right"}}>
                                            <input onClick={e => this.postReview(e, data._id)} type="submit" value="Post"/>
                                        </td>
                                    </tr>
                                </table>
                                
                                
                            
                        </div>
                    </div>
                </div>
                <div>
                    {reviewList}
                </div>

        

                    <Buttombar/>
                </div>
            );

        } else{
            this.returnPage();
            
                return(
                    <div></div>
                );
            
        }
    }
}

export default serviceSpecific;