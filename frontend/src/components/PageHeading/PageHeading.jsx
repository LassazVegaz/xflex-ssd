import { Typography } from "@mui/material";

export const PageHeading = ({ text }) => {
	return (
		<Typography variant="h4" textTransform="none">
			{text}
		</Typography>
	);
};
