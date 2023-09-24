import express from "express";
import authenticate from "../middleware/auth.middleware";
import authService from "../services/auth.service";

const authRouter = express.Router();

authRouter.post("/login", async (req, res, next) => {
	try {
		const token = await authService.generateToken(
			req.body.email,
			req.body.password
		);
		if (token) {
			res.status(200).json({ token });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (err) {
		next(err);
	}
});

authRouter.get("/", authenticate, (req, res) => {
	res.send(req.user);
});

export default authRouter;
