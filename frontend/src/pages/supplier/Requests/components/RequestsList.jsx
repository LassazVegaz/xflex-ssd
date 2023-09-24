import { Box, Typography } from "@mui/material";
import moment from "moment/moment";
import { useEffect } from "react";
import { useState } from "react";
import { MyButton } from "../../../../components/MyButton/MyButton";
import REQUESTS_STATUESES from "../../../../constants/sup-reqs-statuses";
import useRequestsStatus from "./requests-status.hook";

const RequestItem = ({ item }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<Typography flexGrow={2}>{item.code}</Typography>
			<Typography flexGrow={1} textAlign="right">
				{item.amount}
			</Typography>
		</Box>
	);
};

const LeftBox = ({ request }) => {
	const [date, setDate] = useState("");

	useEffect(() => {
		setDate(moment(request.date).format("Do MMMM YYYY"));
	}, [request.date]);

	return (
		<Box>
			<Typography variant="h5">{date}</Typography>

			<Box pt={3} />

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					rowGap: 1,
				}}
			>
				{request.items.map((item) => (
					<RequestItem item={item} key={item._id} />
				))}
			</Box>
		</Box>
	);
};

const RightBox = ({ id, onUpdate }) => {
	const status = useRequestsStatus(id);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				rowGap: 2,
			}}
		>
			<MyButton
				variant="outlined"
				color="info"
				size="small"
				onClick={async () => {
					await status.receiveRequest();
					onUpdate();
				}}
			>
				Received
			</MyButton>
			<MyButton
				variant="outlined"
				color="secondary"
				size="small"
				onClick={async () => {
					await status.cancelRequest();
					onUpdate();
				}}
			>
				Cancelled
			</MyButton>
		</Box>
	);
};

const Request = ({ request, onUpdate, status }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				border: "1px solid black",
				borderRadius: 2,
				px: 5,
				py: 2,
				boxShadow: 5,
			}}
		>
			<LeftBox request={request} />

			{status === REQUESTS_STATUESES.PENDING && (
				<RightBox id={request._id} onUpdate={onUpdate} />
			)}
		</Box>
	);
};

const RequestsList = ({ requests, onUpdate, status }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				rowGap: 4,
			}}
		>
			{requests.map((req) => (
				<Request
					request={req}
					key={req._id}
					onUpdate={onUpdate}
					status={status}
				/>
			))}
		</Box>
	);
};

export default RequestsList;
