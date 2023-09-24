import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export const ScreenLoader = () => {
	const show = useSelector((s) => s.screenLoader.show);

	return show ? (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				zIndex: 1400,
			}}
		>
			<CircularProgress size={70} />
		</Box>
	) : null;
};
