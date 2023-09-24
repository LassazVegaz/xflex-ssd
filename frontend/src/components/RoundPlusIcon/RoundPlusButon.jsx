import { Add as AddIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const RoundPlusButon = ({ sideLength, onClick, fontSize, ...sx }) => {
	return (
		<IconButton
			sx={{
				color: "primary.main",
				fontWeight: "bold",
				border: "1px solid",
				width: sideLength,
				height: sideLength,
				...sx,
			}}
			onClick={onClick}
		>
			<AddIcon fontSize={fontSize} />
		</IconButton>
	);
};

export default RoundPlusButon;
