import { NotificationManager } from "react-notifications";
import REQUESTS_STATUESES from "../../../../constants/sup-reqs-statuses";
import { useScreenLoader } from "../../../../hooks/loader.hook";
import { supplierRequestApi } from "../../../../utils/supplier-requests.api";

const useRequestsStatus = (id) => {
	const loader = useScreenLoader();

	const changeStatus = async (status) => {
		try {
			loader.show();
			await supplierRequestApi.changeRequestStatus(id, status);
			return true;
		} catch (error) {
			NotificationManager.error("Changing request status failed");
			console.error(error);
			return false;
		} finally {
			loader.hide();
		}
	};

	return {
		cancelRequest: () => changeStatus(REQUESTS_STATUESES.CANCELLED),
		receiveRequest: () => changeStatus(REQUESTS_STATUESES.RECEIVED),
	};
};

export default useRequestsStatus;
