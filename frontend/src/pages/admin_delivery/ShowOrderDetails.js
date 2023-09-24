import React, {Component} from 'react';
import axios from 'axios';




export default class ShowOrderDetails extends Component {
constructor(props){
  super(props);

  this.state={
    posts:[]
  };

}

/*GeneratePDF =()=>{
  var doc = new jsPDF("p", "pt", "a4", "pdf");
  doc.html(document.querySelector('.dely'),{
         callback: function(pdf){
             pdf.save("Alldeliveries.pdf");
         }
  });
};
*/

componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("/api/posts").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts//me posts variable eka uda this.state yata use krpu ekami
      });

      console.log(this.state.posts)
    }

  });
}


  render(){
    return(
	
        <div className="container">  
        <div className="row">

      	<div className="hme">  
        <center>
        <div className="hme_hd">  
    
        <br/><br/><h3 className="zz"><b >Delivery Orders</b></h3></div>
        </center>
	</div>
    
   
        <hr/>
  
        <br/><div style={{textAlign:"right"}}className="col-lg-4">
                    
            </div>
             
        <br/> 
          <div className="con_1">
    
            <center>
          
    
          <br/>
          <table className="a1"  > 
          <thead>
          <tr>
          <th scope="col" style={{width:"7%"}}>Index</th>
              <th scope="col" style={{width:"7%"}}>Main City</th>
              <th scope="col" style={{width:"8%"}}>Address</th>
              <th scope="col" style={{width:"10%"}}>Delivery Instruction</th>
              <th scope="col" style={{width:"9%"}}>Special note about food</th>
              
          
           </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index) =>{
            
              return <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                    <a  style={{textDecoration:"none"}}>
                    {posts.MainCity}
                    </a>
                    </td>
                <td>{posts.Address}</td>
                <td>{posts.Instruction}</td>
                <td>{posts.Note}</td>
                
                
              </tr>
            })}
          </tbody>
        </table>

        </center>
        
        
        <br/>


        
        <div class="card"  >
  
  <div class="w3-container w3-black" >


 
     
    <h >RECORDS</h> 
    <br></br>
    <h>keeps a record of the orders of deliveries by online customers / buyers</h>
  </div>
</div>
        
        
        </div>
        
             
      </div>
      </div>
     
    
    )
}
}