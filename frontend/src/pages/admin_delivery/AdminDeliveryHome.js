import React, {Component} from 'react';
import "./AdminDeliveryHome.css";


export default class AdminDeliveryHome extends Component{
   

render(){
        return(
            
          <div>
        
          <hr/>
   
          <div>
 <div>      



 <div >

 <center>
    
         
    <img height="350px" width="800px" src={'/static/images/delivery.png'}/>



        <div class="btn-group button"  >
        <button ><a href="/ShowOrderDetails" style={{textDecoration:"none", color:"white"}}> Show order Details </a></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button ><a href="/CreateOffers" style={{textDecoration:"none", color:"white"}}> Insert new delivery Offers </a></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button ><a href="/UpdateOffers" style={{textDecoration:"none", color:"white"}}> Update Previous Offers </a></button><br/>
        </div>
        </center>



       
         
         </div></div>

          </div>
</div>


            
        )
    }
}