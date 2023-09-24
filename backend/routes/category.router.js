import express from "express";
import categoryCtrl from "../controllers/category.controller";
import auth from "../middleware/auth.middleware";
import authAdmin from "../middleware/auth-admin.middleware";

const categoryRouter = express.Router();

categoryRouter
	.route("/category")
	.get(categoryCtrl.getCategories)
	.post(auth, authAdmin, categoryCtrl.createCategory);

categoryRouter
	.route("/category/:id")
	.delete(auth, authAdmin, categoryCtrl.deleteCategory)
	.put(auth, authAdmin, categoryCtrl.updateCategory);

export default categoryRouter;
