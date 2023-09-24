import Request from "../models/request.model";

class RequestsService {
	// create a new request
	createRequest = async (request) => {
		request.status = "pending";
		request.deliveryDate = new Date(request.deliveryDate);
		const newRequest = new Request(request);
		return newRequest.save();
	};

	// map a request to a requestDTO
	mapRequestToDTO = (request) => {
		const json = request.toJSON();
		return {
			...json,
			totalCost: json.items.reduce(
				(total, item) => total + item.quantity * item.cost,
				0
			),
		};
	};

	// get a request by id
	getRequestById = async (id) => {
		const req = await Request.findById(id);
		return this.mapRequestToDTO(req);
	};

	// change the status of a request
	changeRequestStatus = async (id, status) => {
		const request = await Request.findById(id);
		request.status = status;
		const req = await request.save();
		return this.mapRequestToDTO(req);
	};

	// get requests list
	getRequestsList = async () => {
		const list = await Request.find();
		return list.map(this.mapRequestToDTO);
	};
}

const requestsService = new RequestsService();

// singleton
export default requestsService;
