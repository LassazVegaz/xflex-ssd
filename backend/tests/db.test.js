import mongoService from "../services/db.service";

describe("Testing db service", () => {
	it("Test db connection", () => {
		expect(mongoService.connectDB).not.toThrow();
	});
});
