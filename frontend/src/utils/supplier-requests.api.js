import myAxios from "./api";

// create request
const createRequest = async (supplierId, items) => {
	const res = await myAxios.post("/requests", {
		supplierId,
		items,
	});
	return res.data;
};

// get requests of a supplier
const getRequests = async (supplierId) => {
	const res = await myAxios.get("/requests", {
		params: { supplierId },
	});
	return res.data;
};

// change request status
const changeRequestStatus = async (id, status) => {
	const res = await myAxios.patch(`/requests/${id}/change_status`, {
		status,
	});
	return res.data;
};

export const supplierRequestApi = {
	createRequest,
	getRequests,
	changeRequestStatus,
};
