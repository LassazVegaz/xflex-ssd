import React, { Component } from "react";
import axios from "axios";

import "./DeliveryOffers.css";

export default class DeliveryOffers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			offers: [],
		};
	}

	componentDidMount() {
		this.retrieveOffers();
	}

	retrieveOffers() {
		axios.get("/api/offers").then((res) => {
			if (res.data.success) {
				this.setState({
					offers: res.data.existingOffers, //me posts variable eka uda this.state yata use krpu ekami
				});

				console.log(this.state.offers);
			}
		});
	}

	onDelete = (id) => {
		axios.delete(`/api/offer/delete/${id}`).then((res) => {
			alert("Deleted Successfully!!");
			this.retrieveOffers();
		});
	};

	/*GeneratePDF =()=>{
  
    doc.html(document.querySelector('.opt'),{
           callback: function(pdf){
               pdf.save("Alloffers.pdf");
           }
    });
  };

  */

	filterData(offers, searchKey) {
		const result = offers.filter(
			(offer) =>
				offer.offerID.toLowerCase().includes(searchKey) ||
				offer.offerName.toLowerCase().includes(searchKey)
		);

		this.setState({ offers: result });
	}

	handleSearchArea = (e) => {
		const searchKey = e.currentTarget.value;

		axios.get("/api/offers").then((res) => {
			if (res.data.success) {
				this.filterData(res.data.existingOffers, searchKey);
			}
		});
	};
	render() {
		return (
			<div>
				<img
					src="/static/images/h2.png"
					width="100%"
					height="500px"
					alt="hello"
				/>
				<div class="card">
					<div class="w3-container w3-green">
						<h style={{ fontWeight: "bold" }}>
							ENJOY OUR DELIVERY OFFERS
						</h>
						<br></br>
						<h>
							check on the website for daily updatable delivery
							offers
						</h>

						<center>
							<table className="opt">
								<center>
									<br />
									<table
										className="opttable"
										style={{ width: "77%" }}
									>
										<thead>
											<tr></tr>
										</thead>
										<tbody>
											{this.state.offers.map(
												(offers, index) => {
													return (
														<tr key={index}>
															<td>
																{
																	offers.offerName
																}
															</td>

															<br></br>
															<td>
																{
																	offers.description
																}
															</td>
														</tr>
													);
												}
											)}
										</tbody>
										<br />
									</table>
								</center>
							</table>
						</center>
					</div>
				</div>
			</div>
		);
	}
}
