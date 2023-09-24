import mongoose from "mongoose";
import dotenv from "dotenv";
import supplierService from "../services/supplier.service";

describe("Testing supplier service", () => {
	beforeAll(async () => {
		dotenv.config();
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	});

	let newSupplier = null;

	it("Testigng supplier creation", () => {
		const supplier = {
			name: "Test supplier",
			address: "Test address",
			phone: "Test phone",
			contact: "Test contact",
			comments: "Test comments",
		};
		expect(() => {
			newSupplier = supplierService.createSupplier(supplier);
		}).not.toThrow();

		expect(newSupplier).not.toBeNull();

		expect(newSupplier).not.toBeUndefined();
	});

	it("Test single supplier get", () => {
		expect(() => {
			supplierService.getSupplier(newSupplier._id);
		}).not.toThrow();

		expect(newSupplier).not.toBeNull();

		expect(newSupplier).not.toBeUndefined();

		expect(newSupplier).toHaveProperty("name");

		expect(newSupplier).toHaveProperty("address");

		expect(newSupplier).toHaveProperty("phone");

		expect(newSupplier).toHaveProperty("contact");

		expect(newSupplier).toHaveProperty("comments");
	});

	it("Test get all suppliers", () => {
		let suppliers = null;

		expect(() => {
			suppliers = supplierService.getSuppliers();
		}).not.toThrow();

		expect(suppliers).not.toBeNull();

		expect(suppliers).not.toBeUndefined();
	});
});
