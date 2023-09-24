import express from "express";
import productCtrl from "../controllers/product.controller";
import auth from "../middleware/auth.middleware";
import authAdmin from "../middleware/auth-admin.middleware";

const productRouter = express.Router();

productRouter
	.route("/products")
	.get(productCtrl.getProducts)
	.post(auth, authAdmin, productCtrl.createProduct);

productRouter
	.route("/products/:id")
	.delete(auth, authAdmin, productCtrl.deleteProduct)
	.put(auth, authAdmin, productCtrl.updateProduct);

export default productRouter;
