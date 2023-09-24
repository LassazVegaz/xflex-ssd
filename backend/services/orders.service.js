import Site from "../models/site.model";
import Order from "../models/order.model";
import User from "../models/user.model";
import { ROLES } from "../utils/constants";

class OrdersService {
	// map a request to a requestDTO
	async mapRequestToDTO(request) {
		const json = request.toJSON();
		// find site which order belongs to
		const site = await Site.findOne({ orders: json._id });
		// find site manager
		const manager = await User.findOne({
			site: site._id,
			role: ROLES.siteManager,
		});
		return {
			...json,
			totalCost: json.items.reduce(
				(total, item) => total + item.quantity * item.product.price,
				0
			),
			siteName: site.name,
			siteDetails: `${manager.phone} (Site Manager - ${manager.firstName} ${manager.lastName})`,
		};
	}

	// create order
	async createOrder(siteManagerId, order) {
		// create order
		const newOrder = await Order.create(order);
		await newOrder.save();
		// get site of site manager
		const manager = await User.findById(siteManagerId);
		const site = await Site.findById(manager.site);
		// add order to site
		site.orders.push(newOrder._id);
		await site.save();

		return this.getOrder(newOrder._id);
	}

	// get orders
	getOrders = async () => {
		const orders = await Order.find({}).populate("items.product");

		const mapped = [];
		for (let order of orders) {
			mapped.push(await this.mapRequestToDTO(order));
		}

		return mapped;
	};

	// get order by ID
	getOrder = async (id) => {
		const order = await Order.findById(id).populate("items.product");
		return this.mapRequestToDTO(order);
	};

	// change order status
	changeOrderStatus = async (id, status) => {
		const order = await Order.findById(id);
		order.status = status;
		await order.save();
		return this.getOrder(id);
	};
}

const ordersService = new OrdersService();

// singleton
export default ordersService;
