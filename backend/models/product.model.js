import { Schema, model } from "mongoose";

const productSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		default: 0,
	},
});

const Product = model("Products", productSchema);
export default Product;
