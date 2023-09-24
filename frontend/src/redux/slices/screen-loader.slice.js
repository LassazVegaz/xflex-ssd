import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	show: false,
};

const screenLoaderSlice = createSlice({
	name: "screenLoader",
	initialState,
	reducers: {
		show: (state) => {
			state.show = true;
		},
		hide: (state) => {
			state.show = false;
		},
	},
});

export const screenLoaderActions = screenLoaderSlice.actions;

export const screenLoaderReducer = screenLoaderSlice.reducer;
