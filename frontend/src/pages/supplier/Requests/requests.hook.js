import React from "react";
import { NotificationManager } from "react-notifications";
import { useParams } from "react-router-dom";
import { supplierRequestApi } from "../../../utils/supplier-requests.api";

const initialState = {
	pending: [],
	received: [],
	canclled: [],
};

export const useRequests = () => {
	const { id } = useParams();
	const [requests, setRequests] = React.useState(initialState);
	const [isLoading, setIsLoading] = React.useState(false);

	const getRequests = React.useCallback(async () => {
		try {
			setIsLoading(true);
			const requests = await supplierRequestApi.getRequests(id);
			setRequests(requests);
		} catch (error) {
			NotificationManager.error("Getting supplier requests data failed");
			setRequests(initialState);
		} finally {
			setIsLoading(false);
		}
	}, [id]);

	React.useEffect(() => {
		getRequests();
	}, [getRequests]);

	return {
		requests,
		isLoading,
		refetch: getRequests,
	};
};
