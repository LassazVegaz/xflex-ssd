import mongoose from "mongoose";
import { ORDER_STATUS } from "../utils/constants";

const orderSchema = new mongoose.Schema({
	status: {
		type: String,
		enum: [
			ORDER_STATUS.pending,
			ORDER_STATUS.approved,
			ORDER_STATUS.declined,
			ORDER_STATUS.delivered,
		],
		default: ORDER_STATUS.pending,
	},
	date: {
		type: Date,
		default: new Date(),
	},
	deliverDate: Date,
	comments: String,
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Products",
			},
			quantity: Number,
		},
	],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
