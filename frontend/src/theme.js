import { createTheme } from "@mui/material";

const themeOptions = {
	palette: {
		type: "light",
		primary: {
			main: "#393939",
		},
		secondary: {
			main: "#f50057",
		},
		shape: {
			borderRadius: 50,
		},
	},
};

const theme = createTheme(themeOptions);

export default theme;
