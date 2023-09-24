import "./index.css";
import "react-notifications/lib/notifications.css";

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<DataProvider>
				<Router>
					<App />
				</Router>
			</DataProvider>
		</ThemeProvider>
	</Provider>
);
