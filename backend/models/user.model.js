import { Schema, model } from "mongoose";
import { ROLES } from "../utils/constants";

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	phone: String,
	email: String,
	password: String,
	role: {
		type: String,
		enum: [ROLES.admin, ROLES.accountant, ROLES.siteManager],
	},
	site: {
		type: Schema.Types.ObjectId,
		ref: "Site",
	},
});

const User = model("Users", userSchema);

export default User;
