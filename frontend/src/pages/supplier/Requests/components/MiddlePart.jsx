import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import RoundPlusButon from "../../../../components/RoundPlusIcon/RoundPlusButon";
import AddRequestDialog from "./AddRequestDialog/AddRequestDialog";
import REQUESTS_STATUESES from "../../../../constants/sup-reqs-statuses";

const MiddlePart = ({ onNewOneCreated, status }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [titlePrefix, setTitlePrefix] = useState("");

	useEffect(() => {
		if (status === REQUESTS_STATUESES.PENDING) {
			setTitlePrefix("Pending");
		} else if (status === REQUESTS_STATUESES.RECEIVED) {
			setTitlePrefix("Received");
		} else if (status === REQUESTS_STATUESES.CANCELLED) {
			setTitlePrefix("Cancelled");
		}
	}, [status]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					columnGap: 3,
				}}
			>
				<Typography variant="h5" fontWeight={700}>
					{titlePrefix} Requests
				</Typography>

				{status === REQUESTS_STATUESES.PENDING && (
					<RoundPlusButon
						sideLength={42}
						onClick={() => setOpenDialog(true)}
						fontSize="large"
					/>
				)}
			</Box>

			<AddRequestDialog
				open={openDialog}
				onClose={(newOneCreated) => {
					newOneCreated && onNewOneCreated();
					setOpenDialog(false);
				}}
			/>
		</>
	);
};

export default MiddlePart;
