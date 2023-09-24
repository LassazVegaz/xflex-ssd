import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
	name: String,
	address: String,
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		},
	],
});

const Site = mongoose.model("Site", siteSchema);

export default Site;
