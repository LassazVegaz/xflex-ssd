import Site from "../models/site.model";
import User from "../models/user.model";

class SitesService {
	createSite = (siteData) => Site.create(siteData);

	getAllSites = () => Site.find({}).populate("orders");

	getSiteById = (id) => Site.findById(id).populate("orders");

	updateSite = (id, siteData) =>
		Site.findByIdAndUpdate(id, siteData, { new: true });

	deleteSite = (id) => Site.findByIdAndDelete(id);

	// get sites without user
	getSitesWithoutUser = async () => {
		const sitesWithUsers = await User.find({ site: { $ne: null } }).select(
			"site"
		);
		const sitesWithUsersIds = sitesWithUsers.map((user) => user.site);
		const sitesWithoutUsers = await Site.find({
			_id: { $nin: sitesWithUsersIds },
		});
		return sitesWithoutUsers;
	};
}

const sitesService = new SitesService();

// singleton
export default sitesService;
