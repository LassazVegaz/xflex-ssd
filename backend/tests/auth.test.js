import mongoose from "mongoose";
import dotenv from "dotenv";
import authService from "../services/auth.service";

describe("Testing auth service", () => {
	beforeAll(async () => {
		dotenv.config();
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	});

	let newUser = null;

	it("Testigng user creation", () => {
		const user = {
			name: "Test user",
			email: "some@gmail.com",
			password: "Test password",
			role: "Test role",
		};

		expect(() => {
			newUser = authService.register(user);
		}).not.toThrow();

		expect(newUser).not.toBeNull();

		expect(newUser).not.toBeUndefined();

		expect(newUser).toHaveProperty("name");

		expect(newUser).toHaveProperty("email");
	});

	it("Test single user get", () => {
		expect(() => {
			authService.getUser(newUser._id);
		}).not.toThrow();

		expect(newUser).not.toBeNull();

		expect(newUser).not.toBeUndefined();

		expect(newUser).toHaveProperty("name");

		expect(newUser).toHaveProperty("email");
	});

	it("Test get all users", () => {
		let users = null;

		expect(() => {
			users = authService.getUsers();
		}).not.toThrow();

		expect(users).not.toBeNull();

		expect(users).not.toBeUndefined();
	});
});
