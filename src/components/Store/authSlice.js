import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: Boolean(localStorage.getItem("token")),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setLoggedInStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLogoutHandler:(state,action)=>{
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    }
  },
});

export const { setToken, setLoggedInStatus } = authSlice.actions;
export default authSlice;