import mongoose from "mongoose";
import dotenv from "dotenv";
import sitesService from "../services/sites.service";

describe("Testing sites service", () => {
	beforeAll(async () => {
		dotenv.config();
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	});

	let newSite = null;

	it("Testigng site creation", () => {
		const site = {
			name: "Test site",
			address: "Test address",
			phone: "Test phone",
			contact: "Test contact",
			comments: "Test comments",
		};
		expect(() => {
			newSite = sitesService.createSite(site);
		}).not.toThrow();

		expect(newSite).not.toBeNull();

		expect(newSite).not.toBeUndefined();
	});

	it("Test single site get", () => {
		expect(() => {
			sitesService.getSite(newSite._id);
		}).not.toThrow();

		expect(newSite).not.toBeNull();

		expect(newSite).not.toBeUndefined();

		expect(newSite).toHaveProperty("name");

		expect(newSite).toHaveProperty("address");

		expect(newSite).toHaveProperty("phone");

		expect(newSite).toHaveProperty("contact");

		expect(newSite).toHaveProperty("comments");
	});

	it("Test get all sites", () => {
		let sites = null;

		expect(() => {
			sites = sitesService.getSites();
		}).not.toThrow();

		expect(sites).not.toBeNull();

		expect(sites).not.toBeUndefined();

		expect(sites).toHaveLength(1);
	});

	it("Test site update", () => {
		const site = {
			name: "Test site updated",
			address: "Test address updated",
			phone: "Test phone updated",
			contact: "Test contact updated",
			comments: "Test comments updated",
		};

		expect(() => {
			sitesService.updateSite(newSite._id, site);
		}).not.toThrow();

		expect(newSite).not.toBeNull();

		expect(newSite).not.toBeUndefined();

		expect(newSite).toHaveProperty("name");

		expect(newSite).toHaveProperty("address");

		expect(newSite).toHaveProperty("phone");

		expect(newSite).toHaveProperty("contact");

		expect(newSite).toHaveProperty("comments");
	});

	it("Test site deletion", () => {
		expect(() => {
			sitesService.deleteSite(newSite._id);
		}).not.toThrow();
	});
});
