import React, {Component} from 'react';
import axios from 'axios';
import './DeliveryHome.css';



export default class DeliveryHome extends Component {
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

onDelete = (id) =>{

  axios.delete(`/api/post/delete/${id}`).then((res) =>{
    alert("Deleted Successfully!!");
    this.retrievePosts();
  })
}

filterData(posts,searchKey){
   
  const result = posts.filter((post) =>
  post.MainCity.toLowerCase().includes(searchKey)
  
  )

  this.setState({posts:result})
}

handleSearchArea = (e) =>{

   const searchKey = e.currentTarget.value;

   axios.get("/api/posts").then(res =>{
    if(res.data.success){
      
      this.filterData(res.data.existingPosts,searchKey)
    }
  });
}

  render(){
    return(
	<div className="background1">
        <div className="container">  
        <div className="row">

      	<div className="hme">  
        
        <div className="hme_hd">  
        </div>
	</div>
        <hr/>
  
        <br/><div style={{textAlign:"right"}}className="col-lg-4">
                
            </div>
             
        <br/> 
          <div className="con_1">
    
            <center>
         

        </center>
        
        
        <br/>
        
        <div className="text-center">
        
        </div>
        </div>
        
        <button class="w3-button w3-black"><a href="/DeliveryCharges" style={{textDecoration:"none", color:"white"}}> Calculate Delivery Fee </a></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button class="w3-button w3-black"><a href="/DeliveryOffers" style={{textDecoration:"none", color:"white"}}> Check Our New Offers </a></button><br/>
        
           <br/><div class="mapouter"><div class="gmap_canvas"><iframe width="1080" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=sri jayawardenepura kotte&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org" style={{position:"relative",textAlign:"right",height:"500px",width:"600px"}}></a><a href="https://www.embedgooglemap.net" style={{overflow:"hidden",background:"none!important",height:"500px",width:"600px"}}>embed google maps html</a></div></div>
             
      </div>
      </div>
      </div>
    
    )
}
}