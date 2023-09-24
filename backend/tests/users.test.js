import mongoose from "mongoose";
import dotenv from "dotenv";
import usersService from "../services/users.service";

describe("Testing users service", () => {
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
			newUser = usersService.createUser(user);
		}).not.toThrow();

		expect(newUser).not.toBeNull();

		expect(newUser).not.toBeUndefined();

		expect(newUser).toHaveProperty("name");

		expect(newUser).toHaveProperty("email");
	});

	it("Test single user get", () => {
		expect(() => {
			usersService.getUser(newUser._id);
		}).not.toThrow();

		expect(newUser).not.toBeNull();

		expect(newUser).not.toBeUndefined();

		expect(newUser).toHaveProperty("name");

		expect(newUser).toHaveProperty("email");
	});

	it("Test get all users", () => {
		let users = null;

		expect(() => {
			users = usersService.getUsers();
		}).not.toThrow();

		expect(users).not.toBeNull();

		expect(users).not.toBeUndefined();

		expect(users).toHaveLength(1);
	});

	it("Test user update", () => {
		const user = {
			name: "Test user updated",
			email: "some2@gmail.com",
		};

		expect(() => {
			usersService.updateUser(newUser._id, user);
		}).not.toThrow();

		expect(newUser).not.toBeNull();

		expect(newUser).not.toBeUndefined();

		expect(newUser).toHaveProperty("name");

		expect(newUser).toHaveProperty("email");
	});

	it("Test user delete", () => {
		expect(() => {
			usersService.deleteUser(newUser._id);
		}).not.toThrow();
	});

	it("Test get all users after delete", () => {
		let users = null;

		expect(() => {
			users = usersService.getUsers();
		}).not.toThrow();

		expect(users).not.toBeNull();

		expect(users).not.toBeUndefined();

		expect(users).toHaveLength(0);
	});
});
