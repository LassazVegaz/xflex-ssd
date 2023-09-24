import Supplier from "../models/supplier.model";
import Product from "../models/product.model";

class SupplierService {
	// create a new supplier
	createSupplier = (data) => {
		const supplier = new Supplier(data);
		return supplier.save();
	};

	// get all suppliers
	getAllSuppliers = () => Supplier.find().populate("products");

	// get a supplier by id
	getSupplierById = (id) => Supplier.findById(id).populate("products");

	// update a supplier by id
	updateSupplier = (id, data) =>
		Supplier.findByIdAndUpdate(id, data, { new: true });

	// delete a supplier by id
	deleteSupplier = (id) => Supplier.findByIdAndDelete(id);

	// add product
	addProduct = async (supplierId, data) => {
		const product = new Product(data);
		const savedProduct = await product.save();
		const supplier = await Supplier.findById(supplierId);
		supplier.products.push(savedProduct._id);
		await supplier.save();
		return savedProduct;
	};

	// remove product
	removeProduct = async (productId) => {
		await Supplier.updateMany(
			{},
			{ $pull: { products: productId } },
			{ multi: true }
		);
		await Product.findByIdAndDelete(productId);
	};

	// update product
	updateProduct = (productId, data) => {
		return Product.findByIdAndUpdate(productId, data, { new: true });
	};

	// get products by supplier id
	getProducts = async (supplierId) => {
		const sup = await Supplier.findById(supplierId).populate("products");
		return sup.products;
	};

	// get product by id
	getProduct = (productId) => Product.findById(productId);
}

const supplierService = new SupplierService();

// singleton
export default supplierService;
