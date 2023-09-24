// request model
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
	siteName: String,
	deliveryDate: Date,
	status: {
		type: String,
		enum: ["pending", "accepted", "rejected"],
	},
	siteDetails: String,
	items: [
		{
			name: String,
			quantity: Number,
			cost: Number,
		},
	],
	bankAccount: String,
	comments: String,
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
