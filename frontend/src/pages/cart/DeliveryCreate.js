import React, {Component} from 'react';
import axios from 'axios';
import './DeliveryCreate.css'


export default class CreateDelivery extends Component {

    constructor(props) {
        super(props);
        this.state={
            MainCity:"",
            Address:"",
            Instruction:"",
           Note:""
           
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

        const {MainCity,Address,Instruction,Note} = this.state;

        const data = {
           MainCity:MainCity,
            Address:Address,
            Instruction:Instruction,
            Note:Note
            
        }

        console.log(data)

        axios.post("api/post/save",data).then((res) =>{
            if(res.data.success){
                alert("Delivery Information Inserted Successfully!!")
                this.setState(
                    {
                       MainCity:"",
                       Address:"",
                        Instruction:"",
                        Note:""
                       
                    }
                
                )
            }
        })
    }

    render(){
        return (
	 
            <div className="container">
            <div className="crte" style={{width:"85%"}}>

           
           <br/>

           <div id="demo" className="carousel slide" data-ride="carousel">

            <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" className="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
            </ul>
  
            <div className="carousel-inner" style={{height:"100%",width:"100%"}}>
            <div className="carousel-item active">
            <img src="/static/images/d4.png" width="100%" height="300px"/>
            </div>
            <div className="carousel-item">
            <img src="/static/images/d3.jpg" width="100%" height="300px"/>
            </div>
         
            <div className="carousel-item">
            <img src="/static/images/q.jpg" width="100%" height="300px"/>
            </div>
            </div>
  
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
            <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
            <span className="carousel-control-next-icon"></span>
            </a>
            </div>

           
                    <br/><form className="cte"> 

                    <div className="form-group" style={{marginBottom:"15px",fontWeight:"bold"}}>
                        <label style={{marginBottom:"5px"}}>Main City</label>
                        <input type="text" 
                        className="form-control"
                        name="MainCity"
                        placeholder="Enter nearest City"
                        value={this.state.MainCity}
                        required
                        onChange={this.handleInputChange}/>
                    </div>

              

                    <div className="form-group" style={{marginBottom:"15px",fontWeight:"bold"}}>
                        <label style={{marginBottom:"5px"}}>Address</label>
                        <input type="text" required
                        className="form-control"
                        name="Address"
                        placeholder="Enter your Address"
                        value={this.state.Address}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px",fontWeight:"bold"}}>
                        <label style={{marginBottom:"5px"}}>Delivery Instructions</label>
                        <input type="text" 
                        className="form-control"
                        name="Instruction"
                        placeholder="Enter any Delivery Instruction" 
                        value={this.state.Instruction}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:"15px",fontWeight:"bold"}}>
                        <label style={{marginBottom:"5px"}}>Note</label>
                        <input type="text" 
                        className="form-control"
                        name="Note"
                        placeholder="Enter any special note about food"
                        value={this.state.Note}
                        onChange={this.handleInputChange}/>
                    </div>

                    <br/><center>
                    <button class="w3-button w3-khaki"type="submit" style={{textDecoration:"none", color:"white"}}onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Confirm Delivery
                    </button>
                    </center>

                </form>
            
                </div>
                </div> 
		 
        )
    }
}