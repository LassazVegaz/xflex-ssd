import express from "express";
import sitesService from "../services/sites.service";
import ordersService from "../services/orders.service";

const sitesRouter = express.Router();

sitesRouter.get("/", async (req, res, next) => {
	try {
		const sites = await sitesService.getAllSites();
		res.send(sites);
	} catch (error) {
		next(error);
	}
});

sitesRouter.get("/without-user", async (req, res, next) => {
	try {
		const sites = await sitesService.getSitesWithoutUser();
		res.send(sites);
	} catch (error) {
		next(error);
	}
});

sitesRouter.get("/:id", async (req, res, next) => {
	try {
		const site = await sitesService.getSiteById(req.params.id);
		res.send(site);
	} catch (error) {
		next(error);
	}
});

sitesRouter.post("/", async (req, res, next) => {
	try {
		const site = await sitesService.createSite(req.body);
		res.send(site);
	} catch (error) {
		next(error);
	}
});

sitesRouter.put("/:id", async (req, res, next) => {
	try {
		const site = await sitesService.updateSite(req.params.id, req.body);
		res.send(site);
	} catch (error) {
		next(error);
	}
});

sitesRouter.delete("/:id", async (req, res, next) => {
	try {
		const site = await sitesService.deleteSite(req.params.id);
		res.send(site);
	} catch (error) {
		next(error);
	}
});

sitesRouter.get("/:id/orders", async (req, res, next) => {
	try {
		const orders = await ordersService.getOrdersBySite(req.params.id);
		res.send(orders);
	} catch (error) {
		next(error);
	}
});

export default sitesRouter;
