import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, logout, clearError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
