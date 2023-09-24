import { Router } from "express";
import supplierService from "../services/supplier.service";

const supplierRouter = Router();

// get all suppliers
supplierRouter.get("/", async (req, res, next) => {
	try {
		const suppliers = await supplierService.getAllSuppliers();
		res.send(suppliers);
	} catch (error) {
		next(error);
	}
});

// get a supplier by id
supplierRouter.get("/:id", async (req, res, next) => {
	try {
		const supplier = await supplierService.getSupplierById(req.params.id);
		res.send(supplier);
	} catch (error) {
		next(error);
	}
});

// create a new supplier
supplierRouter.post("/", async (req, res, next) => {
	try {
		const supplier = await supplierService.createSupplier(req.body);
		res.send(supplier);
	} catch (error) {
		next(error);
	}
});

// update a supplier by id
supplierRouter.put("/:id", async (req, res, next) => {
	try {
		const supplier = await supplierService.updateSupplier(
			req.params.id,
			req.body
		);
		res.send(supplier);
	} catch (error) {
		next(error);
	}
});

// delete a supplier by id
supplierRouter.delete("/:id", async (req, res, next) => {
	try {
		await supplierService.deleteSupplier(req.params.id);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

// add product
supplierRouter.post("/:id/products", async (req, res, next) => {
	try {
		const supplier = await supplierService.addProduct(
			req.params.id,
			req.body
		);
		res.send(supplier);
	} catch (error) {
		next(error);
	}
});

// remove product
supplierRouter.delete("/:id/products/:productId", async (req, res, next) => {
	try {
		await supplierService.removeProduct(req.params.productId);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

// update product
supplierRouter.put("/:id/products/:productId", async (req, res, next) => {
	try {
		const product = await supplierService.updateProduct(
			req.params.productId,
			req.body
		);
		res.send(product);
	} catch (error) {
		next(error);
	}
});

// get products by supplier id
supplierRouter.get("/:id/products", async (req, res, next) => {
	try {
		const products = await supplierService.getProducts(req.params.id);
		res.send(products);
	} catch (error) {
		next(error);
	}
});

// get product by id
supplierRouter.get("/:id/products/:productId", async (req, res, next) => {
	try {
		const product = await supplierService.getProduct(req.params.productId);
		res.send(product);
	} catch (error) {
		next(error);
	}
});

export default supplierRouter;
