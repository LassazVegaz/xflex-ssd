import mongoose from "mongoose";
import dotenv from "dotenv";
import ordersService from "../services/orders.service";

describe("Testing orders service", () => {
	beforeAll(async () => {
		dotenv.config();
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	});

	let newOrder = null;

	it("Testigng order creation", () => {
		const order = {
			deliveryDate: "11/15/2022",
			comments: "Come comments",
			items: [
				{
					product: "6360f113d829c3215c9a180b",
					quantity: 10,
				},
			],
		};
		expect(() => {
			newOrder = ordersService.createOrder(
				"636e5cc7f5cee4351de998eb",
				order
			);
		}).not.toThrow();

		expect(newOrder).not.toBeNull();

		expect(newOrder).not.toBeUndefined();
	});

	it("Test single order get", () => {
		expect(() => {
			ordersService.getOrder(newOrder._id);
		}).not.toThrow();

		expect(newOrder).not.toBeNull();

		expect(newOrder).not.toBeUndefined();

		expect(newOrder).toHaveProperty("comments");

		expect(newOrder).toHaveProperty("items");
	});

	it("Test get all orders", () => {
		let orders = null;

		expect(() => {
			orders = ordersService.getOrders();
		}).not.toThrow();

		expect(orders).not.toBeNull();

		expect(orders.length).toBeGreaterThan(0);
	});
});
