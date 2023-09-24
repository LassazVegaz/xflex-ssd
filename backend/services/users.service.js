import bcrypt from "bcrypt";
import User from "../models/user.model";
import { ROLES } from "../utils/constants";

class UsersService {
	// common user
	createUser = (userData) => {
		userData.password = bcrypt.hashSync(userData.password, 10);
		return User.create(userData);
	};

	updateUser = (id, userData) =>
		User.findByIdAndUpdate(id, userData, { new: true }).select("-password");

	deleteUser = (id) => User.findByIdAndDelete(id).select("-password");

	// site managers
	getSiteManagers = () =>
		User.find({ role: ROLES.siteManager })
			.populate("site")
			.select("-password");

	getSiteManager = (id) =>
		User.findById(id).populate("site").select("-password");

	assignSite = (id, siteId) =>
		User.findByIdAndUpdate(id, { site: siteId }, { new: true })
			.populate("site")
			.select("-password");
}

const usersService = new UsersService();

// singleton
export default usersService;
