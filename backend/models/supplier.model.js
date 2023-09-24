import { Schema, model } from "mongoose";

const supplierSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
		match: /^(?:7|0|(?:\+94))[0-9]{9,10}$/,
	},
	email: {
		type: String,
		required: true,
		match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	},
	availabile: {
		type: Boolean,
		default: true,
		required: true,
	},
	dateRegistered: {
		type: Date,
		required: true,
		default: new Date(),
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Products",
		},
	],
});

const Supplier = model("Suppliers", supplierSchema);
export default Supplier;
