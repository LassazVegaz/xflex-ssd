import { Box } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { PageContainer } from "../../../components/PageContainer/PageContainer";
import SmallLoader from "../../../components/SmallLoader/SmallLoader";
import REQUESTS_STATUESES from "../../../constants/sup-reqs-statuses";
import MiddlePart from "./components/MiddlePart";
import ReportButton from "./components/ReportButton";
import RequestsList from "./components/RequestsList";
import RequestsTabs from "./components/RequestsTabs";
import { useRequests } from "./requests.hook";

const RequestsPage = () => {
	const { requests, isLoading, refetch } = useRequests();
	const [tabIndex, setTabIndex] = useState(REQUESTS_STATUESES.PENDING);

	return (
		<>
			<Helmet>
				<title>Supplier Requests</title>
			</Helmet>

			<RequestsTabs tab={tabIndex} onChange={setTabIndex} />

			<PageContainer
				sx={{
					position: "relative",
				}}
			>
				<ReportButton />

				<MiddlePart onNewOneCreated={refetch} status={tabIndex} />

				<Box pt={5} />

				{isLoading ? (
					<SmallLoader minHeight="30vh" />
				) : (
					<RequestsList
						requests={requests[tabIndex] ?? []}
						onUpdate={refetch}
						status={tabIndex}
					/>
				)}
			</PageContainer>
		</>
	);
};

export default RequestsPage;
