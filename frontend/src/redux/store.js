import { configureStore } from "@reduxjs/toolkit";
import { screenLoaderReducer } from "./slices/screen-loader.slice";

export const store = configureStore({
	reducer: {
		screenLoader: screenLoaderReducer,
	},
});
