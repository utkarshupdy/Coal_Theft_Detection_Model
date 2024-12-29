import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;

            // Persist login state to localStorage
            localStorage.setItem("authStatus", JSON.stringify({
                status: true,
                userData: action.payload.userData,
            }));
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;

            // Clear authentication data from localStorage
            localStorage.removeItem("authStatus");
        },

        rehydrate: (state) => {
            // Rehydrate state from localStorage, if available
            const storedAuth = JSON.parse(localStorage.getItem("authStatus"));
            if (storedAuth && storedAuth.status) {
                state.status = storedAuth.status;
                state.userData = storedAuth.userData;
            }
        },
    },
});

export const { login, logout, rehydrate } = authSlice.actions;

export default authSlice.reducer;
