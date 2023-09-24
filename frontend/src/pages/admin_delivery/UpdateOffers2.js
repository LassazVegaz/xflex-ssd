import React, {Component} from 'react';
import axios from 'axios';
import './UpdateOffers2.css';

export default class UpdateOffers2 extends Component {

    constructor(props) {
        super(props);
        this.state={
            offerID:"",
            offerName:"",
            description:""
            
        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit=(e) =>{
        
        e.preventDefault();
        const id = this.props.match.params.id;
        const {offerID,offerName,description} = this.state;

        const data = {
            offerID:offerID,
            offerName:offerName,
            description:description
        
        }

        console.log(data)

        axios.put(`/api/offer/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Offer Details Updated Successfully!!")
                this.setState(
                    {
                        offerID:"",
                        offerName:"",
                        description:""
    
                    }
                )
            }
        })
    }

    componentDidMount(){

        const id = this.props.match.params.id;
        axios.get(`/api/offer/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    offerID:res.data.offer.offerID,
                    offerName:res.data.offer.offerName,
                    description:res.data.offer.description
                });

                console.log(this.state.post);
            }
        });

    }

        render() {
            return(
		
                <div className="container">
                <div className="offedit">
                    
                    <center>
                    <br/><h3 className="off1"><b> Update Offer Details</b></h3><hr/><br/></center>                   
                    
                    <form className="offrm">
		    <center>
                    <img height="60%" width="60%" src={'/static/images/s111.png'}/><br/><br/>
		    </center>

                        <div className="form-group" style={{marginBottom:"15px"}}>
                            <label style={{marginBottom:"5px"}}>Offer ID Number</label>
                            <input type="text"
                            className="form-control"
                            name="offerID"
                            placeholder="Enter Offer ID Number"
                            value={this.state.offerID}
                            onChange={this.handleInputChange}/>
                        </div>
    
                        <div className="form-group" style={{marginBottom:"15px"}}>
                            <label style={{marginBottom:"5px"}}>How you name the new offer ?</label>
                            <input type="text"
                            className="form-control"
                            name="offerName"
                            placeholder="Enter Offer Name"
                            value={this.state.offerName}
                            onChange={this.handleInputChange}/>
                        </div>
    
                        <div className="form-group" style={{marginBottom:"15px"}}>
                            <label style={{marginBottom:"5px"}}>What is about the new offer ?</label>
                            <input type="text"
                            className="form-control"
                            name="description"
                            placeholder="Enter the description "
                            value={this.state.description}
                            onChange={this.handleInputChange}/>
                        </div>
    			
			<center>
                        <button className="btn btn-success" type="submit" style={{marginBottom:"15px"}} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i>
                            &nbsp; Update Offer
                        </button>
                         </center>
   
                    </form>
                    
                </div>
                </div>
		
            )
    
            }
         }
        
