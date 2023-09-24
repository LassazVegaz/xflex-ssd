import React, {Component} from 'react';
import "./DeliveryCharges.css";


export default class DeliveryCharges extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Galle'

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Dear Customer,\nTotal no of kilometers to your Delivery Town is considered for your Delivery Charge.');
    event.preventDefault();
  }


    render(){
        return (
          <div className="container">
          <div className="chrges">
               
               <br/><h4 className="aw" ><b>Delivery Charge Calculation</b></h4><hr/>

               <br/><img height="100%" width="100%" src={'/static/images/s.jpg'}/>

            <br/><div className="chge">
            <h5>Dear Valued Customer,</h5>
                <p>                 It is a great pleasure to see you standing with us for your shopping experience. We improve our services day-by-day with 
                    new strategies to make you more satisfied.<br/>
                    Insert your Delivery Town and get know your total fee for the delivery. An additional Fee will be added as taxes and our service charge.Thank You!!!
                </p>
            </div>
               
        <table className="table1"> 
          <thead>
          <tr>
              <th><b><u><h5>No of Km</h5></u></b></th>
              <th><b><u><h5>Amount We Charge</h5></u></b></th>
          </tr>
          </thead>
          <tbody>
              <tr>
                 <td>Within Galle Town</td> 
                 <td>Rs.200.00</td>
              </tr>
              <tr>
              <td>Below 5 km</td>
              <td>Rs.250.00</td>
              </tr>
              <tr>
                <td>Between 5 - 10 km</td>
                <td>Rs.350.00</td>
              </tr>
              <tr>
                <td>Above 10 km</td>
                <td>Rs.400.00</td>
              </tr>

          </tbody>

          </table>
          
          <br/><br/><br/><br/><br/>
           
          <div className="cge1">
        <form onSubmit={this.handleSubmit}>
        
         <label style={{fontSize:"22px"}}>
            Select your Delivery Town
          &nbsp;&nbsp;<select value={this.state.value} onChange={this.handleChange}>
          <option value="Galle">Galle</option>
          <option value="Colombo">Colombo</option>
          <option value="Matara">Matara</option>
          <option value="Hambanthota">Hambanthota</option>
          </select>
          </label>
            
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" value="Submit" />
          <br/>

          </form>

          <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          
          
          <div className="cgess2" >

            <p>
              <h4> Your Delivery Area is :</h4> {this.state.value}
              <h4>Total Payment = </h4>
              {(() => {
                  switch (this.state.value) {
                      case "Galle":   return "Rs.260.00";
                      case "Colombo": return "Rs.310.00";
                      case "Matara":  return "Rs.410.00";
                      default:      return "Rs.460.00";
                        }
                 })()}

                  <br/><br/>
                 <h6>**Rs.60.00 of a service charge is added to your total bill.</h6>

            </p>

          </div>
        
          <br/><i class="fas fa-hand-point-right" style={{color:'red'}}></i><a className="cgerr"  style={{color:'white',fontSize:'30px'}} href="/DeliveryCreate"> Click Here to confirm delivery</a>
          
          </div> 
          
          </div>
          </div>
        )
}
}