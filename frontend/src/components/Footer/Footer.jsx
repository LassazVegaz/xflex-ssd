import { Box, Typography } from "@mui/material";

const Footer = () => {
	return (
		<Box
			sx={{
				borderTop: "1px solid black",
				pt: 3,
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
			}}
		>
			<Typography variant="h6">XFlex Clothing Store</Typography>

			<Box
				sx={{
					mt: 2.5,
					mb: 2,
					display: "flex",
					flexFlow: "column",
					alignItems: "center",
				}}
			>
				<Typography variant="caption">
					Sri Lanka's Largest Online Platform
				</Typography>
				<Typography variant="caption">
					Copyright &copy; XFlex Clothing Store 2022
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
