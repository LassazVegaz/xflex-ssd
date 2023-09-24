import { Tab, Tabs } from "@mui/material";
import REQUESTS_STATUESES from "../../../../constants/sup-reqs-statuses";

const RequestsTabs = ({ tab, onChange }) => {
	return (
		<Tabs
			value={tab}
			variant="fullWidth"
			onChange={(_e, v) => onChange(v)}
			sx={{
				backgroundColor: "#E2E3E8",
			}}
		>
			<Tab label="Pending" value={REQUESTS_STATUESES.PENDING} />
			<Tab label="Recieved" value={REQUESTS_STATUESES.RECEIVED} />
			<Tab label="Cancelled" value={REQUESTS_STATUESES.CANCELLED} />
		</Tabs>
	);
};

export default RequestsTabs;
