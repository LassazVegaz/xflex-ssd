import express from "express";
import userCtrl from "../controllers/user.controller";
import auth from "../middleware/auth.middleware";
import usersService from "../services/users.service";

const userRouter = express.Router();

userRouter.post("/register", userCtrl.register);

userRouter.post("/login", userCtrl.login);

userRouter.get("/logout", userCtrl.logout);

userRouter.get("/refresh_token", userCtrl.refreshToken);

userRouter.get("/infor", auth, userCtrl.getUser);

userRouter.patch("/addcart", auth, userCtrl.addCart);

userRouter.get("/history", auth, userCtrl.history);

// create user
userRouter.post("/", async (req, res, next) => {
	try {
		const user = await usersService.createUser(req.body);
		res.status(201).json(user);
	} catch (err) {
		next(err);
	}
});

// update user
userRouter.put("/:id", async (req, res, next) => {
	try {
		const user = await usersService.updateUser(req.params.id, req.body);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

// delete user
userRouter.delete("/:id", async (req, res, next) => {
	try {
		const user = await usersService.deleteUser(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

export default userRouter;
