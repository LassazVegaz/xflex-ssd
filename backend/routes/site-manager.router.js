import express from "express";
import usersService from "../services/users.service";
import ordersService from "../services/orders.service";

const siteManagerRouter = express.Router();

// get all site managers
siteManagerRouter.get("/", async (req, res, next) => {
	try {
		const siteManagers = await usersService.getSiteManagers();
		res.status(200).json(siteManagers);
	} catch (err) {
		next(err);
	}
});

// get site manager by id
siteManagerRouter.get("/:id", async (req, res, next) => {
	try {
		const siteManager = await usersService.getSiteManager(req.params.id);
		res.status(200).json(siteManager);
	} catch (err) {
		next(err);
	}
});

// assign site to site manager
siteManagerRouter.patch("/:id/assign-site", async (req, res, next) => {
	try {
		const siteManager = await usersService.assignSite(
			req.params.id,
			req.body.siteId
		);
		res.status(200).json(siteManager);
	} catch (err) {
		next(err);
	}
});

// create order
siteManagerRouter.post("/:id/orders", async (req, res, next) => {
	try {
		const order = await ordersService.createOrder(req.params.id, req.body);
		res.status(200).json(order);
	} catch (err) {
		next(err);
	}
});

export default siteManagerRouter;
