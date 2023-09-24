import React, {Component} from 'react';
import axios from 'axios';

import'./UpdateOffers.css';


export default class UpdateOffers extends Component {
    constructor(props){
      super(props);
    
      this.state={
        offers:[]
      };
    
    }

componentDidMount(){
    this.retrieveOffers();
}
      
retrieveOffers(){
    axios.get("/api/offers").then(res =>{
        if(res.data.success){
            this.setState({
            offers:res.data.existingOffers//me posts variable eka uda this.state yata use krpu ekami
            });
      
            console.log(this.state.offers)
        }
      
    });
}

onDelete = (id) =>{

    axios.delete(`/api/offer/delete/${id}`).then((res) =>{
        
        alert("Deleted Successfully!!");
        this.retrieveOffers();
    })
  }


  filterData(offers,searchKey){
   
    const result = offers.filter((offer) =>
    offer.offerID.toLowerCase().includes(searchKey)||
    offer.offerName.toLowerCase().includes(searchKey)
  
    )
  
    this.setState({offers:result})
  }

 handleSearchArea = (e) =>{
  
     const searchKey = e.currentTarget.value;
  
     axios.get("/api/offers").then(res =>{
      if(res.data.success){
        
        this.filterData(res.data.existingOffers,searchKey)
      }
    });
  }
    render(){
        return(
	    
            <div className="container">
           
            <div className="oft">   

            <br/><button type="button" class="btn btn-dark">
            <a href="javascript: history.go(-1)" style={{textDecoration:"none", color:"white"}}> 
            <i class="fas fa-arrow-circle-left"></i>&nbsp;&nbsp;Back</a>
            </button>
            &nbsp;&nbsp;<button type="button" class="btn btn-dark">
            <a href="javascript: history.go(+1)" style={{textDecoration:"none", color:"white"}}> 
            <i class="fas fa-arrow-circle-right"></i>&nbsp;&nbsp;Next</a>
            </button>

           
           
	    <div style={{textAlign:"right"}}className="col-lg-4">
           <input
           className="form-control"
           type="search"    
           placeholder=" SEARCH OFFERS"
           name="searchQue"
           onChange={this.handleSearchArea}>
        
            </input>          
            </div>
                  
                <br/><div className="optcon">
                <center>
                <table className="opt">
		   <h3 style={{fontFamily:"-moz-initial"}}>Offerings Report</h3>
                <br/><table className="opttable" style={{width:"77%"}}>
                    <thead>
                        <tr>
                        <th scope="col" style={{width:"8%"}} >No.</th>   
                        <th scope="col" style={{width:"10%"}}>OfferID</th>
                        <th scope="col" style={{width:"12%"}}>Offer Name</th>
                        <th scope="col" style={{width:"25%"}}>Description</th>
                        <th scope="col" style={{width:"22%"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.offers.map((offers,index) =>{

                            return <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{offers.offerID}</td>
                            <td>{offers.offerName}</td>
                            <td>{offers.description}</td>
                            <td>
                                <a className="btn btn-warning" href={`/UpdateOffers2/${offers._id}`}>
                                <i className="fas fa-edit"></i>&nbsp;Update
		                        </a>
		                        &nbsp;
                                <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(offers._id)}>
                                <i className="far fa-trash-alt"></i>&nbsp;Delete
		                        </a>
                            </td>
                            </tr>
                        })}
                    </tbody>
                    <br/>
                    
                </table>
	</table>
                

                </center>
                
                
                </div><br/>
                
            </div>
            </div>
           
        )
    }
     
}