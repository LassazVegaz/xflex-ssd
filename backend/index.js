// a simple express app
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import mongoService from "./services/db.service";
import ordersRouter from "./routes/orders.router";
import userRouter from "./routes/user.router";
import categoryRouter from "./routes/category.router";
import uploadRouter from "./routes/upload.router";
import productRouter from "./routes/product.router";
import supplierRouter from "./routes/supplier.router";
import handleErrors from "./middleware/error-handler.middleware";
import sitesRouter from "./routes/sites.router";
import siteManagerRouter from "./routes/site-manager.router";
import authRouter from "./routes/auth.router";

dotenv.config();

const run = async () => {
	await mongoService.connectDB();

	const app = express();
	const port = process.env.PORT || 8000;

	app.use(cors());
	app.use(express.json());
	app.use(cookieParser());
	app.use(
		fileUpload({
			useTempFiles: true,
		})
	);

	app.use("/api/orders", ordersRouter);
	app.use("/api/suppliers", supplierRouter);
	app.use("/api/sites", sitesRouter);
	app.use("/api/users", userRouter);
	app.use("/api/site-managers", siteManagerRouter);
	app.use("/api/categories", categoryRouter);
	app.use("/api/upload", uploadRouter);
	app.use("/api/products", productRouter);
	app.use("/api/auth", authRouter);

	app.use(handleErrors);

	app.listen(port, () => {
		console.log(`Server is listening on port ${port}!`);
	});
};

run().catch((err) => console.error(err));
