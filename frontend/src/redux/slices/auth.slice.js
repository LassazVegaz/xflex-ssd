import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = null;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
