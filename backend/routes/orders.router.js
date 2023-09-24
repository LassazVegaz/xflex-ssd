import express from "express";
import ordersService from "../services/orders.service";

const ordersRouter = express.Router();

// get all orders
ordersRouter.get("/", async (req, res) => {
	try {
		const requests = await ordersService.getOrders();
		res.status(200).send(requests);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

// get a order by id
ordersRouter.get("/:id", async (req, res) => {
	try {
		const request = await ordersService.getOrder(req.params.id);
		res.status(200).send(request);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

// change the status of a request
ordersRouter.patch("/:id/status", async (req, res) => {
	try {
		const request = await ordersService.changeOrderStatus(
			req.params.id,
			req.body.status
		);
		res.status(200).send(request);
	} catch (e) {
		res.status(400).send(e.message);
	}
});

export default ordersRouter;
