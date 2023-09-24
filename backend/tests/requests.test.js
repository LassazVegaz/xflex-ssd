import mongoose from "mongoose";
import dotenv from "dotenv";
import requestsService from "../services/requests.service";

describe("Testing requests service", () => {
	beforeAll(async () => {
		dotenv.config();
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	});

	let newRequest = null;

	it("Testigng request creation", () => {
		const request = {
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
			newRequest = requestsService.createRequest(
				"636e5cc7f5cee4351de998eb",
				request
			);
		}).not.toThrow();

		expect(newRequest).not.toBeNull();

		expect(newRequest).not.toBeUndefined();
	});

	it("Test single request get", () => {
		expect(() => {
			requestsService.getRequest(newRequest._id);
		}).not.toThrow();

		expect(newRequest).not.toBeNull();

		expect(newRequest).not.toBeUndefined();

		expect(newRequest).toHaveProperty("comments");

		expect(newRequest).toHaveProperty("items");
	});

	it("Test get all requests", () => {
		let requests = null;

		expect(() => {
			requests = requestsService.getRequests();
		}).not.toThrow();

		expect(requests).not.toBeNull();

		expect(requests).not.toBeUndefined();

		expect(requests).toHaveLength(1);
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});
});
