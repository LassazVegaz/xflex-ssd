import { Box, CircularProgress } from "@mui/material";

const SmallLoader = ({ minHeight }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight,
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default SmallLoader;
